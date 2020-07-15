import getUsersSvc from "../services/getUsers";
import addUserSvc from "../services/addUser";
import PAGE_SIZE from "../const/pageSize";

const USERS_LIST_ACTIONS = {
    LOADING_INITIAL_USERS_LIST: "FETCH_USELOADING_INITIAL_USERS_LISTRS_LIST_INIT",
    INITIAL_USERS_LIST_LOADED: "INITIAL_USERS_LIST_LOADED",
    INITIAL_USERS_LIST_LOAD_FAILED: "INITIAL_USERS_LIST_LOAD_FAILED",
    LOADING_MORE_USERS: "LOADING_MORE_USERS",
    MORE_USERS_LOADED: "MORE_USERS_LOADED",
    MORE_USERS_LOAD_FAILED: "MORE_USERS_LOAD_FAILED",
    ADDING_NEW_USER: "ADDING_NEW_USER",
    NEW_USER_ADDED: "NEW_USER_ADDED",
    NEW_USER_ADD_FAILED: "NEW_USER_ADD_FAILED"
}

export const loadingInitialUsersList = () => ({
    type: USERS_LIST_ACTIONS.LOADING_INITIAL_USERS_LIST
});

export const initialUsersListLoaded = (data) => ({
    type: USERS_LIST_ACTIONS.INITIAL_USERS_LIST_LOADED,
    data
});

export const initialUsersListLoadFailed = (data) => ({
    type: USERS_LIST_ACTIONS.INITIAL_USERS_LIST_LOAD_FAILED,
        data
});

export const handleLoadInitialUsersList = () => {
    return async (dispatch) => {
        dispatch(loadingInitialUsersList());
        try {
            let response = await getUsersSvc(0, PAGE_SIZE);
            if (response.data.success === true) {
                dispatch(initialUsersListLoaded(response.data.data));
            } else {
                dispatch(initialUsersListLoadFailed(response.data.error));
            }
        }
        catch (e) {
            dispatch(initialUsersListLoadFailed(e.message));
        }

    };
};

export const loadingMoreUsers = () => ({
    type: USERS_LIST_ACTIONS.LOADING_MORE_USERS
});

export const moreUsersLoaded = (data) => ({
type: USERS_LIST_ACTIONS.MORE_USERS_LOADED,
data
});

export const moreUsersLoadFailed = (data) => ({
type: USERS_LIST_ACTIONS.MORE_USERS_LOAD_FAILED,
data
});

export const handleLoadMoreUsers = (skip, limit) => {
    return async (dispatch) => {
        dispatch(loadingMoreUsers());
        try {
            let response = await getUsersSvc(skip, limit);
            if (response.data.success) {
                dispatch(moreUsersLoaded(response.data.data));
            } else {
                dispatch(moreUsersLoadFailed(response.data.error));
            }
        }
        catch (e) {
            dispatch(initialUsersListLoadFailed(e.message));
        }

    };

};

export const addingNewUser = () => ({
    type: USERS_LIST_ACTIONS.ADDING_NEW_USER
});

export const newUserAdded = (data) => ({
    type: USERS_LIST_ACTIONS.NEW_USER_ADDED,
        data
});

export const newUserAddFailed = (data) => ({
    type: USERS_LIST_ACTIONS.NEW_USER_ADD_FAILED,
        data
});

export const handleAddNewUser = (data) => {
    return async (dispatch) => {
        dispatch(addingNewUser());
        try {
            let response = await addUserSvc(data);
            if(response.data.success) {
                dispatch(newUserAdded(data));
            } else {
                dispatch(newUserAddFailed(response.data));
            }
        }
        catch (e) {
            dispatch(newUserAddFailed({
                emailExists:false,
                error:e.message
            }));
        }
    }
};


export default USERS_LIST_ACTIONS;