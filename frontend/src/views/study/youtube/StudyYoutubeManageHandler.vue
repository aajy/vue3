<template>
  <div class="page">
    <SideMenu presentCategory="학습 자료 관리" :sideMenuList="sideMenuList"></SideMenu>
   <div  class="pageView text-white text-bg-dark">
     <div class="pageTitle">
      <div>
        <h3>유튜브 등록</h3>
        <div class="subTitle">
          <p>스터디 페이지에서 노출하는 배너와 유튜브를 관리할 수 있습니다.</p>
         </div>
       </div>
     </div>
     <!-- 여기선 유튜브 플리를 가져오는데 필요한 데이터를 저장하는 곳으로, tabTitme이랑 contentsTitle도 여기서 등록 -->
     <div class="mb-3 row">
       <label for="inputPassword" class="col-sm-2 col-form-label">title</label>
       <div class="col-sm-10 mb-1">
         <input type="password" class="form-control" id="inputPassword">
       </div>
       <label for="inputPassword" class="col-sm-2 col-form-label">category</label>
       <div class="col-sm-10 mb-1">
         <input type="password" class="form-control" id="inputPassword">
       </div>
     </div>
     <div class="actionButton">
       <button type="button" class="btn btn-outline-primary" click="()=>" >취소</button>
       <button type="button" class="btn btn-outline-primary">등록</button>
       <!-- 유투브 검색어 목록 등록/수정 검색어, 날짜, 로 이뤄진 페이지 -->
     </div>
   </div>
 </div>
</template>
<script setup lang="ts">
import SideMenu from '@/components/common/SideMenu.vue'
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
</script>
<style lang="scss">
</style>
