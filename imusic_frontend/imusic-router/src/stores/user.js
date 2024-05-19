import {defineStore} from 'pinia'

// user store
export const useUserStore = defineStore('user', () => {
    let username = '';
    let token = '';

    function setUsername(name) {
        username = name;
        console.log("set username!"+ username)
    }

    function setToken(t) {
        token = t;
        console.log("set token!" + token)
    }

    function flush() {
        username = '';
        token = ''
    }

    return {
        username,
        token,
        setUsername,
        setToken,
        flush
    }
})
