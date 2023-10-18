import axios from "axios";

export default class AuthService {
    async signup(newUser) {
        return await axios.post(`${process.env.REACT_APP_API_BASE}/auth/signup/`, newUser)
    };

    async signin(user) {
        return await axios.post(`${process.env.REACT_APP_API_BASE}/auth/signin/`, user)
            .then((response) => {
                if (response.data.user.token) {
                    const logedInUser = response.data.user;
                    localStorage.setItem("user", JSON.stringify(logedInUser));
                }

                return response;
            });
    };

    logout() {
        localStorage.removeItem("user");
        sessionStorage.clear();
    };
}