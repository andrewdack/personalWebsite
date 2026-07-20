// Quick 1D Perlin noise calculation used for the 
// psuedo Spotify audio visualizer

class Perlin {
    perm: number[];
    constructor() {
        // Quick permutation table
        this.perm = (() => {
            const tmp = Array.from({ length: 256 }, () =>
                Math.floor(Math.random() * 256)
            );
            return tmp.concat(tmp);
        })();
    }

    // Helper function to compute gradient vectors (1D)
    // The gradients are generated with more than unit length.
    // The final noise values need to be rescaled to fit something like [-1, 1] or [0, 1]
    // x: distance to the corner
    private static grad(hash: number, x: number) {
        const h = hash & 0x0F
        let grad: number = 1 + (h & 7)
        // set a random sign for the gradient
        if ((h & 8) != 0) {
            return (-grad) * x;
        }
        return (grad * x)
    }

    // 1D Perlin simplex noise
    // returns Noise value in the range [-1, 1], value of 0 on all int coordinates
    

}