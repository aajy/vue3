<template>
  <b-modal
  hide-footer
  title="YOUTUBE"
  header-bg-variant="dark"
  header-text-variant="light"
  header-border-variant="primary"
  body-bg-variant="dark"
  body-text-variant="light"
  >
    <div class="d-block">
      <iframe id="ytplayer" type="text/html"
      :src="videoUrl"
      frameborder="0"></iframe>
      <h3 v-html="videoTitle "></h3>
      <p v-html="videoDesc"></p>
      <b-button class="mt-3 closeButton" variant="primary" block @click="emit('modal-hide', false)">닫기</b-button>
    </div>
  </b-modal>
</template>
<script setup lang='ts'>
import { computed, ref, defineProps, defineEmits } from 'vue'
const props = defineProps({
  video: {
    type: Object,
    required: true
  }
})
const emit = defineEmits<{(e : 'modal-hide', id: boolean): void}>()
const videoUrl = computed(() => {
  const videoId = props.video.id.videoId
  return `https://www.youtube.com/embed/${videoId}`
})
const videoTitle = computed(() => {
  return props.video.snippet.title
})
const videoDesc = computed(() => {
  return props.video.snippet.description
})
</script>
<style scoped lang='scss'>
modal-content {
  background-color: #111 !important;
}
.d-block {
  position:relative;
  display: block;
  padding-bottom: 50px;
  >iframe {
    width:100%;
    height:300px;
  }
  >h3 {
    font-size: 22px;
  }
  >p {
    font-size: 14px;
    font-weight: lighter;
    color:#6e6e6e;
  }
  .closeButton {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
