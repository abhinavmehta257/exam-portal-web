import { stringError } from "../../helper/common";
import ClassService from "../../services/ClassService";

export const PRACTICE_SIDEBAR_START = "PRACTICE_SIDEBAR_START";
export const PRACTICE_SIDEBAR_DONE = "PRACTICE_SIDEBAR_DONE";
export const PRACTICE_SIDEBAR_ERROR = "PRACTICE_SIDEBAR_ERROR";
export const PRACTICE_UPDATE_TITLE = "PRACTICE_UPDATE_TITLE";


export function loadPracticeSidebar(subjects, difficulties = [], selectedSubtopic = '') {
    return dispatch => {
        dispatch({ type: PRACTICE_SIDEBAR_START, data: difficulties });
        dispatch(changePracticeTitle(selectedSubtopic));
        ClassService
            .listSkillsSubtopic(subjects)
            .then(data => {
                if ((data || []).length > 0) {
                    dispatch({
                        type: PRACTICE_SIDEBAR_DONE,
                        data
                    });
                }
            })
            .catch(stringError(err => dispatch({ type: PRACTICE_SIDEBAR_ERROR, data: err })));
    };
}

export function changePracticeTitle(title) {
    document.title = `SuperC - ${title} Practice`;
    return {
        type: PRACTICE_UPDATE_TITLE,
        data: title,
    }
}