<template>
  <b-button @click="modalShow = true">open</b-button>
  <b-modal v-model="modalShow" hide-footer>
    <div class="d-block">
      <iframe id="ytplayer" type="text/html"
      :src="videoUrl"
      frameborder="0"></iframe>
      <h3>{{ videoTitle }}</h3>
      <p>{{ videoDesc }}</p>
      <b-button class="mt-3" block @click="modalShow = false">Close Me</b-button>
    </div>
  </b-modal>
</template>
<script setup lang='ts'>
import { computed, ref, defineProps } from 'vue'
const props = defineProps({
  video: {
    type: Object,
    required: true
  }
})

const videoUrl = computed(() => {
  const videoId = props.video.id.videoId
  return `https://www.youtube.com/embed/${videoId}`
})

const modalShow = ref(false)

function open () {
  modalShow.value = true
}
const videoTitle = computed(() => {
  return props.video.snippet.title
})
const videoDesc = computed(() => {
  return props.video.snippet.description
})
</script>
<style scoped lang='scss'>
</style>
