import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected_value: "operators_page",
    professor_value:""
  },
  mutations: {
    update_selected(state, val){
      state.selected_value = val
      // console.log(val);
    },
    getData_professor(state, val){
      state.professor_value = val
    }
  },
  actions: {
  },
  modules: {
  }
})
