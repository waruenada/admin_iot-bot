<template>
  <div>
    <v-dialog v-model="dialog_delete" class="css" width="330px">
      <v-card>
        <v-system-bar color="white">
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_delete = false" class="mt-2 mr-n2"
            ><v-icon color="binary" medium>mdi-close</v-icon></v-btn
          ></v-system-bar
        >
        <v-row justify="center" align="center" class="ma-0">
          <v-col cols="10">
            <v-card-text style="font-size: 20px; color: #595959" class="ml-2"
              >Do you want to delete?</v-card-text
            >
          </v-col>
        </v-row>

        <v-card-actions>
          <v-row justify="center" class="ma-0" align="center">
            <v-col cols="4" class="ml-n4">
              <v-btn color="secondary" dark @click="delete_student()"
                >Delete</v-btn
              >
            </v-col>
            <v-col cols="4">
              <v-btn color="cancel" dark @click="dialog_delete = false"
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
      dialog_delete: false,
      student_id: "",
      teacher_all:"",
      teacher_all_new:"",
      teacher_id:"",
      teacher_id_new:""
    };
  },
  mounted(){
    this.teacher_all = this.$store.state.get_value
    // console.log(this.teacher_id);
    this.teacher_id = this.teacher_all.teacher_one_id
    console.log(this.teacher_id);
  },
  methods: {
    openDialog_delete(value) {
      this.dialog_delete = true;
      console.log(value);
      this.student_id = value.student_id
      this.teacher_id_new = value.teacher_id
      console.log(this.teacher_id_new);
      console.log(this.student_id);
    },
    openDialog_delete_student(value){
      // console.log(value);
      this.dialog_delete = true;
      this.student_id = value.student_id
      this.teacher_all_new = this.$store.state.professor_value
      this.teacher_id_new = this.teacher_all_new.teacher_one_id
      console.log(this.student_id);
      console.log(this.teacher_id_new);
    },
    delete_student() {
      // console.log('gggg');
      if (this.teacher_id_new != "undefined") {
        axios
        .delete(
          this.$store.state.url_get_API_axios +
            "/api/v1/admin/users/delete_student_perm/" +
            this.teacher_id_new + "/" + this.student_id,
          {
            headers: {
              Authorization: this.$store.state.user_token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.statusCode == "200") {
            this.$store.commit("update_data", true);
            this.dialog_delete = false;
            this.$fire({
              title: "Delete Complete",
              type: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
      }else if (this.teacher_id_new == "undefined") {
        axios
        .delete(
          this.$store.state.url_get_API_axios +
            "/api/v1/admin/users/delete_student_perm/" +
            this.teacher_id + "/" + this.student_id,
          {
            headers: {
              Authorization: this.$store.state.user_token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.statusCode == "200") {
            this.$store.commit("update_data", true);
            this.dialog_delete = false;
            this.$fire({
              title: "Delete Complete",
              type: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
      }
      
    },
  },
};
</script>