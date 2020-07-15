import { combineReducers } from "redux";

//reducers
import usersList from "./users-list";
import usersListState from "./users-list-state";

//reducer selectors
import * as fromUsersList from "./users-list";
import * as fromUsersListState from  "./users-list-state";


const rootReducer = combineReducers({
    usersList,
    usersListState
});

export default rootReducer;

///////////////////////////////////SELECTORS/////////////////////////////////////////////////////////////
export const getUsersList = state => fromUsersList.getUsersList(state.usersList);


export const getInitialLoadErrorMessage = state => fromUsersListState.getInitialLoadErrorMessage(state.usersListState);
export const getLoadMoreErrorMessage = state => fromUsersListState.getLoadMoreErrorMessage(state.usersListState);
export const getAddUserErrorMessage = state => fromUsersListState.getAddUserErrorMessage(state.usersListState);
export const getIsMoreUsersLoading = state => fromUsersListState.getIsMoreUsersLoading(state.usersListState);
export const getIsInitialLoading = state => fromUsersListState.getIsInitialLoading(state.usersListState);
export const getIsNewUserAdding = state => fromUsersListState.getIsNewUserAdding(state.usersListState);
export const getLoadedUsersCount = state => fromUsersListState.getLoadedUsersCount(state.usersListState);
export const getInitialUsersListLoaded = state => fromUsersListState.getInitialUsersListLoaded(state.usersListState);
///////////////////////////////////SELECTORS/////////////////////////////////////////////////////////////
