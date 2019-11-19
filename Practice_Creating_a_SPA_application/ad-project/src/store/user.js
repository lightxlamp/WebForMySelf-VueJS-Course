import * as firebase from 'firebase'

class User {
    constructor (id) {
        this.id = id
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser (state, payload){
            state.user = payload
        }
    },
    actions: {
        async registration({commit}, {email, password}){
            commit('clearError')
            commit('setLoading', true)

            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('clearError', error.message)
                throw error
            }
        },
        async login({commit}, {email, password}){
            commit('clearError')
            commit('setLoading', true)

            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('clearError', error.message)
                throw error
            }
        },
    },
    getters: {
        user (state){
            return state.user
        }
    }
}