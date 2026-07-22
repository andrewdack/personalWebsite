import Footer from "@/components/footer";

export default function Projects() {
    const cascadeStepMs = 75; // gap between each piece cascading in
    let cascadeStep = 0;
    const cascade = () => ({ animationDelay: `${cascadeStep++ * cascadeStepMs}ms` });

    return (
        <main className="mx-auto flex min-h-dvh max-w-165 flex-col justify-center px-6.5 py-[clamp(0.75rem,3vh,3rem)]">
        </main>
    );
}