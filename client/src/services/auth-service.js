import axios from "axios";

export default class AuthService{
    constructor(){
        this._apiBase = 'http://localhost:8000/api/auth'
    };

    async signup(newUser){
        return await axios.post(`${this._apiBase}/signup/`, newUser)
    };

    async signin(user){
        return await axios.post(`${this._apiBase}/signin/`, user)
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