import{SET_SORTING_PREFERENCE_BY_DATE,
    SET_SORTING_PREFERENCE_BY_SCORE
} from '../actions/post_action'
function preference(state = {}, action) {

    switch (action.type) {
        // set sorting prefrence by date
        case SET_SORTING_PREFERENCE_BY_DATE:
            return {
                ...state,
                ['sorting']: 'byDate'
            };

        // set sorting prefrence by score
        case SET_SORTING_PREFERENCE_BY_SCORE:
            return {
                ...state,
                ['sorting']: 'byScore'
            };

        // any other action: return all prefrences
        default:
            return state;
    }
}
export default preference