<template>
   <div @click="onSelectVideo" class="videoListItem">
      <img :src="thumbUrl" alt="">
      <h3>{{ videoTitle }}</h3>
      <VideoPopup :video="props.video"></VideoPopup>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import _ from 'lodash'
import VideoPopup from '@/components/common/VideoPopup.vue'

// const youtube = VueYoutube()
const props = defineProps({
  video: {
    type: Object,
    required: true
  }
})
console.log(props.video.snippet)
const videoTitle = computed(() => {
  return props.video.snippet.title
})
const thumbUrl = computed(() => {
  return props.video.snippet.thumbnails.medium.url
})
</script>
<style scoped lang="scss">
.videoListItem {
  width:33.3%;
  &:hover {
    cursor: pointer;
  }
}
</style>
