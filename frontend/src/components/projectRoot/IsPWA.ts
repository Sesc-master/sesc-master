export function isPWA() {
    return window.matchMedia("(display-mode: standalone)").matches ||
        window.matchMedia("(display-mode: minimal-ui)").matches || process.env.NODE_ENV !== 'production';
}