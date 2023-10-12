<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <i class="fa-solid fa-plane-departure"></i>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item" v-if="user">
            <router-link class="nav-link" to="/saved">Saved Flights</router-link>
          </li>
          <li class="nav-item" v-if="user">
            <button class="nav-link" @click="doLogout">Logout</button>
          </li>
          <li class="nav-item" v-else>
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
        <span class="navbar-text" v-if="user">
          Curent User: <b>{{ user.email }}</b>
        </span>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
  <footer class="text-center">
    &copy; {{ year }} {{ footer }}
  </footer>
</template>
  
  
<script lang="ts" setup>
import { ref } from 'vue';
import { BackendService } from '@/services/backend.service'

const user = ref<any>()
BackendService.getSelf()
  .then(rsp => user.value = rsp.data)
  .catch(e => console.log(e))

const year = new Date().getFullYear();
const footer = process.env.VUE_APP_CUSTOM_FOOTER

function doLogout() {
  localStorage.clear()
  window.location.href = '/'
}
</script>