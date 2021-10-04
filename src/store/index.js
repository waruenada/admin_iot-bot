import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected_value: "operators_page",
    professor_value:"",
    url_get_API_axios: "http://203.151.164.229:8000",
    delete_data:"",
    update_data:"",
    add_data:"",
    update_user:"",
    add_student:"",
    status_button:"",
    get_value:"",
    user_data:"",
    student_index:"",
    student_data:""
  },
  mutations: {
    update_selected(state, val){
      state.selected_value = val
      // console.log(val);
    },
    status_button(state, val){
      state.status_button = val
    },
    student_data(state, val){
      state.update_data = val
      console.log(val);
    },
    student_index(state, val){
      state.student_index = val
    },
    getData_professor(state, val){
      state.professor_value = val
    },
    add_student(state, val){
      state.add_student = val
    },
    get_token(state, val){
      state.user_token = val
      // console.log(val);
    },
    delete_data(state, val){
      state.delete_data = val
      // console.log(val);
    },
    update_data(state ,val){
      state.update_data = val
    },
    add_data(state, val){
      state.add_data = val
    },
    update_user(state, val){
      state.update_user = val
    },
    get_value(state, val){
      state.get_value = val
      // console.log(val);
    },
    get_user_data(state, val){
      state.user_data = val
    }

  },
  actions: {
  },
  modules: {
  }
})
