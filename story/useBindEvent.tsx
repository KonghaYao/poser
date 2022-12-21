import { onCleanup } from 'solid-js';

export function useBindEvent<D extends HTMLElement>(
    dom: D,
    type: Parameters<D['addEventListener']>[0],
    listener: Parameters<D['addEventListener']>[1],
    options?: Parameters<D['addEventListener']>[2]
) {
    dom.addEventListener(type, listener, options);
    onCleanup(() => {
        dom.removeEventListener(type, listener);
    });
}
