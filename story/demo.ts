import { Female, Male, Mannequin, config } from '../src/index';
import { Control } from '../src/Control/Control';
import { createMotion } from '../src/utils/createMotion';
console.log('开始');
config.createScene(document.body);

const man = new Male();
const P = await fetch('./test.json').then((res) => res.json());

// console.log(man, P);
// 设置中间姿势
// man.posture = Mannequin.blend(man.posture, P, 0.5);

const control = new Control();
control.bindControl();
control.focusingMode(man);

await createMotion((count, total) => {
    man.posture = Mannequin.blend(man.posture, P, count / total);
    // console.log(count / total);
}, 100);
console.log('完成');
