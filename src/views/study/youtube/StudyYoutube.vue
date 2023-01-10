<template>
  <div class="page">
    <SideMenu presentCategory="학습 자료 관리" :sideMenuList="sideMenuList"></SideMenu>
    <div class="pageView text-white text-bg-dark">
      <div class="titleContentsTag">
        <div class="pageTitle">
          <div>
            <h3>{{ pageTitle }}</h3>
            <div class="subTitle">
              <p>스터디 페이지에서 노출하는 유튜브을 관리할 수 있습니다.</p>
              <button type="button" class="btn btn-outline-primary">
                <router-link :to="{name:'studyYoutubeRegist'}">등록</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <StudyYoutubeSearchBar
          @on-keyword-enter="onKeywordEnter"
        ></StudyYoutubeSearchBar>
        <StudyYoutubeContents
          :videoList="videoList"
          @on-select-video="onSelectVideo"
        >
        </StudyYoutubeContents>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import SideMenu from '@/components/common/SideMenu.vue'
import StudyYoutubeSearchBar from '@/views/study/youtube/StudyYoutubeSearchBar.vue'
import StudyYoutubeContents from '@/views/study/youtube/StudyYoutubeContents.vue'
const pageTitle = '유튜브 관리'
const sideMenuList = [
  {
    name: '스터디 페이지 관리',
    pathname: 'study'
  },
  {
    name: '유튜브 관리',
    pathname: 'studyYoutube'
  },
  {
    name: '가이드북 관리',
    pathname: 'studyGuidebook'
  }
]
const videoList = ref<object>([])
function onKeywordEnter (newVideoList: object[]) {
  // console.log('부모에서찍음', videoList)
  videoList.value = newVideoList
  console.log(videoList)
}
const video = ref<string>({})
function onSelectVideo (emitVideo: string) {
  console.log('emitVideo', emitVideo)
  video.value = emitVideo
}
</script>
<style scoped lang="scss">
</style>
