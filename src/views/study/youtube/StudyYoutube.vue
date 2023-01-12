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
          @get-keyword="getKeyword"
        ></StudyYoutubeSearchBar>
        <StudyYoutubeContents
          :keyword="keyword"
          :videoList="videoList"
        >
        </StudyYoutubeContents>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
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
// studyYoutubeSearchBar에서 emit으로 넘겨준 검색 결과값
function onKeywordEnter (newVideoList: object[]) {
  // console.log('newlist', newVideoList)
  videoList.value = newVideoList
}
const keyword = ref<string>()
function getKeyword (newKeyword: string) {
  // console.log('newkeyword', newKeyword)
  keyword.value = newKeyword
}
</script>
<style scoped lang="scss">
</style>
