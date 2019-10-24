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
    label: 'Bienvenido al administrador de turnos para Profesionales!',
    hint: 'Ingrese Legajo para administrar turnos',
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

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>