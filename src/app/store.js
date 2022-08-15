import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import historyReducer from "../features/history/historySlice"

export default configureStore({
  reducer: {
    counter: counterReducer,
    history: historyReducer,
  },
})
