import { stringError } from "../../helper/common";
import FavoriteService from "../../services/FavoriteService";

export const FAVORITE_FETCH_START = "FAVORITE_FETCH_START";
export const FAVORITE_FETCH = "FAVORITE_FETCH";
export const FAVORITE_FETCH_ERROR = "FAVORITE_FETCH_ERROR";
export const FAVORITE_REMOVE = "FAVORITE_REMOVE";


// export function fetchFavorite(page) {
//     return (dispatch, getState) => {
//         // const { favorite } = getState();
//         dispatch({ type: FAVORITE_FETCH_START, data: page });
//         FavoriteService
//             .loadFavoriteQuestions(page)
//             .then((ques) => {
//                 dispatch({ type: FAVORITE_FETCH, data: ques });
//             })
//             .catch(stringError(data => dispatch({ type: FAVORITE_FETCH_ERROR, data })));
//     };
// }

export function nextFavorite() {
    return (dispatch, getState) => {
        const { favorite } = getState();
        const page = favorite.page + 1;
        dispatch({ type: FAVORITE_FETCH_START, data: page });
        FavoriteService
            .loadFavoriteQuestions(page)
            .then((ques) => {
                dispatch({ type: FAVORITE_FETCH, data: ques });
            })
            .catch(stringError(data => dispatch({ type: FAVORITE_FETCH_ERROR, data })));
    }
}

export function removeFavorite(favoriteID) {
    return {
        type: FAVORITE_REMOVE,
        data: favoriteID
    };
}