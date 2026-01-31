import axios from "axios";

export async function loginWithEmail(email, password, avatar) {
    const response = await axios.post("http://localhost:8000/auth/login", {
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
    const response = await axios.post("http://localhost:8000/auth/register", {
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
    const response = await axios.put("http://localhost:8000/auth/update", {
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
    const response = await axios.delete("http://localhost:8000/auth/delete", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return response;
}

export function loginWithGoogle() {
    window.location.href = "http://localhost:8000/auth/google/login";
}