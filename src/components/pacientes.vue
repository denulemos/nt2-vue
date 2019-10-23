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
            
          </v-sheet>
       
    </v-container>
  </v-app>
</div>
</template>

<script>

 
export default {
  name: 'App',
  
  components: {
  
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