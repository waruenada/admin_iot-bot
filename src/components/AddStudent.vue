<template>
  <div>
    <v-dialog v-model="dialog_add_student">
      <v-container>
        <!-- <v-row>
        <v-col cols="4" class="mt-6 ml-10">
          <span style="font-size: 30px" class="color-font">Operators</span>
        </v-col>
      </v-row> -->
        <v-row>
          <v-col class="ml-14">
            <v-card>
              <v-card-title>
                <v-col cols="11">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field
                ></v-col>
                <v-col cols="1">
                  <v-btn
                    color="yellow"
                    class="white--text"
                    small
                    @click="closeDialog()"
                    >Done</v-btn
                  >
                </v-col>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                class="elevation-1"
                @click:row="getValue"
              >
                <!-- <template v-slot:header.add_operator="{ header }">
                {{ header.text }}
                <v-btn color="yellow" class="white--text" small>Add Operator</v-btn>
              </template> -->
                <template v-slot:item.add_student>
                  <v-btn
                    x-small
                    color="blue"
                    @click="openDialog_add_new_student()"
                    ><v-icon color="white" small>mdi-plus</v-icon></v-btn
                  >
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <deleteOperator ref="delete_operator"></deleteOperator>
      <addNewOperator ref="add_operator"></addNewOperator>
    </v-dialog>
  </div>
</template>

<script>
import deleteOperator from "../components/DialogDelete.vue";
import addNewOperator from "../components/DialogAddStudent.vue";
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      dialog_add_student: false,
      teacher_value: "",
      teacher_id: "",
      fliter_student: [],
      student_name: "",
      student_email: "",
      student_id: "",
      fliter_name: "",
      get_teacher_id: "",
      value:[],

      items: [],
    };
  },
  components: {
    deleteOperator,
    addNewOperator,
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "name",
          align: "center",
          sortable: false,
          width: "350",
        },
        {
          text: "One Email",
          value: "one_email",
          align: "center",
          sortable: false,
          width: "400",
        },
        {
          text: "",
          value: "add_student",
          align: "center",
          sortable: false,
        },
      ];
    },
    add_data(){
      return this.$store.state.add_data;
    }
  },
  watch: {
    add_data(newValue){
      // console.log(this.$store.state.add_data);
      if (newValue === true) {
        this.$store.commit("add_data",false);
        // console.log(this.$store.state.get_value);
        this.fliter_student = []
        this.openDialog_add_student();
      }
    }
  },
  mounted() {
    this.user_index = window.localStorage.getItem("User_index")
    // this.get_student();
  },
  methods: {
    closeDialog(){
      
      this.$store.commit("status_button", false)
      // console.log(this.$store.state.status_button);
      this.items = []
      this.fliter_student = []
      this.dialog_add_student = false
    },
    openDialog_add_new_student() {
      this.$store.commit("add_student", true);
    },
    getValue(value) {
      console.log(value);
      if (this.$store.state.add_student == true) {
        this.$store.commit("add_student", false);
        this.$refs.add_operator.openDialog_add_new_student(
          value
        );
      }
    },
    openDialog_new_student(value){
      this.$store.commit("getData_professor", value)
      console.log(value);
      this.dialog_add_student = true;
      axios
        .get(
          this.$store.state.url_get_API_axios +
            "/api/v1/admin/users/user_by_role",
          {
            headers: {
              Authorization: this.$store.state.user_token,
            },
          }
        )
        .then((response) => {
          this.items = response.data.data
        })
    },
    openDialog_add_student() {
      this.dialog_add_student = true;
      axios
        .get(
          this.$store.state.url_get_API_axios +
            "/api/v1/admin/users/operator_information",
          {
            headers: {
              Authorization: this.$store.state.user_token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.teacher_value = response.data.data[this.user_index].student;
          console.log(this.teacher_value);
          this.teacher_id = this.teacher_value.teacher_one_id
    
      if (this.teacher_value.length != "0") {
        for (let index = 0; index < this.teacher_value.length; index++) {
        const element = this.teacher_value[index];
        console.log(element);
        this.fliter_name = element.student_name
        console.log(this.fliter_name);
      }
      this.get_student();
      }else if (this.teacher_value.length == "0") {
        console.log('zero');
        this.fliter_name = "0"
        console.log(this.fliter_name);
        this.get_student()
      }
        });
        
      
      
    },
    get_student(){
      if (this.$store.state.status_button == true) {
      axios
        .get(
          this.$store.state.url_get_API_axios +
            "/api/v1/admin/users/user_by_role?role=user",
          {
            headers: {
              Authorization: this.$store.state.user_token,
            },
          }
        )
        .then((response) => {
          console.log(response.data.data);
          this.items = response.data.data
          // if (this.fliter_name != "0") {
          //   for (let index = 0; index < this.value.length; index++) {
          //   const element = this.value[index];
          //   this.name = element.name
          //   this.one_email = element.one_email;
          //   this.one_id = element.one_id;
          //   console.log(this.name);
          //   if (!this.name.includes(this.fliter_name)) {
          //     this.fliter_student.push({
          //       name: this.name,
          //       one_email: this.one_email,
          //       one_id: this.one_id,
          //     });
          //   }
          // }
          // console.log(this.fliter_student);
          // this.items = this.fliter_student
          // }else if (this.fliter_name == "0") {
          //   // this.items = this.value
          //   for (let index = 0; index < this.value.length; index++) {
          //   const element = this.value[index];
          //   this.name = element.name
          //   this.one_email = element.one_email;
          //   this.one_id = element.one_id;
          //   this.fliter_student.push({
          //       name: this.name,
          //       one_email: this.one_email,
          //       one_id: this.one_id,
          //     });
          // }
          // this.items = this.fliter_student
          // }
          
        })
      }
    },
    }
};
</script>