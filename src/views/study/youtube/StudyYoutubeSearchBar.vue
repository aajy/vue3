<template>
   <div>
    <input type="text" @keyup.enter="onKeywordEnter">
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { defineEmits } from 'vue'

const YOUTUBE_API_KEY = 'AIzaSyABkN2lnJg2dnHMYH0g4-RHaigpKliUzOo'
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'
const emit = defineEmits<{(e: 'on-keyword-enter', id: any): void
}>()

async function onKeywordEnter (event :any) {
  const keyword = event.target.value
  const config = {
    params: {
      part: 'snippet',
      type: 'video',
      q: keyword,
      key: YOUTUBE_API_KEY
    }
  }
  console.log(keyword)

  axios.get(YOUTUBE_API_URL, config)

  const response = await axios.get(YOUTUBE_API_URL, config)
  console.log('response', response)
  const videoList = response.data.items
  // 부모한테 올리기 케밥케이스 비디오리스트를 app.vue methods 에넘긴다.
  emit('on-keyword-enter', videoList)
}
</script>
