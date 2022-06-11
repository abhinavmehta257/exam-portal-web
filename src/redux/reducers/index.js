import userReducer from './UserReducer';
import { combineReducers } from 'redux';
import LoginReducers from './LoginReducers';
import QuestionReducer from './QuestionReducer';
import PracticeReducer from './PracticeReducer';
import TimerReducer from './TimerReducer';
import FavoriteReducer from './FavoriteReducer';

import competitionReducer from './competitionReducer'
import subjectReducer from './subjectReducer'
import countryReducer from './countryReducer'
import classReducer from './classReducer'
import questionSheetReducer from './questionSheetReducer'
import questionDifficultiReducer from './questionDifficultiReducer'
import skillReducer from './skillReducer'


export default combineReducers({
    user: userReducer,
    login: LoginReducers,
    question: QuestionReducer,
    practice: PracticeReducer,
    timer: TimerReducer,
    favorite: FavoriteReducer,
    competitions: competitionReducer,
    subject: subjectReducer,
    country: countryReducer,
    class: classReducer,
    questionSheet: questionSheetReducer,
    difficulties: questionDifficultiReducer,
    skills: skillReducer
});
