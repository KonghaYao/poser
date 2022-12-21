/**逐帧计数器，从 0 计数到某一个值 */
export const createMotion = (
    cb: (time: number, total: number) => void,
    time = 100,
    getInner?: (cancel: Function) => void
) => {
    return new Promise<boolean>((res) => {
        let count = 0;
        let requestID = window.requestAnimationFrame(inner);
        function inner() {
            count++;
            if (count > time) {
                cancelAnimationFrame(requestID);
                res(true);
            } else {
                cb(count, time);
                requestID = window.requestAnimationFrame(inner);
            }
        }

        getInner &&
            getInner(() => {
                cancelAnimationFrame(requestID);
                res(false);
            });
    });
};
