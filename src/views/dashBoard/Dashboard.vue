<template>
  <div class="page">
     <SideMenu  presentCategory="대시보드" :sideMenuList="sideMenuList"></SideMenu>
    <div  class="pageView text-white text-bg-dark">
      <div class="pageTitle">
        <div>
          <h3>대시보드</h3>
          <div class="subTitle">
            <p>대시보드를 관리할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import SideMenu from '@/components/common/SideMenu.vue';
  const sideMenuList = [
    {
      name : '대시보드1',
      pathName : 'dashboard1'
    },
    {
      name : '대시보드2',
      pathName : 'dashboard2'
    },
    {
      name : '대시보드3',
      pathName : 'dashboard3'
    },
  ]
</script>
<style lang="scss">
</style>