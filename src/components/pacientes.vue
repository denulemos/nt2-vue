<template>
    <div id="app">
  <v-app id="inspire">
    <v-container fluid>
     
          <v-sheet
            elevation="12"
            class="pa-12"
          >
            <v-text-field
              v-model="model"
              :label="label"
              :hint="hint"
              :placeholder="placeholder"
              :shaped="shaped"
              :outlined="outlined"
              :rounded="rounded"
              :solo="solo"
              :single-line="singleLine"
              :filled="filled"
              :clearable="clearable"
              :persistent-hint="persistentHint"
              :loading="loading"
              :flat="flat"
              :counter="counterEn ? counter : false"
              :dense="dense"
            ></v-text-field>
          <Calendario />
            
          </v-sheet>
    </v-container>
  </v-app>
</div>
</template>

<script>

import Calendario from './modalCalendario.vue'
 
export default {
  name: 'App',
  
  components: {
    Calendario
  },
  data: () => ({
   model: '',
    label: 'Bienvenido al administrador de turnos para Pacientes!',
    hint: 'Ingrese su DNI valido para administrar turnos',
    placeholder: '',
    shaped: false,
    outlined: false,
    rounded: false,
    solo: false,
    singleLine: false,
    filled: false,
    clearable: false,
    persistentHint: false,
    loading: false,
    flat: false,
    counterEn: false,
    counter: 0,
    dense: false,
    
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        today: new Date().getDay(),
      events: [
        {
          name: 'Weekly Meeting',
          start: '2019-01-07 09:00',
          end: '2019-01-07 10:00',
        },
        {
          name: 'Thomas\' Birthday',
          start: '2019-01-10',
        },
        {
          name: 'Mash Potatoes',
          start: '2019-01-09 12:30',
          end: '2019-01-09 15:30',
        },
        {
          name: 'dsadasd ff',
          start: '2019-10-25 13:30',
          end: '2019-10-25 13:50'
        }
        ],
  }),
};
</script>

<style scoped>
.v-application .pa-12{
    margin-top: 163px;
}
.v-label{
font-size: 25px;
}

</style>