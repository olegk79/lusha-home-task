import USERS_LIST_ACTIONS from "../actions/usersListActions";
import { combineReducers } from "redux";

const initialLoadErrorMessage = (state = "", action) => {
    switch (action.type) {
        case USERS_LIST_ACTIONS.INITIAL_USERS_LIST_LOAD_FAILED:
            return action.data;
        case USERS_LIST_ACTIONS.INITIAL_USERS_LIST_LOADED:
        case USERS_LIST_ACTIONS.LOADING_INITIAL_USERS_LIST:
            return "";
        default:
            return state;
    }
};

const loadMoreErrorMessage = (state = "", action) => {
    switch (action.type) {
        case USERS_LIST_ACTIONS.MORE_USERS_LOAD_FAILED:
            return action.data;
        case USERS_LIST_ACTIONS.MORE_USERS_LOADED:
        case USERS_LIST_ACTIONS.LOADING_MORE_USERS:
            return "";
        default:
            return state;
    }
};

const addUserErrorMessage = (state = "", action) => {
    switch (action.type) {
        case USERS_LIST_ACTIONS.ADDING_NEW_USER:
        case USERS_LIST_ACTIONS.NEW_USER_ADDED:
            return "";
        case USERS_LIST_ACTIONS.NEW_USER_ADD_FAILED:
            console.log(action.data);
            if (action.data.emailExists) {
                return "user with specified email already exists";
            } else {
                return action.data.error;
            }

        default:
            return state;
    }
};

const isMoreUsersLoading = (state = false, action) => {
    switch (action.type) {
        case USERS_LIST_ACTIONS.LOADING_MORE_USERS:
            return true;
        case USERS_LIST_ACTIONS.MORE_USERS_LOADED:
        case USERS_LIST_ACTIONS.MORE_USERS_LOAD_FAILED:
            return false;
        default:
            return state;
    }

}

const isInitialLoading = (state = true, action) => {
    switch (action.type) {
        case USERS_LIST_ACTIONS.LOADING_INITIAL_USERS_LIST:
            return true;
        case USERS_LIST_ACTIONS.INITIAL_USERS_LIST_LOADED:
        case USERS_LIST_ACTIONS.INITIAL_USERS_LIST_LOAD_FAILED:
            return false;

        default:
            return state;
    }
}

const isNewUserAdding = (state = false, action) => {
    switch (action.type) {
        case USERS_LIST_ACTIONS.ADDING_NEW_USER:
            return true;
        case USERS_LIST_ACTIONS.NEW_USER_ADDED:
        case USERS_LIST_ACTIONS.NEW_USER_ADD_FAILED:
            return false;
        default:
            return state;
    }
}

const loadedUsersCount = (state = 0, action) => {
    switch(action.type) {
        case USERS_LIST_ACTIONS.INITIAL_USERS_LIST_LOADED:
            case USERS_LIST_ACTIONS.MORE_USERS_LOADED:
            return state + action.data.length;
            default:
                return state;
    }
};

const initialUsersListLoaded = (state = false, action) =>{
    switch(action.type) {
        case USERS_LIST_ACTIONS.INITIAL_USERS_LIST_LOADED:
            return true;
            default:
                return state;
    }

};

const usersListState = combineReducers({
    initialLoadErrorMessage,
    loadMoreErrorMessage,
    addUserErrorMessage,
    isMoreUsersLoading,
    isInitialLoading,
    isNewUserAdding,
    loadedUsersCount,
    initialUsersListLoaded
});

export default usersListState;

///////////////SELECTORS//////////////////////////
export const getInitialLoadErrorMessage = state => state.initialLoadErrorMessage;
export const getLoadMoreErrorMessage = state => state.loadMoreErrorMessage;
export const getAddUserErrorMessage = state => state.addUserErrorMessage;
export const getIsMoreUsersLoading = state => state.isMoreUsersLoading;
export const getIsInitialLoading = state => state.isInitialLoading;
export const getIsNewUserAdding = state => state.isNewUserAdding;
export const getLoadedUsersCount = state => state.loadedUsersCount;
export const getInitialUsersListLoaded = state => state.initialUsersListLoaded;