import Cookies from 'js-cookie';
import { getUser, updateUser } from './userData'; // Ensure updateUser is imported

const COOKIE_NAME = 'auth';


export const login = (username: string, password: string): boolean => {
    const user = getUser();

    if (user && username === user.username && password === user.password) {
        Cookies.set(COOKIE_NAME, 'logged_in', { expires: 7 }); // Set auth cookie for 7 days
        return true;
    }
    return false;
};


export const logout = (): void => {
    Cookies.remove(COOKIE_NAME); // Remove auth cookie
};


export const isAuthenticated = (): boolean => {
    return Cookies.get(COOKIE_NAME) === 'logged_in'; // Return true if the user is logged in
};


export const updatePassword = (username: string, newPassword: string): void => {
    const user = getUser();

    if (user && user.username === username) {
        
        updateUser(username, newPassword);

       
        Cookies.set(COOKIE_NAME, 'logged_in', { expires: 7 }); 
        alert('Password updated successfully. You are logged in with your new password.');
    } else {
        alert('User not found.');
    }
};
