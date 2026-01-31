import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default async function generateImage(title, desc, palette, style, token) {
    const response = await axios.post(`${BACKEND_URL}/logo/`, {
        title,
        desc,
        palette,
        design_idea: style,
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const fetchLogos = async (token) => {
    const response = await axios.get(`${BACKEND_URL}/logo/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const deleteLogo = async (id, token) => {
    const response = await axios.delete(`${BACKEND_URL}/logo/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}
