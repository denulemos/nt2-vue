<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="950px" overlay-color="black" transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" @click.stop="dialog = true">Ver Turnos</v-btn>
      </template>
      <v-card>
        
        <Calendario />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>


import Calendario from './cal.vue'

  export default {

  components: {
    Calendario
  },

    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  }
</script>
