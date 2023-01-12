<template>
   <div>
    <input
    v-model.trim="keyword"
    type="text"
    @keyup.enter="onKeywordEnter"
    >
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { defineEmits, ref } from 'vue'

const YOUTUBE_API_KEY = 'AIzaSyABkN2lnJg2dnHMYH0g4-RHaigpKliUzOo'
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'
const emit = defineEmits<{(e: 'on-keyword-enter', id: any): void, (e: 'get-keyword', id: any): void
}>()

async function onKeywordEnter (event :any) {
  const keyword = ref<string | null>()
  const newKeyword = event.target.value
  if (keyword.value !== newKeyword) {
    const config = {
      params: {
        part: 'snippet',
        type: 'video',
        q: newKeyword,
        key: YOUTUBE_API_KEY
      }
    }
    console.log('keyword', keyword.value)
    console.log('newKeyword', newKeyword)
    axios.get(YOUTUBE_API_URL, config)
    if (newKeyword && newKeyword.length) {
      const response = await axios.get(YOUTUBE_API_URL, config)
      const videoList = response.data.items.length ? response.data.items : []
      keyword.value = newKeyword
      emit('on-keyword-enter', videoList)
      emit('get-keyword', newKeyword)
    } else {
      alert('키워드를 입력해주세요.')
    }
  } else {
    keyword.value = null
    alert('키워드안바뀜')
  }
}
</script>
