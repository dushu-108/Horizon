import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export async function loginWithEmail(email, password, avatar) {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        email: email,
        password: password,
        avatar: avatar
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    return response;
}

export async function registerWithEmail(name, email, password) {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, {
        name: name,
        email: email,
        password: password,
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response;
}

export async function updateProfile(name, password, avatar) {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${BACKEND_URL}/auth/update`, {
        name: name,
        password: password,
        avatar: avatar
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return response;
}

export async function deleteProfile() {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BACKEND_URL}/auth/delete`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return response;
}

export function loginWithGoogle() {
    window.location.href = `${BACKEND_URL}/auth/google/login`;
}