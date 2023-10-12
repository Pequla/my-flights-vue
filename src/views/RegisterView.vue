<template>
    <div class="w-50 mx-auto">
        <h3>Register page</h3>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
        </div>
        <div class="mb-3">
            <label for="exampleInputPasswordRepeat" class="form-label">Repeat Password</label>
            <input type="password" class="form-control" id="exampleInputPasswordRepeat" v-model="passwordRepeat">
        </div>
        <div class="btn-group">
            <button type="submit" class="btn btn-primary" @click="doRegister">Submit</button>
            <router-link to="/register" class="btn btn-outline-secondary">I don't have an account</router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { BackendService } from '@/services/backend.service';
import { ref } from 'vue';

const email = ref<string>("")
const password = ref<string>("")
const passwordRepeat = ref<string>("")

function doRegister() {
    if (!email || !email.value || email.value.trim().length === 0) {
        alert("Email field is required")
        return
    }

    if (!password || !password.value || password.value.trim().length === 0) {
        alert("Password field is required")
        return
    }

    if (!passwordRepeat || !passwordRepeat.value || passwordRepeat.value.trim().length === 0) {
        alert("Please repeat the password")
        return
    }

    if (password.value !== passwordRepeat.value) {
        alert("Passwords don't match, please try again")
        return
    }

    BackendService.register(email.value, password.value)
        .then(rsp => {
            if (rsp.status === 200) {
                window.location.href = '/login'
            } else {
                alert("Wrong username or password")
            }
        })
        .catch(e => {
            console.log(e)
            alert("Something went wrong... Sorry!")
        })
}
</script>