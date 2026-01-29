import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    image: null,
}

const logoSlice = createSlice({
    name: "logo",
    initialState,
    reducers: {
        setImage: (state, action) => {
            state.image = action.payload;
        },
    }
})

export const { setImage } = logoSlice.actions;
export default logoSlice.reducer;
