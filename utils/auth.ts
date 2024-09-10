import Cookies from 'js-cookie';
import { getUser, updateUser } from './userData'; // Ensure updateUser is imported

const COOKIE_NAME = 'auth';


export const login = (username: string, password: string): boolean => {
    const user = getUser();

    if (user && username === user.username && password === user.password) {
               Cookies.set(COOKIE_NAME, 'logged_in', { expires: 7, sameSite: 'None', secure: true })
        return true;
    }
    return false;
};


export const logout = (): void => {
    Cookies.remove(COOKIE_NAME, { sameSite: 'None', secure: true });
};


export const isAuthenticated = (): boolean => {
    return Cookies.get(COOKIE_NAME) === 'logged_in'; 
};


export const updatePassword = (username: string, newPassword: string): void => {
    const user = getUser();

    if (user && user.username === username) {
        updateUser(username, newPassword);
        
        Cookies.set(COOKIE_NAME, 'logged_in', { expires: 7, sameSite: 'None', secure: true });         
        alert('Heslo úspešne zmenené.');
    } else {
        alert('Uživatel nenajdený.');
    }
};
