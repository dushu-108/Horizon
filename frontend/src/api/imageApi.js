import axios from "axios";

export default async function generateImage(title, desc, palette, style) {
    const response = await axios.post('http://localhost:8000/logo', {
        title,
        desc,
        palette,
        style,
    });
    return response.data;
}