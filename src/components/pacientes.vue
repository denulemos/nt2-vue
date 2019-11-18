<template>
    <div id="app">
      <v-app id="inspire">
 <b-container class="bv-example-row">
  <b-row>

    <b-col id= "medicoSide">
      <h2>Sos medico?</h2>
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <div class="input">
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Legajo"
        required
       
      ></v-text-field>
  </div>
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Acceder
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Resetear Valor
      </v-btn>
  
      
    </v-form>
      </b-col>



    <b-col id="pacienteSide">
      <h2>Sos paciente?</h2> 
      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
    <div class="input">
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Dni"
        required
      ></v-text-field>
  </div>
      
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Acceder
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Resetear Valor
      </v-btn>
  
    </v-form></b-col>



  </b-row>
</b-container>
   </v-app>
</div>
</template>

<script>

 
export default {
  name: 'App',
    data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
   
  
    
  }),
   

  
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  },
}

</script>

<style>

@import '../styles/pacientes.css';


</style>