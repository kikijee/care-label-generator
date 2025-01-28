

export function inchesToPixels(x: number, y: number): { xPixels: number; yPixels: number } {
    const PPI = 96; // Pixels per inch
    const xPixels = x * PPI;
    const yPixels = y * PPI;

    return { xPixels, yPixels };
}