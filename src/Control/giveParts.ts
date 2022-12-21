import { Mannequin } from "../Mannequin/Mannequin";

export const givePartsToModel = (model: Mannequin) => {
    model.l_tips = model.l_fingers.tips;
    model.r_tips = model.r_fingers.tips;
    // name body parts and their motions
    [
        ["body", "tilt", "turn", "bend"],
        ["pelvis", "tilt", "turn", "bend"],
        ["torso", "tilt", "turn", "bend"],
        ["neck", "tilt", "turn", "nod"],
        ["head", "tilt", "turn", "nod"],
        ["l_leg", "straddle", "turn", "raise"],
        ["l_knee", "", "", "bend"],
        ["l_ankle", "tilt", "turn", "bend"],
        ["l_arm", "straddle", "turn", "raise"],
        ["l_elbow", "", "", "bend"],
        ["l_wrist", "tilt", "turn", "bend"],
        ["l_fingers", "", "", "bend"],
        ["l_tips", "", "", "bend"],
        ["r_leg", "straddle", "turn", "raise"],
        ["r_knee", "", "", "bend"],
        ["r_ankle", "tilt", "turn", "bend"],
        ["r_arm", "straddle", "turn", "raise"],
        ["r_elbow", "", "", "bend"],
        ["r_wrist", "tilt", "turn", "bend"],
        ["r_fingers", "", "", "bend"],
        ["r_tips", "", "", "bend"],
    ].forEach(([name, x, y, z]) => {
        for (const part of model[name].children[0].children) part.name = name;
        for (const part of model[name].children[0].children[0].children)
            part.name = name;
        if (model[name].children[0].children[1])
            for (const part of model[name].children[0].children[1].children)
                part.name = name;
        model[name].nameUI = {
            x,
            y,
            z,
        };
    });
};
