// Quick 1D Perlin noise calculation used for the pseudo Spotify audio visualizer.

export class Perlin {
    perm: number[];

    constructor() {
        // Quick permutation table
        this.perm = (() => {
            const tmp = Array.from({ length: 256 }, () =>
                Math.floor(Math.random() * 256),
            );
            return tmp.concat(tmp);
        })();
    }

    // Helper function to compute gradient vectors (1D)
    // The gradients are generated with more than unit length.
    // The final noise values need to be rescaled to fit something like [-1, 1] or [0, 1]
    // x: distance to the corner
    private static grad(hash: number, x: number) {
        const h = hash & 0x0f;
        const grad = 1 + (h & 7);

        if ((h & 8) !== 0) {
            return -grad * x;
        }

        return grad * x;
    }

    // 1D Perlin simplex noise
    // returns Noise value in the range [-1, 1], value of 0 on all int coordinates
    getNoiseValue(x: number): number {
        
        // no need to skew the input space in 1D
        
        // Corners coordinates (nearest integer values):
        const i0: number = Math.floor(x);
        const i1: number = i0 + 1;
        // Distances to corners( between 0 and 1)
        const x0 = x - i0;
        const x1 = x0 - 1.0;
        
        // Calculate contribution from first corner
        let t0 = 1.0 - (x0 * x0);
        t0 *= t0
        // Second corner
        let t1 = 1.0 - (x1 * x1);
        t1 *= t1

        // noise contributions from two corners
        const n0 = t0 * t0 * Perlin.grad(this.perm[i0 & 0xff], x0);
        const n1 = t1 * t1 * Perlin.grad(this.perm[i1 & 0xff], x1);
        return 0.395 * (n0 + n1);
    }
}