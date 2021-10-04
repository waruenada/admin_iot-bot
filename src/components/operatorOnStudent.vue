<template>
  <div class="bg" style="height: 100%">
    <v-container>
      <v-row>
        <v-col cols="4" class="mt-6 ml-10">
          <span style="font-size: 30px" class="color-font">{{this.student_data.teacher_name}}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mt-n6" cols="3">
          <span class="ml-11 mb-4">{{ this.student_data.teacher_one_email }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="ml-14">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              class="elevation-1"
              @click:row="checkButton"
            >
              <template v-slot:header.add_operator="{ header }">
                {{ header.text }}
                <v-btn color="yellow" class="white--text" small @click="openDialog_add_student()">Add Student</v-btn>
              </template>
              <template v-slot:item.add_operator>
                <v-btn
                  x-small
                  color="blue"
                  @click="openDialog_delete()"
                  ><v-icon color="white" small>mdi-delete</v-icon></v-btn
                >
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <deleteOperator ref="delete_operator"></deleteOperator>
    <addStudent ref="add_student"></addStudent>
  </div>
</template>

<script>
import deleteOperator from '../components/DialogDeleteStudent.vue';
import addStudent from '../components/AddStudent.vue'
import axios from "axios";
export default {
  data() {
    return {
        search: "",
        professor_value:"",
        student_index:"",
        student_data:"",
        value:"",
      items:[]
    };
  },
  components: {
    deleteOperator,
    addStudent
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "student_name",
          align: "center",
          sortable: false,
          width: "350"
        },
        {
          text: "One Email",
          value: "student_one_email",
          align: "center",
          sortable: false,
          width: "350"
        },
        {
          text: "",
          value: "add_operator",
          align: "center",
          sortable: false,
        },
      ];
    },
    update_data(){
      return this.$store.state.update_data;
    }
  },
  watch: {
    update_data(newValue){
      if (newValue === true) {
        console.log('gggggs');
        this.$store.commit("update_data",false);
        this.get_data()
      }
    }
  },
  mounted(){
      this.student_data = this.$store.state.update_data
      console.log(this.student_data);
      this.get_student()

  },
  methods: {
      get_student(){
      axios.get(this.$store.state.url_get_API_axios + "/api/v1/admin/users/operator_information?search=" + this.student_data.teacher_name, {
        headers: {
            Authorization: this.$store.state.user_token,
          },
      }).then((response) => {
        console.log(response);
        this.value = response.data.data[0]
        this.items = response.data.data[0].student
      })
    },
    openDialog_add_student(){
      this.$refs.add_student.openDialog_new_student(this.value)
    },
    checkButton(value){
      if (this.$store.state.status_button === true) {
        this.$refs.delete_operator.openDialog_delete_student(value)
      }
    },
    openDialog_delete(){
      this.$store.commit("status_button", true)
      
    },
  }
};
</script>