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
              <v-btn color="secondary" dark @click="delete_operator()"
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
      operator_id: "",
    };
  },
  methods: {
    openDialog_delete(value) {
      this.dialog_delete = true;
      this.operator_id = value.teacher_one_id;
      console.log(this.operator_id);
    },
    delete_operator() {
      // console.log('gggg');
      axios
        .delete(
          this.$store.state.url_get_API_axios +
            "/api/v1/admin/users/delete_operator/" +
            this.operator_id,
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
    },
  },
};
</script>