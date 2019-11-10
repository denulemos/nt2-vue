<template>
    <div id="app">
 <v-app id="inspire">
    <v-row justify="center">
      <v-col cols="10" sm="10"  xs="6">
        <v-card ref="form" style="margin:180px; padding:24px">
          <v-card-text>
            <h5>Sos medico? Ingresa tu legajo!</h5>
            <v-text-field
              ref="name"
              v-model="name"
              :rules="[() => !!name || 'This field is required']"
              :error-messages="errorMessages"
              
              placeholder="156368346"
              required
            ></v-text-field>
            
          </v-card-text>
          
          <v-card-actions>
            
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
              <v-tooltip
                v-if="formHasErrors"
                left
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    class="my-0"
                    @click="resetForm"
                    v-on="on"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
                <span>Refresh form</span>
              </v-tooltip>
            </v-slide-x-reverse-transition>
            <v-btn color="primary" text @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
  </v-app>
</div>
</template>

<script>

 
export default {
  name: 'App',
  
  components: {
   
  },
     data: () => ({
    errorMessages: '',
    name: null,
    formHasErrors: false,
    }),

    computed: {
    form () {
      return {
        name: this.name,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        country: this.country,
      }
    },
  },

  watch: {
    name () {
      this.errorMessages = ''
    },
  },
  methods: {
    addressCheck () {
      this.errorMessages = this.address && !this.name
        ? 'Hey! I\'m required'
        : ''

      return true
    },
    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit () {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })
    },
  },
  };
</script>

<style scoped>

@import '../styles/pacientes.css';
#inspire{
  background-image: url('..\assets\fondo1.jpg')!important;
  background-size: contain;
}

</style>