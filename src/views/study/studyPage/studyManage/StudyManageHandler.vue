<template>
   <div class="page">
     <SideMenu presentCategory="학습 자료 관리" :sideMenuList="sideMenuList"></SideMenu>
    <div  class="pageView text-white text-bg-dark">
      <div class="pageTitle">
       <div>
         <h3>{{`스터디 페이지 ${route.query.action}`}}</h3>
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
        <button type="button" class="btn btn-outline-primary" @click="handleSubmit">{{ route.query.action }}</button>
        <button type="button" class="btn btn-outline-primary" @click="handleSubmit('delete')">삭제</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideMenu from '@/components/common/SideMenu.vue'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, onUpdated, ref, toRef, watch, computed } from 'vue'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

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
onMounted(() => {
  const route = useRoute()
  console.log('route', route.query)
})
const item = ref(computed(() => route.query.item !== undefined ? JSON.parse(route.query.item) : {}))
const index = ref(computed(() => route.query.index))
const action = ref(computed(() => route.query.action))

const form = ref({
  title: '',
  category: ''
})
if (route.query.item) {
  form.value.title = item.value.title
  form.value.category = item.value.category
}
const handleSubmit = function (type) {
  let storeType
  if (!form.value.title || !form.value.category) {
    alert('모두 입력해주세요.')
  } else {
    if (type === 'delete') {
      storeType = 'delete'
    } else {
      if (action.value === '등록') {
        storeType = 'insert'
      } else {
        storeType = 'modify'
      }
    }

    if (storeType === 'insert') {
      store.commit('setStudyList', form.value)
    } else if (storeType === 'modify') {
      form.value.index = index.value
      store.commit('modifyStudyList', form.value)
    } else if (storeType === 'delete') {
      store.commit('deleteStudyList', Number(index.value))
    } else { console.log('studyManageHandler') }

    if (storeType === 'delete') {
      if (window.confirm(`${route.query.action}되었습니다.`)) {
        router.go(-1)
      }
    }
    if (window.confirm(`${route.query.action}되었습니다.`)) {
      router.go(-1)
    }
  }
}
</script>
<style lang="scss">
</style>
