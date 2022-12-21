import { For, createSelector, onCleanup, onMount, useContext } from 'solid-js';
import { atom } from '@cn-ui/use';
import { AppContext } from './App';
import { useBindEvent } from './useBindEvent';

export const SettingPanel = () => {
    const { control } = useContext(AppContext);
    const rotateMode = atom('X');
    const lockRotate = atom(false);
    const isSelect = createSelector(rotateMode);
    const update = (e?: Event) => {
        e && e.preventDefault();
        rotateMode(control() && control().rotateMode);
        lockRotate(control() && control().moveBody);
    };
    onMount(() => {
        update();
    });
    useBindEvent(document.body, 'keydown', update);
    useBindEvent(document.body, 'keyup', update);
    const arr = [
        {
            tag: 'X',
            key: 'Shift',
        },
        {
            tag: 'Y',
            key: 'Ctrl',
        },
        {
            tag: 'Z',
            key: 'Alt',
        },
    ];
    return (
        <div class="fixed bottom-4 left-0 z-20 flex w-full place-content-center ">
            <nav class="flex gap-4 rounded-xl bg-slate-50/70 p-2">
                <div
                    class="flex h-16 w-16 cursor-pointer flex-col place-content-center rounded-lg  bg-gradient-to-b from-white to-slate-200 text-center text-xl shadow-sm transition-all active:scale-90"
                    classList={{
                        'ring ring-green-600': lockRotate(),
                    }}
                    onClick={() => {
                        control().moveBody = !control().moveBody;
                        update();
                    }}
                >
                    <span class="font-icon text-4xl">lock_reset</span>
                    <div class="text-xs">{lockRotate() ? '移动模式' : '旋转模式'}</div>
                </div>
                <For each={arr}>
                    {(item) => {
                        return (
                            <div
                                class="flex h-16 w-16 cursor-pointer flex-col place-content-center rounded-lg  bg-gradient-to-b from-white to-slate-200 text-center text-xl shadow-sm transition-all active:scale-90"
                                classList={{
                                    'ring ring-green-600': isSelect(item.tag),
                                }}
                                onClick={() => {
                                    control().rotateMode = item.tag as any;
                                    update();
                                }}
                            >
                                <span>{item.tag}</span>
                                <kbd>{item.key}</kbd>
                            </div>
                        );
                    }}
                </For>
            </nav>
        </div>
    );
};
