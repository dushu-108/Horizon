import createSlice from "@reduxjs/toolkit";

const initialState = {
    title: "",
    desc: "",
    palette: "Modern",
    style: "",
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDesc: (state, action) => {
            state.desc = action.payload;
        },
        setPalette: (state, action) => {
            state.palette = action.payload;
        },
        setStyle: (state, action) => {
            state.style = action.payload;
        },
    },
});

export const { setTitle, setDesc, setPalette, setStyle } = dataSlice.actions;
export default dataSlice.reducer;
