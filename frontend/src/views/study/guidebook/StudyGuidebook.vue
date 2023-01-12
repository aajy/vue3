<template>
  <div class="page">
    <SideMenu presentCategory="학습 자료 관리" :sideMenuList="sideMenuList"></SideMenu>
    <div class="pageView text-white text-bg-dark">
      <div class="titleContentsTag">
        <div class="pageTitle">
          <div>
            <h3>{{ pageTitle }}</h3>
            <div class="subTitle">
              <p>스터디 페이지에서 노출하는 가이드북을 관리할 수 있습니다.</p>
              <button type="button" class="btn btn-outline-primary">
                <router-link :to="{name:'studyGuidebookRegist'}">등록</router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <b-card no-body>
          <b-tabs v-model="tabIndex" card>
            <b-tab v-for="(item, index) in tabList" :title="item.tabTitle" :class="linkClass(0)" :key="index">
              {{ item.contentsTitle }}
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SideMenu from '@/components/common/SideMenu.vue'
const pageTitle = '가이드북 관리'
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
const tabList = [
  {
    tabTitle: 'guidebook 1',
    contentsTitle: 'first'
  },
  {
    tabTitle: 'guidebook 2',
    contentsTitle: 'second'
  },
  {
    tabTitle: 'guidebook 3',
    contentsTitle: 'third'
  }
]
const tabIndex = 0
const linkClass = function (idx: number) {
  if (tabIndex === idx) {
    return ['bg-primary', 'text-light']
  } else {
    return ['bg-light', 'text-info']
  }
}

</script>
<style scoped lang="scss">
.card {
  background: none;
  .tab {
    border:none !important;
  }
  .tabs .tab-content >div {
    background: none !important;
    .tabContents {
      border: 1px solid #eee;
    }
  }
}
</style>
