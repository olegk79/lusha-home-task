import USERS_LIST_ACTIONS from "../actions/usersListActions";

const usersList = (state = [], action) => {
    switch (action.type) {
        case USERS_LIST_ACTIONS.INITIAL_USERS_LIST_LOADED:
                return action.data;
        case USERS_LIST_ACTIONS.INITIAL_USERS_LIST_LOAD_FAILED:
            return [];
            case USERS_LIST_ACTIONS.MORE_USERS_LOADED:
                let newState = state.slice();
                // we need to check if in "more users" we already have same user(s) in our state
                // may be we added it recently - since last "load more" and this added user comes again in "more users"
                // in this case we should not add it again to our state
                for(let moreUser of action.data ) {
                    if(!state.find(user=>user.email === moreUser.email)) {
                        newState.push(moreUser);
                    }
                }
                return newState;
                case USERS_LIST_ACTIONS.NEW_USER_ADDED:
                    return [...state.slice(), action.data];
            default:
                return state;
            
    }
};


export default usersList;

///////////////SELECTORS//////////////////////////
export const getUsersList = state => state;
