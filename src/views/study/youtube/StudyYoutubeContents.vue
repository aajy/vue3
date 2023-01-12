<template>
   <div v-if="props.videoList.length" class="videoList">
      <StudyYoutubeListItem
        v-for="(video, index) in props.videoList"
        :video="video"
        :key="index"
      />
  </div>
  <div v-else class="noVideoList">
    {{ nodataText }}
  </div>
  <!-- <youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
# 동영상을 랜더해주는 부분
<button @click="playVideo">play</button>
# 이벤트의 객체 -->
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect } from 'vue'
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
  },
  keyword: {
    type: String,
    required: true
  }
})
const nodataText = ref('목록이 없습니다.')
const newKeyword = ref(props.keyword)
watchEffect(() => {
  console.log('키워드 변경', newKeyword.value)
  if (newKeyword.value && !props.videoList.length) {
    nodataText.value = '검색된 결과가 없습니다.'
  } else {
    nodataText.value = '목록이 없습니다.'
  }
})

</script>
<style scoped lang="scss">
.videoList {
  display: flex;
  flex-wrap: wrap;
}
.noVideoList {
  padding:30px;
  font-size: 14px;
  color:#6e6e6e;
}
</style>
