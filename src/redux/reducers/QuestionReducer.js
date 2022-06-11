import {
    PRACTICE_ANSWER,
    PRACTICE_INITIALIZE,
    PRACTICE_LOADING,
    PRACTICE_NEXT,
    PRACTICE_PREVIOUS,
    PRACTICE_STARTED,
    PRACTICE_SUBMIT,
    PRACTICE_FAILED,
    FAVORITE_STARTED,
    ADD_TO_FAVORITE,
    FAVORITE_FAILED,
} from "../actions/QuestionAction";

// Sample
const initialState = {
    question: null,
    isLoading: false,
    isStarting: true,
    initialized: false,
    isPrevious: false,
    answer: null,
    nextQuestion: null,
    prevQuestionId: null,
    ansCorrect: null,
    solution: null,
    isLast: false,
    totalQuestions: 0,
    solved: 0,
    solvedIds: {},
    wrong: 0,
    error: "",
    isSubmit: false,
    // Favorite.
    onFavorite: false,
    favoriteError: '',
    favoriteLoading: false,
};

export default function QuestionReducer(state = initialState, action) {
    switch (action.type) {
        case FAVORITE_STARTED:
            return {
                ...state,
                favoriteLoading: true,
                favoriteError: '',
                onFavorite: false,
            }
        case ADD_TO_FAVORITE:
            return {
                ...state,
                favoriteLoading: false,
                onFavorite: true,
            }
        case FAVORITE_FAILED:
            return {
                ...state,
                favoriteLoading: false,
                favoriteError: action.data || '',
            }
        case PRACTICE_INITIALIZE:
            return {
                ...initialState,
                initialized: true
            }
        case PRACTICE_LOADING:
            return {
                ...state,
                isLoading: true,
                // question: null,
                isSubmit: false,
                error: ""
            }
        case PRACTICE_STARTED:
            return {
                ...state,
                isLoading: false,
                isStarting: false,
                question: action.data,
                isSubmit: true,
                prevQuestionId: action?.data?._id,
                isPrevious: false,
                totalQuestions: (action?.total || 0)
            }
        case PRACTICE_ANSWER:
            return {
                ...state,
                answer: action.data
            }
        case PRACTICE_SUBMIT:
            // TODO: Solution HERE.
            let solved = state.solved, wrong = state.wrong;
            // Conditions to Check if The question user is Solving is Previously solved or not.
            if ((state.question._id) in state.solvedIds) {
                if (state.solvedIds[state.question._id] === true && (action.data.ansCorrect !== true)) {
                    // Previous Correct & Now Wrong.
                    ++wrong;
                    --solved;
                } else if (state.solvedIds[state.question._id] !== true && (action.data.ansCorrect === true)) {
                    // Previous Wrong & Now Correct.
                    ++solved;
                    --wrong;
                }
            } else {
                if (action.data.ansCorrect === true) {
                    ++solved;
                } else ++wrong;
            }

            const solvedIds = {
                ...(state.solvedIds),
                [state.question._id]: (action.data.ansCorrect === true)
            }

            return {
                ...state,
                nextQuestion: action.data.question,
                prevQuestionId: action?.data?.question?._id,
                ansCorrect: action.data.ansCorrect,
                solution: action.data.solution,
                solvedIds,
                solved,
                wrong,
                isLoading: false,
                isLast: (action?.data?.isLast === true),
                isSubmit: false,
            }
        case PRACTICE_NEXT:
            return {
                ...state,
                question: state.nextQuestion,
                ansCorrect: null,
                solution: null,
                isPrevious: true,
                nextQuestion: null,
                answer: null,
                isSubmit: true,
                onFavorite: false,
            }
        case PRACTICE_PREVIOUS:
            return {
                ...state,
                question: action?.data?.question,
                isPrevious: (action?.data?.isStart !== true),
                isLoading: false,
                ansCorrect: null,
                solution: null,
                nextQuestion: null,
                isSubmit: true,
                onFavorite: false,
                answer: null,
            }
        case PRACTICE_FAILED:
            return {
                ...state,
                error: action?.data || ''
            }
        default:
            return state;
    }
}