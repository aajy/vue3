// import { createStore } from 'vuex'
// interface studyList {
//   [key:string] : string,
// }
// export default createStore({
//   state: {
//     studyListjson :[
//       {
//         title:'제목',
//         category:'카테고리',
//       }
//     ] 
//   },
//   getters: {
//     studyListJson:(state) => {state.studyListjson}
//   },
//   mutations: {
//     SET_STUDYLIST :(state, response) => {
//       state.studyListJson = response;
//     }
//   },
//   actions: {
//     addStudyList({ commit }, item) {
//       commit("SET_STUDYLIST", item);
//     },
//     updateStudyList(item:studyList) {
//       this.studyList.push(item)
//     },
//     removeStudyList(item:studyList) {
//       this.studyList.push(item)
//     },
//   },
//   modules: {
//   }
// })