<template>
   <div class="videoListItem">
      <img :src="thumbUrl" alt="">
      <h3 v-html="videoTitle "></h3>
      <b-button @click="modalShow = true">open</b-button>
      <VideoPopup :video="props.video" v-model="modalShow" @modal-hide="modalhide"></VideoPopup>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import VideoPopup from '@/components/common/VideoPopup.vue'
// const youtube = VueYoutube()
const props = defineProps({
  video: {
    type: Object,
    required: true
  }
})
const videoTitle = computed(() => {
  return props.video.snippet.title
})
const thumbUrl = computed(() => {
  return props.video.snippet.thumbnails.medium.url
})
const modalShow = ref(false)

function modalhide (isModalShow: boolean) {
  modalShow.value = isModalShow
}
</script>
<style scoped lang="scss">
.videoListItem {
  width:33.3%;
  &:hover {
    cursor: pointer;
  }
}
</style>
