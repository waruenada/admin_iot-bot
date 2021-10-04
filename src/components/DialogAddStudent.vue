<template>
  <div>
    <v-dialog v-model="dialog_add_student" class="css" width="330px">
      <v-card>
        <v-system-bar color="white">
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_add_student = false" class="mt-2 mr-n2"
            ><v-icon color="binary" medium>mdi-close</v-icon></v-btn
          ></v-system-bar
        >
        <v-row justify="center" align="center" class="ma-0">
          <v-col cols="10">
            <v-card-text style="font-size: 20px; color: #595959" class="ml-2"
              >Do you want to add?</v-card-text
            >
          </v-col>
        </v-row>

        <v-card-actions>
          <v-row justify="center" class="ma-0" align="center">
            <v-col cols="4" class="ml-n4">
              <v-btn color="secondary" dark @click="add_student()">Add</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn color="cancel" dark @click="dialog_add_student = false"
                >Cancel</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog_add_student: false,
      teacher_id: "",
      student_id:"",
      teacher_all:""
    };
  },
  methods: {
    openDialog_add_new_student(value) {
      this.dialog_add_student = true;
    this.teacher_all = this.$store.state.professor_value
    console.log(this.teacher_all);
      this.teacher_id = this.teacher_all.teacher_one_id
      this.student_id = value.one_id
      console.log(this.student_id);
      console.log(this.teacher_id);

    },
    add_student() {
      var body = {
          teacherID: this.teacher_id,
          studentID: this.student_id
      }
      axios
        .post(
          this.$store.state.url_get_API_axios +
            "/api/v1/admin/users/add_student",
            body,
          {
            headers: {
              Authorization: this.$store.state.user_token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.statusCode == "201") {
            this.$store.commit("add_data", true);
            this.$store.commit("update_data", true)
            this.dialog_add_student = false;
            this.$fire({
              title: "Add Complete",
              type: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
    },
  },
};
</script>