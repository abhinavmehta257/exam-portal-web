import { START_TIMER, STOP_TIMER } from "../actions/TimerAction";

// Sample
const initialState = {
    isRunning: false,
    start: false,
};

export default function TimerReducer(state = initialState, action) {
    switch (action.type) {
        case START_TIMER:
            return {
                ...state,
                isRunning: true,
                start: true
            }
        case STOP_TIMER:
            return {
                ...state,
                isRunning: false,
                start: false
            }
        default:
            return state
    }
}