// this is the file that will contain the logic for the authentication of the user

// this imports the decode function from the jwt-decode package which is used to decode the jwt token
import { decode } from 'jwt-decode';

// this is the AuthService class that will contain the logic for the authentication of the user as a class which will be exported for oop use
class AuthService {

    // this is the constructor of the AuthService class that will be used to initialize the state of the AuthService class
    getProfile() {
        return decode(this.getToken());
    }

    // this is the loggedIn method of the AuthService class that will be used to check if the user is logged in
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // this is the isTokenExpired method of the AuthService class that will be used to check if the token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        }   catch (err) {
            return false;
        }
    }

    // this is the getToken method of the AuthService class that will be used to get the token
    getToken() {
        return localStorage.getItem('id_token');
    }

    // this is the login method of the AuthService class that will be used to log the user in
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    };

    // this is the logout method of the AuthService class that will be used to log the user out
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    };

}

export default new AuthService();