<template>
  <div class="app">
    <div v-if="state.account.id">
      <!-- `안녕하세요, ${state.account.name}님!` 쿠키팝업 만들어보기-->
      <b-container class="text-bg-dark">
        <Header></Header>
        <router-view class="routerView"/>
        <Footer></Footer>
      </b-container>
    </div>
    <div v-else>
      <div v-if="$route.path === '/signup'">
        <router-view @signin="signin"/>
      </div>
      <div v-else>
        <div class="header">
          <div class="inner-header">
            <img src="@/assets/logo.png" alt="" width="100"/>
            <h1 class="signH1">SIGN IN</h1>
            <div class="form">
              <label for="loginId">
                <span>ID</span>
                <input type="text" id="loginId" v-model="state.form.loginId">
              </label>
              <label for="loginPw">
                <span>PW</span>
                <input type="password" id="loginPw" v-model="state.form.loginPw">
              </label>
              <hr/>
            </div>
            <button @click="login" :disabled="state.isLoginupDisabled" :class="state.isLoginupDisabled ? 'btn btn-disabled' : 'btn btn-primary'">sign in</button>
            <router-link to="/signup" class="signupRouter">Now here? <span class="signup">sign up</span></router-link>
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
        </div>
        <div class="content flex">
          <p>&copy;2023 FXGear Co. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, reactive, watch, ref } from 'vue'
import Header from '@/components/common/HeaderComponent.vue'
import Footer from '@/components/common/FooterComponent.vue'
import router from './router'
// import LeftNavigator from './componen1ts/common/leftNavigator.vue'

export default defineComponent({
  components: {
    Header,
    Footer
    // LeftNavigator
  },
  setup () {
    const InitialState = () => ({
      account: {
        id: null,
        name: ''
      },
      form: {
        loginId: '',
        loginPw: ''
      },
      isLoginupDisabled: true
    })
    const state = reactive(InitialState())
    const reset = () => { Object.assign(state, reactive(InitialState())) }
    const signin = ():void => {
      router.go(-1) // 페이지가 바뀌고 돌아오면 watch가 작동을 안해서 강제 새로고침함
    }
    const login = (): void => {
      const args = { // arguments
        loginId: state.form.loginId,
        loginPw: state.form.loginPw
      }
      axios.post('/api/account', args).then((res) => {
        alert('로그인에 성공했습니다.')
        state.account = res.data
      }).catch(() => alert('아이디 또는 비밀번호가 일치하지 않습니다.'))
    }
    axios.get('/api/account').then((res) => {
      state.account = res.data
    })

    watch(state.form, ():void => {
      console.log('state.form.바뀜')
      if (state.form.loginId.length && state.form.loginPw.length) {
        console.log('로그인 가능')
        state.isLoginupDisabled = false
      } else {
        console.log('로그인 불가')
        state.isLoginupDisabled = true
      }
    })
    return { state, login, reset, signin }
  }
})

</script>

<style lang="scss">
@import 'src/assets/dist/css/sign.scss';
.app {
  position: relative;
  height:100vh;
}
.container {
  max-width: 100% !important;
  max-height: 100% !important;
  padding: 0 !important;
}
.routerView {
  width: 100%;
  height: 100vh;
  max-height: calc(100vh - 84px - 42.3px);
}
</style>
