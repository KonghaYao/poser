export function rad(x: number) {
    return (x * Math.PI) / 180;
}
export function grad(x: number) {
    return Number(((x * 180) / Math.PI).toFixed(1));
}
export function sin(x: number) {
    return Math.sin(rad(x));
}
export function cos(x: number) {
    return Math.cos(rad(x));
}
