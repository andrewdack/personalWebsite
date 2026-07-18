// One-time helper: exchanges a Spotify login for the long-lived refresh token
// the site needs. Fill SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in
// .env.local first, then run: node scripts/get-spotify-token.mjs
import { createServer } from "node:http";
import { readFileSync, writeFileSync } from "node:fs";

const ENV_PATH = new URL("../.env.local", import.meta.url);
const REDIRECT_URI = "http://127.0.0.1:3000/callback";
const SCOPES = "user-read-currently-playing user-read-recently-played";

const env = readFileSync(ENV_PATH, "utf8");
const get = (key) => env.match(new RegExp(`^${key}=(.*)$`, "m"))?.[1].trim();
const clientId = get("SPOTIFY_CLIENT_ID");
const clientSecret = get("SPOTIFY_CLIENT_SECRET");

if (!clientId || !clientSecret) {
    console.error(
        "Fill SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first.",
    );
    process.exit(1);
}

const authUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
        client_id: clientId,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope: SCOPES,
    });

const server = createServer(async (req, res) => {
    const url = new URL(req.url, REDIRECT_URI);
    if (url.pathname !== "/callback") {
        res.writeHead(404).end();
        return;
    }

    const code = url.searchParams.get("code");
    if (!code) {
        res.end("No code in callback URL. Check the terminal and try again.");
        return;
    }

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization:
                "Basic " +
                Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
        }),
    });
    const data = await tokenRes.json();

    if (!data.refresh_token) {
        res.end("Token exchange failed. Check the terminal for details.");
        console.error("Token exchange failed:", data);
        server.close();
        return;
    }

    writeFileSync(
        ENV_PATH,
        env.replace(
            /^SPOTIFY_REFRESH_TOKEN=.*$/m,
            `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`,
        ),
    );
    res.end(
        "Done! Refresh token saved to .env.local — you can close this tab.",
    );
    console.log("\nRefresh token saved to .env.local.");
    console.log("Restart the dev server to see the now-playing widget.");
    server.close();
});

server.listen(3000, "127.0.0.1", () => {
    console.log("Open this URL in your browser and approve access:\n");
    console.log(authUrl + "\n");
    console.log("Waiting for the redirect on " + REDIRECT_URI + " ...");
});
