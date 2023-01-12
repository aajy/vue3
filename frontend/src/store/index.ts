import { createStore } from 'vuex'

export default createStore({
  state: {
    studyListjson: [
      {
        title: '제목',
        category: '카테고리'
      }
    ]
  },
  getters: {
    studyListJson (state) {
      return state.studyListjson
    }
  },
  mutations: {
    setStudyList (state, value) {
      state.studyListjson.push(value)
    },
    modifyStudyList (state, value) {
      state.studyListjson.splice(value.index + 1, 1, value)
    },
    deleteStudyList (state, index) {
      state.studyListjson.splice(index + 1, 1)
      console.log('d', state.studyListjson)
    }
  },
  actions: {
  },
  modules: {
  }
})
