import { config } from '../src/config';
import { Atom, atom } from '@cn-ui/use';
import { Mannequin } from '../src';
import { createMotion } from '../src/utils/createMotion';

const Animate_Posture_Symbol = Symbol('Animate_Posture_Symbol ');
export const getPostureAnimate = (
    model: Mannequin,
    speed: Atom<number>
): {
    running: Atom<boolean>;
    changeTo: (posture: any) => Promise<boolean>;
} => {
    if (model[Animate_Posture_Symbol]) return model[Animate_Posture_Symbol];
    const running = atom(false);
    let cancel: Function = () => {};
    const output = {
        running,
        async changeTo(Posture: any) {
            if (running()) cancel();
            let origin = model.posture;
            running(true);
            return createMotion(
                (a, b) => {
                    model.changePosture(Mannequin.blend(origin, Posture, a / b), false);
                    config.ReRender();
                },
                speed(),
                (_cancel) => {
                    cancel = _cancel;
                }
            ).then((res) => {
                running(!res);
                return res;
            });
        },
    };
    model[Animate_Posture_Symbol] = output;
    return output;
};
