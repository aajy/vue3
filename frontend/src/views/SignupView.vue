<template>
  <div class="header">
  <!--Content before waves-->
    <div class="inner-header">
  <!--Just the logo.. Don't mind this-->
      <img src="@/assets/logo.png" alt="" width="100"/>
      <h1 class="signH1">SIGN UP</h1>
      <div class="form">
        <label for="loginId">
          <span>ID</span>
          <input type="text" id="loginId" v-model="state.form.signId">
        </label>
        <label for="loginPw">
          <span>PW</span>
          <input type="password" id="loginPw" v-model="state.form.signPw">
        </label>
        <label for="signName">
          <span>NAME</span>
          <input type="text" id="signName" v-model="state.form.signName">
        </label>
      </div>
    <button @click="signup(state.form)" :disabled="isSignupDisabled" :class="isSignupDisabled ? 'btn btn-disabled' : 'btn btn-primary'">sign up</button>
    <router-link to="/" class="signinRouter" @click="emit('signin')">Already a member? <span class="signin">Sign in</span></router-link>
    </div>

  <!--Waves Container-->
    <div>
      <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="3" fill="#5776f388" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#212529" />
        </g>
      </svg>
    </div>
<!--Waves end-->
  </div>
<!--Header ends-->
<!--Content starts-->
<div class="content flex">
  <p>&copy;2023 FXGear Co. All rights reserved.</p>
</div>
<!--Content ends-->
</template>
<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const emit = defineEmits(['modal-hide', 'signin'])

const router = useRouter()
const state = ref({
  form: {
    signId: '',
    signPw: '',
    signName: ''
  }
})

const isSignupDisabled = ref(true)

watch(state.value.form, ():void => {
  if (state.value.form.signId.length && state.value.form.signPw.length && state.value.form.signName.length) {
    console.log('회원가입 가능')
    isSignupDisabled.value = false
  } else {
    console.log('회원가입 불가')
    isSignupDisabled.value = true
  }
})
const signup = (form: object) => {
  axios.post('/api/users', { userInfo: form })
    .then((res) => {
      console.log('회원가입 성공', form)
      alert(`${form.signName}님 회원가입 되었습니다.`)
      router.push({ name: 'HomeView' })
    })
    .catch((err) => {
      if (err) { alert('회원가입에 실패하였습니다.') }
    })
}

</script>
<style lang="scss">
@import '../assets/dist/css/sign.scss';
</style>
