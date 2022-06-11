export const START_TIMER = "START_TIMER";
export const STOP_TIMER = "STOP_TIMER";
export const RESET_TIMER = "STOP_TIMER";


export function startTimer() {
    return {
        type: START_TIMER
    }
}

export function stopTimer() {
    return {
        type: STOP_TIMER
    }
}