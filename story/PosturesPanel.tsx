import { For, Show, useContext } from 'solid-js';
import { allPosture } from './postures';
import { atom, reflect } from '@cn-ui/use';
import { AppContext } from './App';
import { getPostureAnimate } from './getPostureAnimate';

export const PosturesPanel = () => {
    const { control, selectingModel } = useContext(AppContext);
    const speed = atom(50);
    const Animation = reflect(() => selectingModel() && getPostureAnimate(selectingModel(), speed));

    return (
        <Show when={Animation()}>
            <div class="fixed right-4 top-4 z-20  flex max-h-96 w-fit flex-col gap-2 overflow-auto rounded-2xl bg-white p-2">
                <header class="flex justify-between">
                    <div
                        class="h-4 w-4 rounded-full"
                        classList={{
                            'bg-red-600': Animation().running(),
                            'bg-green-600': !Animation().running(),
                        }}
                    ></div>
                    <nav class="flex gap-1">
                        <input
                            type="range"
                            min={16}
                            max={1000}
                            value={speed()}
                            oninput={(e) => speed(parseInt((e.target as any).value))}
                        />
                        {speed()}
                    </nav>
                </header>
                <div class="flex h-full w-full max-w-xs flex-1 flex-wrap  gap-1 overflow-auto">
                    <For each={allPosture}>
                        {(item) => {
                            return (
                                <div
                                    class="cursor-pointer select-none rounded-md bg-slate-50 px-1 text-sm hover:bg-slate-100 "
                                    onclick={() => {
                                        fetch('./data/' + item[0] + '.json')
                                            .then((res) => res.json())
                                            .then((res) => {
                                                Animation().changeTo(res);
                                            });
                                    }}
                                >
                                    {item[1]}
                                </div>
                            );
                        }}
                    </For>
                </div>
            </div>
        </Show>
    );
};
