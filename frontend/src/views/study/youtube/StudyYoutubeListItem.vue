<template>
   <div class="videoListItem">
      <img :src="thumbUrl" alt="">
      <div class="videoInfo">
        <h3 v-html="videoTitle "></h3>
        <b-button @click="modalShow = true" class="modalButton">open</b-button>
      </div>
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
  position: relative;
  width:31%;
  border-radius: 1px;
  display: flex;
  justify-content: center;
  padding:30px 10px;
  box-sizing: border-box;
  margin-right: 3.5%;
  margin-bottom: 20px;
  &:nth-child(3n){
    margin-right:0;
  }
  >img {
    display: block;
    width:90%;
    transition: 0.5s;
  }
  .videoInfo {
    position: absolute;
    display: flex;
    width: 100%;
    bottom:0;
    height: 80px;
    background: rgba(255, 255, 255, 0.1);
    left:0;
    justify-content: space-between;
    align-items: flex-end;
    padding:5px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0 20px 0 0;
    box-sizing: border-box;
    h3 {
      font-size: 12px;
      color:#eee;
    }
    .modalButton {
      height:30px;
      font-size: 10px;
    }
  }
  transition: 0.5s;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  }
}
</style>
