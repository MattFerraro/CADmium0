import { createSlice } from "@reduxjs/toolkit"

export const historySlice = createSlice({
    name: "history",
    initialState: {
        value: [
            {
                type: "newPlane",
                origin: [0, 0, 0],
                normal: [0, 0, 1],
                xAxis: [1, 0, 0], // so y is -y
                name: "top",
            },
            {
                type: "newPlane",
                origin: [0, 0, 0],
                normal: [1, 0, 0],
                xAxis: [0, 1, 0], // so y is +z
                name: "front",
            },
            {
                type: "newPlane",
                origin: [0, 0, 0],
                normal: [0, 1, 0], // so y is +z
                xAxis: [-1, 0, 0],
                name: "right",
            },
            {
                type: "newSketch",
                name: "sketchA",
                plane: "front",
                data: {
                    points: [
                        {
                            id: "a",
                            coords: [0, 0],
                        },
                        {
                            id: "b",
                            coords: [-.2, 0.3],
                        },
                        {
                            id: "c",
                            coords: [0.6, 0.4],
                        },
                        {
                            id: "d",
                            coords: [0.45, .15],
                        },
                        {
                            id: "e",
                            coords: [0.7, -.2],
                        },
                    ],
                    segments: [
                        {
                            id: "a",
                            start: "a",
                            end: "b",
                        },
                        {
                            id: "b",
                            start: "b",
                            end: "c",
                        },
                        {
                            id: "c",
                            start: "c",
                            end: "d",
                        },
                        {
                            id: "d",
                            start: "d",
                            end: "e",
                        },
                        {
                            id: "e",
                            start: "e",
                            end: "a",
                        },
                    ],
                    polygons: [
                        {
                            id: "a",
                            points: ["a", "b", "c", "d", "e"],
                        },
                    ],
                },
            },
            {
                type: "extrude",
                name: "extrudeA",
                polygons: [
                    {
                        sketch: "sketchA",
                        polygon: "a",
                    },
                ],
                height: -0.3, // height is assumed to be perp to the sketch plane
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
