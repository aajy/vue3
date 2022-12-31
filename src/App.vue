<template>
  <b-container class="text-bg-dark">
    <Header></Header>
    <router-view class="routerView"/>
    <Footer></Footer>
  </b-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/common/HeaderComponent.vue'
import Footer from '@/components/common/FooterComponent.vue'
// import LeftNavigator from './componen1ts/common/leftNavigator.vue'

export default defineComponent({
  components: {
    Header,
    Footer
    // LeftNavigator
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
