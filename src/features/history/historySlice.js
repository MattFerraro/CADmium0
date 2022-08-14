import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        value: [
            {
                "type": "newPlane",
                "origin": [0, 0, 0],
                "normal": [0, 0, 1],
                "name": "top"
            },
            {
                "type": "newPlane",
                "origin": [0, 0, 0],
                "normal": [1, 0, 0],
                "name": "front"
            },
            {
                "type": "newPlane",
                "origin": [0, 0, 0],
                "normal": [0, 1, 0],
                "name": "right"
            },
        ],
    },
    reducers: {
        push: (state, action) => {
            // validate that the new action is valid?
            state.value.push(action)
        },
        pop: (state) => {
            state.value.pop()
        },
    },
})

export const { push, pop } = historySlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectHistory = (state) => state.history.value

export default historySlice.reducer
