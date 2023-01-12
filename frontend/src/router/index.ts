import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    meta: { unauthorized: true },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    meta: { unauthorized: true },
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/dashboard1',
    name: 'dashBoard1',
    meta: { unauthorized: true },
    component: () => import('@/views/dashBoard/DashBoard1.vue')
  },
  {
    path: '/dashboard2',
    name: 'dashBoard2',
    meta: { unauthorized: true },
    component: () => import('@/views/dashBoard/DashBoard2.vue')
  },
  {
    path: '/dashboard3',
    name: 'dashBoard3',
    meta: { unauthorized: true },
    component: () => import('@/views/dashBoard/DashBoard3.vue')
  },

  //  study.ts
  {
    path: '/study/study',
    name: 'study',
    meta: { unauthorized: true },
    props: true,
    component: () => import(/* webpackChunkName: 'study' */'@/views/study/studyPage/studyManage/StudyManage.vue')
  },
  {
    path: '/study/study/regist',
    name: 'studyRegist',
    meta: { unauthorized: true },
    props: true,
    component: () => import('@/views/study/studyPage/studyManage/StudyManageHandler.vue')
  },
  {
    path: '/study/study/modify',
    name: 'studyModify',
    meta: { unauthorized: true },
    component: () => import('@/views/study/studyPage/studyManage/StudyManageHandler.vue')
  },
  {
    path: '/study/youtube',
    name: 'studyYoutube',
    meta: { unauthorized: true },
    component: () => import('@/views/study/youtube/StudyYoutube.vue')
  },
  {
    path: '/study/youtube/regist',
    name: 'studyYoutubeRegist',
    meta: { unauthorized: true },
    component: () => import('@/views/study/youtube/StudyYoutubeManageHandler.vue')
  },
  {
    path: '/study/guidebook',
    name: 'studyGuidebook',
    meta: { unauthorized: true },
    component: () => import('@/views/study/guidebook/StudyGuidebook.vue')
  },
  {
    path: '/study/guidebook/regist',
    name: 'studyGuidebookRegist',
    meta: { unauthorized: true },
    component: () => import('@/views/study/guidebook/StudyGuidebookManageHandler.vue')
  }
  /* [404] { path: '/*', component: pageNotFoundPage },**/
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to: any, from: any, next: any) => {
  const unauthorized: boolean = to.matched.some((routeInfo: any) => {
    return routeInfo.meta.unauthorized
  })

  if (unauthorized) {
    return next()
  }
})

export default router
