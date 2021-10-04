<template>
  <div class="bg" style="height: 100%">
    <v-container>
      <v-row>
        <v-col cols="4" class="mt-6 ml-10">
          <span style="font-size: 30px" class="color-font">Student</span>
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
              @click:row="student_value"
            >
              <!-- <template v-slot:header.add_operator="{ header }">
                {{ header.text }}
                <v-btn color="yellow" class="white--text" small @click="opemDialog_add_operator()">Add Operator</v-btn>
              </template> -->
              <template v-slot:item.delete_student>
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
    <addOperator ref="add_operator"></addOperator>
  </div>
</template>

<script>
import deleteOperator from '../components/DialogDeleteStudent.vue';
import addOperator from '../components/AddOperator.vue';
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      items:[],
      value:[],
      teacher_name:"",
      student_email:"",
      student_name:"",
      student_id:""
    };
  },
  components: {
    deleteOperator,
    addOperator
  },
  mounted(){
    this.get_student()
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "student_name",
          align: "center",
          sortable: false,
          width: "300"
        },
        {
          text: "One Email",
          value: "student_email",
          align: "center",
          sortable: false,
          width: "300"
        },
        {
          text: "Operator",
          value: "teacher_name",
          align: "center",
          sortable: false,
          width: "300"
        },
        {
          text: "",
          value: "delete_student",
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
        this.$store.commit("update_data",false);
        this.get_student()
      }
    }
  },
  methods: {
    openDialog_delete(){
      this.$store.commit("delete_data", true)
      
    },
    get_student(){
      axios.get(this.$store.state.url_get_API_axios + "/api/v1/admin/users/student_information", {
        headers: {
            Authorization: this.$store.state.user_token,
          },
      }).then((response) => {
        console.log(response);
        this.value = response.data.data
        for (let index = 0; index < this.value.length; index++) {
          const element = this.value[index];
          this.teacher_name = element.teacher_name
          this.student_name = element.student_name
          this.student_email = element.student_name
          this.student_id = element.student_id
          if (this.teacher_name != null) {
            this.items.push({
              student_name: this.student_name,
              student_email: this.student_email,
              student_id: this.student_id,
              teacher_name: this.teacher_name
            })
          }
          
        }
        console.log(this.items);
      })
    },
    student_value(value){
      // console.log(value);
      this.$store.commit("student_data", value)
      if (this.$store.state.delete_data == true) {
        this.$store.commit("delete_data", false)
        this.$refs.delete_operator.openDialog_delete(value)
      }else if (this.$store.state.delete_data == false) {
        
        this.$store.commit("update_selected", "operatorOnStudent_page")
        
      }
    }
  }
};
</script>