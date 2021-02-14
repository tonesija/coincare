<template>
  <div id="app">
      <b-navbar type="is-primary">
          <template #brand>
              <b-navbar-item tag="router-link" :to="{ path: '/' }">
                  <img
                      src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                      alt="Lightweight UI components for Vue.js based on Bulma"
                  >
              </b-navbar-item>
          </template>
          <template #start>
              <b-navbar-item tag="router-link" :to="{path: '/all-assets'}">
                  All assets
              </b-navbar-item>
              <b-navbar-item tag="router-link" :to="{path: '/correlation'}">
                  Correlation calculator
              </b-navbar-item>
              <b-navbar-item tag="router-link" :to="{path: '/discussion'}">
                  Discussion
              </b-navbar-item>
              <b-navbar-item tag="router-link" :to="{path: '/documentation'}">
                  Documentation
              </b-navbar-item>
              <b-navbar-dropdown label="Info">
                  <b-navbar-item tag="router-link" :to="{path: '/about'}">
                      About
                  </b-navbar-item>
                  <b-navbar-item htag="router-link" :to="{path: '/contact'}">
                      Contact
                  </b-navbar-item>
              </b-navbar-dropdown>
          </template>

          <template #end>
              <b-navbar-item tag="div">
                  <div class="buttons">
                      <a class="button is-primary">
                          <strong>Sign up</strong>
                      </a>
                      <a class="button is-light">
                          Log in
                      </a>
                  </div>
              </b-navbar-item>
          </template>
      </b-navbar>

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.view-body{
  padding-left: 7%;
  padding-right: 7%;
}
</style>
