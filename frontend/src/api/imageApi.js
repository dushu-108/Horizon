import axios from "axios";

export default async function generateImage(title, desc, palette, style, token) {
    const response = await axios.post('http://localhost:8000/logo/', {
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
    const response = await axios.get('http://localhost:8000/logo/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const deleteLogo = async (id, token) => {
    const response = await axios.delete(`http://localhost:8000/logo/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}
