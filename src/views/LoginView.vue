<template>
  <div class="px-3 py-2 text-bg-dark">
    <b-card
      title="Login with Google"
      img-alt="Cyworld Administrator Login"
      img-top
      class="px-3 py-2 text-bg-dark"
      style="align-items: center"
    >
      <img src="@/assets/logo_login.png" />
      <b-card-text>
        Login with Google
      </b-card-text>
      <b-button variant="outline-primary" @click="signIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
        </svg>
        Login with Google
      </b-button>
    </b-card>
  </div>
</template>
<script lang="ts">

import { defineComponent, onMounted, ref } from '@vue/runtime-core'
import { installGoogleAuth } from '@/plugins/googleAuth'

export default defineComponent({
  name: 'SignIn',
  setup () {
    let gAuth: any = null
    const user = ref({})
    const options = {
      clientId: '6667766591-557va892oq8617ne34eq5mqlsfm0t3sa.apps.googleusercontent.com',
      scope: 'profile email',
      prompt: 'select_account'
    }
    function signIn (): void {
      if (!gAuth) return
      gAuth.signIn().then((googleUser: any) => {
        user.value = googleUser
      }).catch((e: any) => {
        console.log('error', e)
      })
    }
    function signOut (): void {
      if (!gAuth) return
      gAuth.signOut()
    }
    onMounted(async () => {
      gAuth = await installGoogleAuth(options)
    })
    return { user, signIn, signOut }
  }
})

</script>
<style lang="scss" scoped>
  .layout {

    border: 0px;
    margin-top: 50px;
  }
</style>
