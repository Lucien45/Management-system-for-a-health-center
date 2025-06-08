import type { AxiosResponse } from "axios";
import { Token } from "../utils/Token";
import Axios from "./axios"

const token = Token.GetToken('authUser');

export interface LoginResponse {
    identification: string;
    password: string;
}

interface UserStatus {
    role: string;
    is_active: boolean;
}

export interface LoginSuccessResponse {
    token: string;
    user: string;
}

/**
 * service for users
 */

const getUserById = (id: number | string) => {
    return Axios.get(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const updateUser = (id: number | string, data: FormData): Promise<FormData> => {
    return Axios.patch(`/users/${id}`, data,{
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

const updateUserStatus = (id: number | string, data: UserStatus): Promise<UserStatus> => {
    return Axios.patch(`/users/${id}`, data,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

const deleteUser = (id: number | string) => {
    return Axios.delete(`/users/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

const getAllUsers = () => {
    return Axios.get(`/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const SignUp = (data: FormData): Promise<FormData> => {
    return Axios.post("/users/register", data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

const SignIn = (data: LoginResponse): Promise<AxiosResponse<LoginSuccessResponse>> => {
    return Axios.post("/users/login", data);
}

const SignOut = () => {
    Token.RemoveToken('authUser');
    Token.RemoveToken('user');
    console.warn('suppression du token auth........');
    window.location.href = '/';
};
export const UserService = {
    SignUp, SignIn, SignOut, getAllUsers, getUserById, updateUser, deleteUser, updateUserStatus
}