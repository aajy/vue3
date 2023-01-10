<template>
   <div v-if="props.videoList.length" class="videoList">
      <StudyYoutubeListItem
        v-for="(video, index) in props.videoList"
        :video="video"
        :key="index"
      />
      <!-- :key="video.id.videoId" -->
  </div>
  <div v-else>
    영상이 없습니다.
  </div>
  <!-- <youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
# 동영상을 랜더해주는 부분
<button @click="playVideo">play</button>
# 이벤트의 객체 -->
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import StudyYoutubeListItem from '@/views/study/youtube/StudyYoutubeListItem.vue'

const emit = defineEmits<{(e: 'on-select-video', id: any): any}>()
// const youtube = VueYoutube()
const props = defineProps({
  videoList: {
    type: Array,
    default () {
      return []
    },
    required: true
  }
})
</script>
<style scoped lang="scss">
.videoList {
  display: flex;
  flex-wrap: wrap;
}
</style>
