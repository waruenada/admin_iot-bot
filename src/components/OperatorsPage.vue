<template>
  <div class="bg" style="height: 100%">
    <v-container>
      <v-row>
        <v-col cols="4" class="mt-6 ml-10">
          <span style="font-size: 30px" class="color-font">Operators</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="ml-5">
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
              @click:row="openProfessorPage"
            >
              <template v-slot:header.add_operator="{ header }">
                {{ header.text }}
                <v-btn
                  color="yellow"
                  class="white--text"
                  small
                  @click="openDialog_add_operator()"
                  >Add Operator</v-btn
                >
              </template>
              <template v-slot:item.add_operator>
                <v-btn x-small color="blue" @click="openDialog_delete()"
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
import deleteOperator from "../components/DialogDelete.vue";
import addOperator from "../components/AddOperator.vue";
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      items: [],
    };
  },
  components: {
    deleteOperator,
    addOperator,
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "teacher_name",
          align: "center",
          sortable: false,
        },
        {
          text: "One Email",
          value: "teacher_onemail",
          align: "center",
          sortable: false,
        },
        {
          text: "Student",
          value: "num_of_student",
          align: "center",
          sortable: false,
        },
        {
          text: "",
          value: "add_operator",
          align: "center",
          sortable: false,
        },
      ];
    },
    update_data() {
      return this.$store.state.update_data;
    },
  },
  watch: {
    update_data(newValue) {
      if (newValue === true) {
        this.$store.commit("update_data", false);
        this.get_data();
      }
    },
  },

  mounted() {
    var parameters = this.$route.query;
    this.parameters_onechat_token = parameters.onechat_token;
    window.localStorage.setItem("User_token", this.parameters_onechat_token);
    this.$store.commit("get_token", this.parameters_onechat_token);
    this.get_data();
  },

  methods: {
    openDialog_delete() {
      this.$store.commit("delete_data", true);
    },
    openDialog_add_operator() {
      this.$refs.add_operator.openDialog_add_operator();
    },
    openProfessorPage(value) {
      console.log(value);
      // window.localStorage.setItem("get_value", value.student);
      this.$store.commit("get_value", value);
      if (this.$store.state.delete_data == true) {
        console.log("delete");
        this.$store.commit("delete_data", false);
        this.$refs.delete_operator.openDialog_delete(value);
      } else {
        console.log("not delete");
        // console.log(this.items.indexOf(value));
        window.localStorage.setItem("User_index", this.items.indexOf(value));
        this.$store.commit("update_selected", "professor_page");
        this.$store.commit("getData_professor", value);
      }
    },
    get_data() {
      axios
        .get(
          this.$store.state.url_get_API_axios +
            "/api/v1/admin/users/operator_information",
          {
            headers: {
              Authorization: this.parameters_onechat_token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.items = response.data.data;
          this.$store.commit("get_user_data", this.items)
        });
    },
  },
};
</script>