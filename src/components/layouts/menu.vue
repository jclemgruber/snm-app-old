<template>
  <quasar-layout>
    <div slot="header" class="toolbar">
      <button class="left-drawer-opener">
        <i>menu</i>
      </button>
      <quasar-toolbar-title :padding="1">
        Quasar Starter
      </quasar-toolbar-title>
      <button class="right-drawer-opener">
        <i>assignment</i>
      </button>
    </div>

    <quasar-drawer swipe-only>
      <div class="toolbar light" v-show="!authenticated">
        <quasar-toolbar-title :padding="1" >
          Menu
        </quasar-toolbar-title>
      </div>

      <div class="card bg-teal text-white" v-show="authenticated">
        <div class="card-title">
          <i>account_circle</i><span> {{ user.name }}</span>
        </div>
        <div class="card-content">
          {{ user.email }}
        </div>
      </div>

      <div class="list no-border platform-delimiter">
        <quasar-drawer-link v-link="{name: 'jokes', exact: true, replace: true}" icon="view_quilt">
          Jokes
        </quasar-drawer-link>
        <quasar-drawer-link v-link="{name: 'profile', exact: true, replace: true}" icon="account_circle">
          Profile
        </quasar-drawer-link>
        <hr>
        <quasar-drawer-link v-go-back="'/'" @click="logout()" icon="exit_to_app">
          Logout
        </quasar-drawer-link>
      </div>
    </quasar-drawer>

    <router-view class="layout-view"></router-view>

    <quasar-drawer right-side swipe-only>
      <div class="toolbar light">
        <quasar-toolbar-title :padding="1">
          Right-side Drawer
        </quasar-toolbar-title>
      </div>

      <p style="padding: 25px;" class="text-grey-7">
        This is yet another Drawer that does not gets displayed alongside content on
        bigger screens.
      </p>
    </quasar-drawer>
  </quasar-layout>
</template>
<style>

</style>
<script>
  import { LocalStorage } from 'quasar'
  import Auth from '../../auth'

  export default{
    data () {
      return {
        user: LocalStorage.get.item('user')
      }
    },

    computed: {
      authenticated () {
        return Auth.user.authenticated
      }
    },

    methods: {
      logout () {
        Auth.logout()
      }
    }
  }
</script>
