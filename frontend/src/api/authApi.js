import axios from "axios";

export async function loginWithEmail(email, password) {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const response = await axios.post("http://localhost:8000/auth/login", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    
    return response;
}

export async function registerWithEmail(email, password) {
    const response = await axios.post("http://localhost:8000/auth/register", {
        email: email,
        password: password
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response;
}

export function loginWithGoogle() {
    window.location.href = "http://localhost:8000/auth/google/login";
}