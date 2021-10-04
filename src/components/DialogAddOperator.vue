<template>
  <div>
    <v-dialog v-model="dialog_add_operator" class="css" width="330px">
      <v-card>
        <v-system-bar color="white">
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_add_operator = false" class="mt-2 mr-n2"
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
              <v-btn color="secondary" dark @click="add_operator()">Add</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn color="cancel" dark @click="dialog_add_operator = false"
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
      dialog_add_operator: false,
      user_id: "",
    };
  },
  methods: {
    openDialog_add_new_operator(value) {
      this.dialog_add_operator = true;
      this.user_id = value;
      console.log(value);
      console.log(this.$store.state.user_token);
    },
    add_operator() {
      // let body = {}
      axios
        .post(
          this.$store.state.url_get_API_axios +
            "/api/v1/admin/users/add_operator/" +
            this.user_id,
            null,
          {
            headers: {
              Authorization: this.$store.state.user_token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.statusCode == "201") {
            this.$store.commit("update_data", true);
            this.$store.commit("update_user", true)
            this.dialog_add_operator = false;
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