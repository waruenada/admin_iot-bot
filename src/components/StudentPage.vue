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
              :items="desserts"
              :search="search"
              class="elevation-1"
              @click:row="openProfessorPage"
            >
              <!-- <template v-slot:header.add_operator="{ header }">
                {{ header.text }}
                <v-btn color="yellow" class="white--text" small @click="opemDialog_add_operator()">Add Operator</v-btn>
              </template> -->
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
    <addOperator ref="add_operator"></addOperator>
  </div>
</template>

<script>
import deleteOperator from '../components/DialogDelete.vue';
import addOperator from '../components/AddOperator.vue'
export default {
  data() {
    return {
      search: "",
      desserts: [
        {
          name: "Aj.Anonimus",
          one_email: "anonimus@one.th",
          operator: "Aj.Anonimus",
        },
        {
          name: "Aj.David",
          one_email: "david@one.th",
          operator: "Aj.Anonimus",
        },
        {
          name: "Aj.Bobby",
          one_email: "bobby@one.th",
          operator: "Aj.Anonimus",
        },
      ],
    };
  },
  components: {
    deleteOperator,
    addOperator
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          value: "name",
          align: "center",
          sortable: false,
          width: "300"
        },
        {
          text: "One Email",
          value: "one_email",
          align: "center",
          sortable: false,
          width: "300"
        },
        {
          text: "Operator",
          value: "operator",
          align: "center",
          sortable: false,
          width: "300"
        },
        {
          text: "",
          value: "add_operator",
          align: "center",
          sortable: false,
        },
      ];
    },
  },
  methods: {
    openDialog_delete(){
      this.$refs.delete_operator.openDialog_delete()
    },
    opemDialog_add_operator(){
      this.$refs.add_operator.openDialog_add_operator()
    },
    openProfessorPage(value){
      this.$store.commit("update_selected","professor_page")
      console.log(value);
      this.$store.commit("getData_professor",value)
    }
  }
};
</script>