import { createContext, createEffect, onMount } from 'solid-js';

import { config } from '../src/config';
import { Control } from '../src/Control/Control';
import { Atom, atom, reflect, resource } from '@cn-ui/use';
import { Mannequin } from '../src';
import { PosturesPanel } from './PosturesPanel';
import { CharacterManager } from './CharacterManager';
import { SettingPanel } from './SettingPanel';
import { useBindEvent } from './useBindEvent';
export const AppContext = createContext<{
    control: Atom<Control>;
    selectingModel: Atom<Mannequin>;
}>();
export const App = () => {
    let container: HTMLDivElement;
    const control = atom<Control>(null);
    const selectingModel = atom<Mannequin>(null);

    onMount(() => {
        config.createScene(container);
        const _control = new Control();
        _control.bindControl();
        control(_control);
    });
    createEffect(() => {
        if (selectingModel() && control()) control().model = selectingModel();
    });
    return (
        <AppContext.Provider value={{ control, selectingModel }}>
            <div class="select-none">
                <ControlPanel></ControlPanel>
                <nav ref={container}></nav>
            </div>
        </AppContext.Provider>
    );
};
const ControlPanel = () => {
    return (
        <>
            <CharacterManager></CharacterManager>
            <PosturesPanel></PosturesPanel>
            <SettingPanel></SettingPanel>
        </>
    );
};
