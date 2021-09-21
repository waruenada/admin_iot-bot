<template>
  <div class="bg">
    <v-toolbar class="yellow">
      <v-row justify="end" align="center">
        <v-col cols="8" align="left">
          <img
            width="43px"
            height="55"
            class="mt-1 mr-2"
            src="../assets/iot_davinci.png"
          />
          <v-btn text @click="check_selected('operators_page')" class="mt-n10" color="blue">
            <span class="color">Operators</span>
          </v-btn>
          <v-btn text @click="check_selected('student_page')" class="mt-n10" color="blue">
            <span class="color">Students</span>
          </v-btn>
        </v-col>
        <v-col cols="4" align="right">
          <v-avatar color="yellow" class="mr-2">
            <!-- <v-img :src="this.$store.state.user_picture"></v-img> -->
            <v-icon dark color="white" large> mdi-account-circle </v-icon>
          </v-avatar>
          <!-- <span>Aj.{{this.$store.state.username}}</span> -->
          <span class="font-weight-bold">Admin</span>
        </v-col>
      </v-row>
    </v-toolbar>
    <OperatorsPage v-if="this.$store.state.selected_value === 'operators_page'"></OperatorsPage>
    <ProfessorPage v-if="this.$store.state.selected_value === 'professor_page'"></ProfessorPage>
    <StudentPage v-if="this.$store.state.selected_value === 'student_page'"></StudentPage>
  </div>
</template>

<script>
import OperatorsPage from '../components/OperatorsPage.vue';
import ProfessorPage from '../components/ProfessorPage.vue';
import StudentPage from '../components/StudentPage.vue';


export default {
  components: {
    OperatorsPage,
    ProfessorPage,
    StudentPage
  },
  data() {
    return {
      selected: this.$store.state.selected_value,
    };
  },
  methods: {
    check_selected(newSelected) {
      this.$store.commit("update_selected", newSelected);
      // console.log(newSelected);
    },
  },
};
</script>

<style lang="scss" scoped>
.color {
  color:#1565C0;
}
.bg {
  background-color:#F5F5F5;
  background-size: cover;
  height: 100%;
}
</style>