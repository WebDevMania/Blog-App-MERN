import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        token: null
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload.user
            state.token = action.payload.token
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        logout: (state) => {
            state.isFetching = false
            state.error = false
            state.currentUser = null
            state.token = null
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logout} = authSlice.actions
export default authSlice.reducer