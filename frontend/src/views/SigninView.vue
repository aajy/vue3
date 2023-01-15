<template>
  <div class="header">
  <!--Content before waves-->
  <div class="inner-header">
  <!--Just the logo.. Don't mind this-->
  <img src="@/assets/logo.png" alt="" width="100"/>
  <h1>SIGN UP</h1>
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
  <router-link to="/" class="signinRouter">Already a member? <span class="signin">Sign in</span></router-link>
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
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

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
<style scoped lang="scss">
@import url(//fonts.googleapis.com/css?family=Lato:300:400:200);

h1 {
  font-family: 'Lato', sans-serif;
  font-weight:300;
  letter-spacing: 2px;
  font-size:48px;
}
.header {
  position:relative;
  text-align:center;
  background: linear-gradient(60deg, #212529 0%, #5777f3 100%);
  color:white;
}
.logo {
  width:50px;
  fill:white;
  padding-right:15px;
  display:inline-block;
  vertical-align: middle;
}

.inner-header {
  border-radius:10px;
  background: rgba(255,255,255,0.1);
  height:65vh;
  width:50%;
  left: 50%;
  transform: translate(50%, 10%);
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  >img {
    margin-bottom: 10px;
  }
  >h1 {
    margin-bottom: 40px;
  }
  >.form {
    display: flex;
    width: 60%;
    flex-direction: column;
    align-items: flex-end;
    font-family: 'Lato', sans-serif;
    letter-spacing: 1px;
    font-size:14px;
    color: #333333;
    margin-bottom: 10px;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      width:100%;
      color:#fff;
      span {
        display: block;
        width: 10%;
        margin-right: 5%;
        text-align: left;
      }
      input {
        background: rgba(238, 238, 238, 0.1);
        padding:10px;
        margin:5px 0;
        width:85%;
        height:40px;
        border-radius: 20px;
        border:none;
        &:focus {
          outline: none;
          box-shadow: 0 0 10px #7f95ee;
        }
      }
    }
  }
  >button {
    margin-bottom: 10px;
  }
  .signinRouter {
    font-size: 12px;
    font-weight: 200;
    color: #fff;
    .signin{
      color: #5ccbff;
    }
  }
}

.flex { /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position:relative;
  width: 100%;
  height:15vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: #212529;
  p {
    color:#ccc;
  }
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100% {
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}
</style>
