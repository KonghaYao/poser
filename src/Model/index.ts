import { Mannequin } from "../Mannequin/Mannequin";

export class Female extends Mannequin {
    constructor(height = 0.95) {
        super(true, height);
        this.position.y = 2.2;
        this.l_leg.straddle -= 4;
        this.r_leg.straddle -= 4;
        this.l_ankle.tilt -= 4;
        this.r_ankle.tilt -= 4;
    }
}
export class Male extends Mannequin {
    constructor(height = 1) {
        super(false, height);
        this.position.y = 3.8;
        this.l_leg.straddle += 6;
        this.r_leg.straddle += 6;
        this.l_ankle.turn += 6;
        this.r_ankle.turn += 6;
        this.l_ankle.tilt += 6;
        this.r_ankle.tilt += 6;
    }
}
export class Child extends Mannequin {
    constructor(height = 0.65) {
        super(false, height);
        this.position.y = -7.7;
        this.l_arm.straddle -= 2;
        this.r_arm.straddle -= 2;
    }
}
class Dog extends Mannequin {
    constructor(height = 0.5) {
        super(false, height);
        this.position.y = -18;
        this.rotation.x = 1.57;
        this.l_leg.straddle += 6;
        this.r_leg.straddle += 6;
        this.l_ankle.turn += 6;
        this.r_ankle.turn += 6;
        this.l_ankle.tilt += 6;
        this.r_ankle.tilt += 6;
    }
}
