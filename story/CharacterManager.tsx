import { For, createSelector, onMount, useContext } from 'solid-js';
import { config } from '../src/config';
import { atom } from '@cn-ui/use';
import { Male, Mannequin } from '../src';
import { AppContext } from './App';

export const CharacterManager = () => {
    const { control, selectingModel } = useContext(AppContext);
    const characters = atom<Mannequin[]>([]);
    const addCharacter = () => {
        const newOne = new Male();
        characters((i) => [...i, newOne]);
        control().focusingMode(newOne);
        selectingModel(newOne);
        config.ReRender();
    };

    const isSelect = createSelector(selectingModel);
    onMount(() => {
        characters().length === 0 && addCharacter();
    });
    return (
        <div class="fixed left-4 top-4 z-20 h-96 w-40 overflow-auto rounded-2xl bg-white p-2">
            <div class="flex h-full w-full flex-col">
                <header class="border-b border-solid border-slate-300">
                    <button
                        onclick={() => {
                            addCharacter();
                        }}
                    >
                        添加
                    </button>
                    <button></button>
                </header>
                <div>
                    <For each={characters()}>
                        {(item: Mannequin) => {
                            return (
                                <div
                                    class="flex justify-between"
                                    classList={{
                                        'bg-slate-300': isSelect(item),
                                    }}
                                >
                                    <button
                                        onClick={() => {
                                            selectingModel(item);
                                        }}
                                    >
                                        {item.uuid.slice(0, 6)}
                                    </button>

                                    <button
                                        onclick={() => {
                                            if (characters().length <= 1) return false;
                                            if (selectingModel() === item) {
                                                selectingModel(
                                                    characters().find((i) => i !== item)
                                                );
                                            }
                                            item.removeFromParent();
                                            characters((i) => i.filter((it) => it !== item));
                                            config.ReRender();
                                        }}
                                    >
                                        删除
                                    </button>
                                </div>
                            );
                        }}
                    </For>
                </div>
            </div>
        </div>
    );
};
