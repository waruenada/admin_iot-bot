<template>
  <div>
    <v-dialog v-model="dialog_delete" class="css" width="330px">
      <v-card>
        <v-system-bar color="white">
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false" class="mt-2 mr-n2"
            ><v-icon color="binary" medium>mdi-close</v-icon></v-btn
          ></v-system-bar
        >
        <v-row justify="center" align="center" class="ma-0">
          <v-col cols="10">
            <v-card-text style="font-size:20px; color:#595959" class="ml-2">Do you want to delete?</v-card-text>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-row justify="center" class="ma-0" align="center">
            <v-col cols="4" class="ml-n4">
              <v-btn color="secondary" dark @click="delete_Menu()">Delete</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn color="cancel" dark @click="dialog_delete = false">Cancel</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
    data() {
        return {
            dialog_delete: false
        }
    },
    methods: {
        openDialog_delete(){
            this.dialog_delete = true
        }
    }
}
</script>