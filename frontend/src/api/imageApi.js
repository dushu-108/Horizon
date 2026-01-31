import axios from "axios";

export default async function generateImage(title, desc, palette, style, token) {
    const response = await axios.post('https://horizon-di3m.onrender.com/logo/', {
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
    const response = await axios.get('https://horizon-di3m.onrender.com/logo/', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export const deleteLogo = async (id, token) => {
    const response = await axios.delete(`https://horizon-di3m.onrender.com/logo/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}
