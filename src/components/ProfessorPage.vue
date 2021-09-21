<template>
  <div class="bg" style="height: 100%">
    <v-container>
      <v-row>
        <v-col cols="4" class="mt-6 ml-10">
          <span style="font-size: 30px" class="color-font">{{this.professor_value.name}}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mt-n6" cols="3">
          <span class="ml-11 mb-4">{{ this.professor_value.one_email }}</span>
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
import deleteOperator from '../components/DialogDelete.vue';
import addStudent from '../components/AddStudent.vue'
export default {
  data() {
    return {
        search: "",
        professor_value:"",
      desserts: [
        {
          name: "Aj.Anonimus",
          one_email: "anonimus@one.th",
        },
        {
          name: "Aj.David",
          one_email: "david@one.th",
        },
        {
          name: "Aj.Bobby",
          one_email: "bobby@one.th",
        },
      ],
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
          value: "name",
          align: "center",
          sortable: false,
          width: "350"
        },
        {
          text: "One Email",
          value: "one_email",
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
  },
  mounted(){
      this.professor_value = this.$store.state.professor_value

  },
  methods: {
    openDialog_delete(){
      this.$refs.delete_operator.openDialog_delete()
    },
    openDialog_add_student(){
      this.$refs.add_student.openDialog_add_student()
    }
  }
};
</script>