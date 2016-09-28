import Vue from 'vue'
import Router from './router'
import { Toast, LocalStorage } from 'quasar'

const API_URL = 'http://snm.app/api'
const LOGIN_URL = API_URL + '/token'
const SIGNUP_URL = API_URL + '/register'
const USER_URL = API_URL + '/user'

export default {

  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds).then((response) => {
      LocalStorage.set('id_token', response.json().token)

      this.user.authenticated = true
      Vue.http.headers.common['Authorization'] = 'Bearer ' + LocalStorage.get.item('id_token')
      this.getAuthUser(context)

      if (redirect) {
        Router.replace(redirect)
      }
    }, (response) => {
      Toast.create.negative(response.json().error)
    })
  },

  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds).then((response) => {
      LocalStorage.set('id_token', response.json().token)

      this.user.authenticated = true
      Vue.http.headers.common['Authorization'] = 'Bearer ' + LocalStorage.get.item('id_token')
      this.getAuthUser(context)

      if (redirect) {
        Router.replace(redirect)
      }
    }, (response) => {
      Toast.create.negative(response.json().error)
    })
  },

  logout () {
    LocalStorage.clear()
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = LocalStorage.get.item('id_token')

    if (jwt) {
      this.user.authenticated = true
      Vue.http.headers.common['Authorization'] = 'Bearer ' + jwt
    }
    else {
      this.user.authenticated = false
    }
  },

  getAuthUser (context) {
    context.$http.get(USER_URL).then((response) => {
      LocalStorage.set('user', response.json())
    }, (response) => {
      Toast.create.negative('Something went wrong!')
    })
  }
}
