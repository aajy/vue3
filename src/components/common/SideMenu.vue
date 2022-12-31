<template>
  <div class="d-flex flex-column flex-shrink-0 sideMenu">
    <div class="d-flex flex-row align-items-center mb-3 text-decoration-none category">
      <svg class="bi pe-none m-2" width="18" height="18"><!-- svg는 크기가 변동됨 이미지로 넣기 -->
        <use xlink:href="#table"/>
      </svg>
      {{ presentCategory }}
    </div>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li v-for="(item, index) in sideMenuList" :key="index" class="nav-item" :class="{active: active(item)}">
        <svg class="bi pe-none m-2" width="18" height="18">
          <use xlink:href="#table"/>
        </svg>
        <router-link :to="{ name: item.pathName }" class="nav-link"> {{ item.name }} </router-link>
      </li>
    </ul>
    <div class="flex-shrink-0 dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle me-2">
        <span>mdo</span>
      </a>
      <ul class="dropdown-menu dropdown-menu text-small shadow">
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const presentPageInfo = defineProps({
  sideMenuList: {
    type: Array
  },
  presentCategory: {
    type: String,
    default: '페이지 제목'
  }
})
const active = function (item) {
  console.log('item', item)
  console.log('route', route.name)
}
</script>
<style scoped lang="scss">
  .sideMenu {
    display: flex;
    width: 270px;
    height: 100%;
    justify-content: space-between;
    align-items: flex-start;
    text-overflow: ellipsis;
    background-color: #5777f3;
    border-radius: 0 80px 0 0;
    padding: 50px 0px 50px 30px;
    .category {
      background-color: #f3f3f3;
      height:40px;
      border-radius: 20px;
      color: #5777f3;
      font-size: 14px;
      padding:15px;
      box-sizing: border-box;
      box-shadow : 2px 2px 10px #2b3f9159;
      svg {
        margin-right: 18px !important;
        fill : #5777f3;
      }
    }
    .nav-item {
      display: flex;
      align-items: center;
      padding: 5px 30px 5px 10px;
      margin-bottom: 5px;
      border-radius: 30px 0 0 30px;
      &.active, &:hover {
        transition: all 0.5s;
        background: linear-gradient(to right, #f3f3f365, #f3f3f310);
        box-shadow : 2px 2px 10px #2b3f9159;
      }
      svg {
        fill : #f2f2f2;
      }
    }
    >ul{
      width:100%;
      padding:0;
      li {
        width: 100%;
        transition: 0.5s;
        text-overflow: ellipsis;
        white-space: nowrap;
        a {
          display: block;
          width: 100%;
          color:#f2f2f2;
          padding:10px;
          text-decoration: none;
        }
      }
    }
  }
  .dropdown {
   padding:10px 0;
  }
  ul, li {
    list-style: none;
  }
</style>
