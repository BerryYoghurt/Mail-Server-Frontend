import {createStore} from 'vuex';

export default createStore({
    state: {
        user: null,
        token: null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            console.log(state.user);
        },
        SET_TOKEN(state, token) {
            state.token = token;
        }
    },
    actions: {
    }
})