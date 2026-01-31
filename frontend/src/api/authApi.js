import axios from "axios";

export async function loginWithEmail(email, password, avatar) {
    const response = await axios.post("https://horizon-di3m.onrender.com/auth/login", {
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
    const response = await axios.post("https://horizon-di3m.onrender.com/auth/register", {
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
    const response = await axios.put("https://horizon-di3m.onrender.com/auth/update", {
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
    const response = await axios.delete("https://horizon-di3m.onrender.com/auth/delete", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return response;
}

export function loginWithGoogle() {
    window.location.href = "https://horizon-di3m.onrender.com/auth/google/login";
}