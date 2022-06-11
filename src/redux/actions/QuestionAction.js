import { setPracticeToken, stringError } from "../../helper/common";
import FavoriteService from "../../services/FavoriteService";
import QuestionService from "../../services/QuestionService";

export const PRACTICE_INITIALIZE = "PRACTICE_INITIALIZE";
export const PRACTICE_LOADING = "PRACTICE_LOADING";
export const PRACTICE_STARTED = "PRACTICE_STARTED";
export const PRACTICE_SUBMIT = "PRACTICE_SUBMIT";
export const PRACTICE_NEXT = "PRACTICE_NEXT";
export const PRACTICE_PREVIOUS = "PRACTICE_PREVIOUS";
export const PRACTICE_FAILED = "PRACTICE_FAILED";
export const PRACTICE_ANSWER = "PRACTICE_ANSWER";
export const FAVORITE_STARTED = "FAVORITE_STARTED";
export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const FAVORITE_FAILED = "FAVORITE_FAILED";

export function prevQuestion() {
    return (dispatch, getState) => {
        const { question } = getState();
        const id = question.prevQuestionId;
        if (!id)
            return Promise.resolve(true);

        dispatch({ type: PRACTICE_LOADING });
        return new Promise(resolve => {
            QuestionService.prevQuestion({
                id,
                time: new Date()
            })
                .then(({ data }) => {
                    dispatch({ type: PRACTICE_PREVIOUS, data });
                    resolve(true);
                })
                .catch(stringError(x => {
                    resolve(false);
                    dispatch({
                        type: PRACTICE_FAILED,
                        data: x
                    });
                }));
        });
    }
}


export function startPractice(request) {
    return (dispatch) => {
        dispatch({ type: PRACTICE_LOADING });

        QuestionService.startQuiz(request)
            .then(({ data }) => {
                setPracticeToken(data.token);
                // TODO: Check if Reached the end.
                dispatch({
                    type: PRACTICE_STARTED,
                    data: data.question,
                    total: data.total
                });
            })
            .catch(stringError(x => dispatch({
                type: PRACTICE_FAILED,
                data: x
            })));
    };
}

export function initializePractice() {
    return (dispatch) => {
        dispatch({ type: PRACTICE_INITIALIZE });
    };
}

export function submitAnswer() {
    return (dispatch, getState) => {
        const { question } = getState();
        const requestBody = {
            id: question.question?._id,
            time: new Date(),
            ans: question?.answer,
            format: question?.question?.formatID,
        };

        dispatch({ type: PRACTICE_LOADING });
        return new Promise((resolve) => {
            QuestionService.submitQuiz(requestBody)
                .then(({ data }) => {
                    resolve(true);
                    dispatch({ type: PRACTICE_SUBMIT, data: data });
                })
                .catch(stringError(x => {
                    resolve(false);
                    dispatch({
                        type: PRACTICE_FAILED,
                        data: x
                    });
                }));
        });
    }
}

export function updateAnswer(ans) {
    return dispatch => dispatch({ type: PRACTICE_ANSWER, data: ans });
}

export function nextQuestion() {
    return {
        type: PRACTICE_NEXT
    }
}

export function addToFavorite() {
    return (dispatch, getState) => {
        const { question } = getState();
        const id = question?.question?._id;
        if (id) {
            dispatch({ type: FAVORITE_STARTED });
            FavoriteService.addToFavorite(id)
                .then(() => dispatch({ type: ADD_TO_FAVORITE }))
                .catch(stringError(err => dispatch({ type: ADD_TO_FAVORITE, data: err })));
        }
    };
}