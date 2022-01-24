import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from "./type";

import { handleLogin, handleSignup } from "../Api";

export const AuthSignup = (user) => {
    return (dispatch) => {
        handleSignup(user)
            .then((res) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res,
                });
                return Promise.resolve(res);
            })
            .catch((err) => {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: err,
                });
                return Promise.reject(err);
            });
    };
};

export const AuthLogin = (user) => {
    return (dispatch) => {
        handleLogin(user)
            .then((res) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res,
                });
                return Promise.resolve(res);
            })
            .catch((err) => {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err,
                });
                return Promise.reject(err);
            });
    };
}