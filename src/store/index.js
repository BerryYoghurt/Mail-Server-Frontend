import {createStore} from 'vuex';

export default createStore({
    state: {
        user: localStorage.getItem('user')||null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem('user', user);
        },
        REMOVE_USER(state) {
            state.user = null;
        }
    },
    actions: {
        signOut(context) {
            document.cookie = '';
            localStorage.clear();
            context.commit('REMOVE_USER')
        },

    },
    getters: {
        loggedInUser(state) {
            return state.user;
        }
    }
})