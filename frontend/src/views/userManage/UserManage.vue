<template>
  <div class="page">
     <SideMenu presentCategory="회원 관리" :sideMenuList="sideMenuList"></SideMenu>
    <div class="pageView text-white text-bg-dark">
      <div class="pageTitle">
        <div>
          <h3>회원 관리</h3>
          <div class="subTitle">
            <p>회원 목록를 관리할 수 있습니다.</p>
          </div>
        </div>
      </div>
      <div class="tableTag" width="100%">
        <div class="tableForm">
          <table class="table thead-dark">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">아이디</th>
                <th scope="col">이름</th>
                <th scope="col">나이</th>
                <th scope="col">수정</th>
              </tr>
            </thead>
            <tbody v-if="isHandleSubmit">
              <tr v-for="item in jsonList" :key="item.id">
                <td> {{ item.id }}</td>
                <td> {{ item.userId }}</td>
                <td> {{ item.name? item.name : '-' }}</td>
                <td> {{ item.age? item.age : '-' }}</td>
                <td>
                  <router-link :to="{ name: 'studyModify', query: { item: JSON.stringify(item), index: index, action: '수정'}}">
                    <button type="button" class="btn btn-outline-primary">수정</button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import SideMenu from '@/components/common/SideMenu.vue'
const sideMenuList = [
  {
    name: '회원 관리',
    pathname: 'userManage'
  }
]
const isHandleSubmit = true
const jsonList = ref([])
axios.get('/api/users').then((res) => {
  console.log(res.data)
  jsonList.value = res.data
})
</script>
<style lang="scss">
</style>
