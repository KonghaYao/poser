import { MANNEQUIN_POSTURE_VERSION } from "./Mannequin";

export class MannequinPostureVersionError extends Error {
    constructor(version: number) {
        super(
            "Posture data version " +
                version +
                " is incompatible with the currently supported version " +
                MANNEQUIN_POSTURE_VERSION +
                "."
        );
        this.name = "IncompatibleMannequinError";
    }
}
