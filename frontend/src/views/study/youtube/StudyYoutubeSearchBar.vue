<template>
   <div class="searchBar">
    <label for="keyword">
      <span>검색어</span>
      <input
      v-model.trim="keyword"
      id="keyword"
      type="text"
      @keyup.enter="onKeywordEnter"
      >
      <button @click="onKeywordEnter" class="btn btn-light">검색</button>
    </label>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { defineEmits, ref } from 'vue'

const YOUTUBE_API_KEY = 'AIzaSyABkN2lnJg2dnHMYH0g4-RHaigpKliUzOo'
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'
const emit = defineEmits<{(e: 'on-keyword-enter', id: any): void, (e: 'get-keyword', id: any): void
}>()
const keyword = ref<string | null>()
async function onKeywordEnter (event :any) {
  console.log(event)
  // const newKeyword = event.target.value
  // if (keyword.value !== newKeyword) {
  const config = {
    params: {
      part: 'snippet',
      type: 'video',
      q: keyword.value,
      key: YOUTUBE_API_KEY
    }
  }
  console.log('keyword', keyword.value)
  // console.log('newKeyword', newKeyword)
  axios.get(YOUTUBE_API_URL, config)
  if (keyword.value && keyword.value.length) {
    const response = await axios.get(YOUTUBE_API_URL, config)
    const videoList = response.data.items.length ? response.data.items : []

    emit('on-keyword-enter', videoList)
    emit('get-keyword', keyword.value)
  } else {
    alert('키워드를 입력해주세요.')
  }
  // } else {
  //   keyword.value = null
  //   alert('키워드안바뀜')
  // }
}
</script>
<style scoped lang="scss">
.searchBar {
  margin-bottom: 100px;
  >label {
    display: flex;
    align-items: center;
    width: 100%;
    >span {
      display: block;
      margin-right: 10px;
    }
    >input {
      background: rgba(238, 238, 238, 0.1);
      padding:10px;
      margin:5px 0;
      width:85%;
      height:40px;
      border-radius: 20px;
      border:none;
      margin-right: 10px;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
