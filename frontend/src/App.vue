<template>
  <div class="app">
    <div v-if="state.account.id">
      <button @click="logout">로그아웃</button>
      <!-- `안녕하세요, ${state.account.name}님!` 쿠키팝업 만들어보기-->
      <b-container class="text-bg-dark">
        <Header></Header>
        <router-view class="routerView"/>
        <Footer></Footer>
      </b-container>
    </div>
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" id="loginId" v-model="state.form.loginId">
      </label>
      <label for="loginPw">
        <span>패스워드</span>
        <input type="password" id="loginPw" v-model="state.form.loginPw">
      </label>
      <hr/>
      <button @click="submit">로그인</button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, reactive } from 'vue'
import Header from '@/components/common/HeaderComponent.vue'
import Footer from '@/components/common/FooterComponent.vue'
import { stat } from 'fs'
// import LeftNavigator from './componen1ts/common/leftNavigator.vue'

export default defineComponent({
  components: {
    Header,
    Footer
    // LeftNavigator
  },
  setup () {
    const state = reactive({
      account: {
        id: null,
        name: ''
      },
      form: {
        loginId: '',
        loginPw: ''
      }
    })
    const submit = (): void => {
      const args = { // arguments
        loginId: state.form.loginId,
        loginPw: state.form.loginPw
      }
      axios.post('/api/account', args).then((res) => {
        alert('로그인에 성공했습니다.')
        state.account = res.data
      }).catch(() => alert('아이디 또는 비밀번호가 일치하지 않습니다.'))
    }
    const logout = ():void => {
      axios.delete('/api/account').then((res) => {
        alert('로그아웃 하였습니다.')
        state.account.id = null
        state.account.name = ''
      })
    }
    axios.get('/api/account').then((res) => {
      state.account = res.data
    })
    return { state, submit, logout }
  }
})

</script>

<style lang="scss">
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
