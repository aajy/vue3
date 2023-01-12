<template>
  <div class="page">
    <SideMenu presentCategory="학습 자료 관리" :sideMenuList="sideMenuList"></SideMenu>
    <div  class="pageView text-bg-dark">
      <div class="titleContentsTag">
        <div class="pageTitle">
          <div>
            <h3>{{ pageTitle }}</h3>
            <div class="subTitle">
              <p>스터디 페이지에서 노출하는 배너와 유튜브, 가이드북을 관리할 수 있습니다.</p>
              <button type="button" class="btn btn-outline-primary">
                <router-link :to="{name:'studyRegist', query:{action :'등록'} }">등록</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="searchTag">
        <form class="needs-validation searchForm">
          <!-- <div class="input-group mb-2">
            <span class="input-group-text" id="basic-addon3">관리자 이름</span>
            <input type="text" class="form-control" placeholder="홍길동" aria-label="admin-name" aria-describedby="basic-addon1">
          </div> -->
          <div class="row mb-3">
            <div class="col-sm-6">
              <div class="row">
                <label
                for="title"
                class="col-sm-4 col-form-label col-form-label-sm">
                제목</label>
                <div class="col">
                  <input
                  v-model="searchForm.title"
                  type="text"
                  class="form-control"
                  id="title"
                  required
                  >
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="row">
                <label for="title" class="col-sm-4 col-form-label col-form-label-sm">카테고리</label>
                <div class="col">
                  <select
                  class="form-select"
                  id="category"
                  required
                  v-model="searchForm.category"
                  >
                    <option v-for="(item, index) in categoryList" :key="index" class="nav-item" :value="item.category">
                      {{ item.category }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-6">
              <div class="row">
                <label for="" class="col-sm-4 col-form-label col-form-label-sm">라디오</label>
                <div class="col form-check" v-for ="(item, index) in radioList" :key="index">
                  <input
                  type="radio"
                  class="form-check-input"
                  :id="item.state"
                  :value="item.value"
                  v-model="searchForm.radioValue"
                  >
                  <label :for="item.state" class="form-check-label">{{ item.state }}</label>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="row">
                <label for="checkbox" class="col-sm-4 col-form-label col-form-label-sm">체크박스</label>
                <div class="col form-check">
                  <input
                  type="checkbox"
                  class="form-check-input"
                  id="all"
                  v-model="isAllChecked"
                  @click="onAllChecked"
                  >
                  <label for="all" class="form-check-label">전체</label>
                </div>
                <div class="col form-check" v-for ="(item, index) in checkboxList" :key="index">
                  <input
                  type="checkbox"
                  class="form-check-input"
                  :id="item.state"
                  :value="item.value"
                  v-model="searchForm.checkedList"
                  >
                  <label :for="item.state" class="form-check-label">{{ item.state }}</label>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="input-group mb-3">
            <span class="input-group-text">관리자 메모</span>
            <textarea class="form-control" aria-label="With textarea"></textarea>
          </div> -->
          <!-- TODO :: 검색기능 -->
        </form>
        <div class="searchButton">
          <button type="button" class="btn btn-outline-primary" @click="handleSubmit">검색</button>
          <button type="button" class="btn btn-outline-primary" @click="resetForm">초기화</button>
        </div>
      </div>
      <!-- <v-data-table
        :headers="headers"
        :items="data"
        loading-text="검색 중 기다려주세요."
        no-data-text="등록된 내용이 없습니다."
      >
        <template v-solt:item.index="{index}">
          {{ index}}
        </template>
      </v-data-table>-->
      <!-- TODO:: 검색어의 아래 searchForm이 검색눌렀을 때만 업데이트되도록 수정하기. -->
      <div class="tableTag" width="100%">
        <div v-if="isHandleSubmit" :style="style1">{{ `검색어 - 제목: ${searchForm.title} 카테고리: ${searchForm.category} 라디오: ${searchForm.radioValue} 체크박스: ${searchForm.checkedList}`}}</div>
        <div class="tableForm">
          <table class="table thead-dark">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">스터디 이름</th>
                <th scope="col">카테고리</th>
                <th scope="col">수정</th>
              </tr>
            </thead>
            <tbody v-if="isHandleSubmit">
              <tr v-for="(item, index) in jsonList" :key="index">
                <td> {{ index + 1 }}</td>
                <td> {{ item.title }}</td>
                <td> {{ item.category }}</td>
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
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideMenu from '@/components/common/SideMenu.vue'
import { computed, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const pageTitle = '스터디 관리'
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
interface listType {// 인터페이스 만들기
  title : string
  category: string
  radioValue: string
  checkedList: string[]
}
const categoryList = [
  {
    category: '전체'
  },
  {
    category: '카테고리1'
  },
  {
    category: '카테고리2'
  },
  {
    category: '카테고리3'
  }
]
const radioList = [
  {
    state: 'one',
    value: 'one'
  },
  {
    state: 'two',
    value: 'two'
  },
  {
    state: 'three',
    value: 'three'
  }
]
const checkboxList = [
  {
    state: 'one',
    value: 'one'
  },
  {
    state: 'two',
    value: 'two'
  },
  {
    state: 'three',
    value: 'three'
  }
]
const style1 = { fontSize: '8px', color: '#666', marginTop: '10px' }

// 호이스팅이 없다?
const getInitialFormData = ():listType => ({
  title: '',
  category: '전체',
  radioValue: 'one',
  checkedList: ['one', 'two', 'three']
})

const searchForm = ref(getInitialFormData())
const isAllChecked = computed(() => {
  return checkboxList.length === searchForm.value.checkedList.length
})
const onAllChecked = function () {
  if (checkboxList.length === searchForm.value.checkedList.length) {
    searchForm.value.checkedList = []
  } else {
    searchForm.value.checkedList = Object.assign(searchForm.value.checkedList, getInitialFormData().checkedList)
  }
}
const isHandleSubmit = ref(false)
const handleSubmit = () => {
  if (!searchForm.value.title) {
    alert('제목을 입력해주세요.')
    return
  }
  isHandleSubmit.value = true
}

// ref 유무 차이
// console.log('store jsonList', jsonList.value)

const list1 = // TODO :: proxy 값 사용하는 방법? proxy는 만들어진 순간 가공이 불가?
  // jsonList.value = {
  //   set (target: any, property: any, value: any) {
  //     target[property] = value
  //     return value.filter((item:any) => item.title === searchForm.value.title)
  //   }
  // }
  // computed안에서 jsonList.filter로 바로
  computed<object>(() => {
    const jsonList = store.getters.studyListJson
    console.log('computed json', jsonList)
    return jsonList.filter((item:any) => item.title === searchForm.value.title)
  })
const jsonList = store.getters.studyListJson
console.log('conputed2', jsonList)
console.log('searchForm value', searchForm.value.title)
const list = computed<object>({
  get: () => jsonList,
  set: (jsonList) => jsonList.filter((item: any) => item.title === searchForm.value.title)
})
console.log('list', list)

const resetForm = () => {
  Object.assign(searchForm.value, getInitialFormData())
}
</script>
<style scoped lang="scss">
</style>
