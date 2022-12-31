<template>
  <div class="page">
    <SideMenu presentCategory="학습 자료 관리" :sideMenuList="sideMenuList"></SideMenu>
    <div  class="pageView text-white text-bg-dark">
      <div class="pageTitle">
        <div>
          <h3>{{`유튜브 ${action}`}}</h3>
          <div class="subTitle">
            <p>스터디 페이지에서 노출하는 배너와 유튜브, 가이드북을 관리할 수 있습니다.</p>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputTitle" class="col-sm-2 col-form-label">title</label>
        <div class="col-sm-10 mb-1">
          <input type="text" class="form-control" id="inputTitle" v-model="form.title">
        </div>
        <label for="inputCategory" class="col-sm-2 col-form-label">category</label>
        <div class="col-sm-10 mb-1">
          <input type="text" class="form-control" id="inputCategory" v-model="form.category">
        </div>
      </div>
      <div class="actionButton">
        <button type="button" class="btn btn-outline-primary" @click="()=>{$router.go(-1);}" >취소</button>
        <button type="button" class="btn btn-outline-primary" @click="handleSubmit('insert')">등록</button>
        <button type="button" class="btn btn-outline-primary" @click="handleSubmit('delete')">삭제</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideMenu from '@/components/common/SideMenu.vue'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, onUpdated, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

// console.log('route', JSON.stringify(route))
console.log('route', route)
const item = computed(() => ref(route.params.item))
const action = computed(() => ref(route.params.action))

const sideMenuList = [
  {
    name: '스터디 페이지 관리',
    pathname: 'study'
  },
  {
    name: '유튜브 관리',
    pathname: 'studyYoutube'
  },
  {
    name: '가이드북 관리',
    pathname: 'studyGuidebook'
  }
]
const form = ref({
  title: '',
  category: ''
})

const handleSubmit = function (type:string) {
  if (!form.value.title || !form.value.category) {
    alert('모두 입력해주세요.')
  } else {
    if (type === 'insert') {
      store.commit('setStudyList', form.value)
      console.log('store', store.getters)
    } else if (type === 'modify') {
      // store.commit('modifyStudyList', props.value.index);
    } else if (type === 'delete') {
      // store.commit('deleteStudyList', props.value.index);
    } else { console.log('studyManageHandler') }

    if (window.confirm(`${action.value}되었습니다.`)) {
      router.go(-1)
    }
  }
}
</script>
<style lang="scss">
</style>
