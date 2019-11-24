<template>
  <div
    id="app"
    class="container"
  >

      <v-toolbar
        :extended="extended"
        :prominent="prominent"
        :dense="dense"
        :collapse="collapse"
        :flat="flat"
        :color="light-blue"
        :src="bg ? 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg' : undefined"
        :extension-height="extensionHeight"
      >
      
  
        <v-toolbar-title class="tituloPagina">MediTurnos</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-toolbar-items>
          <v-btn text><router-link to="/" tag="li" exact class="nav-link">Home</router-link></v-btn>
          <v-btn text><router-link to="/turnos" tag="li" class="nav-link">Turnos</router-link></v-btn>

 
      
        </v-toolbar-items>
  
       
      </v-toolbar>

    <hr>

    <router-view></router-view>

<template>
  <v-footer padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} - <router-link to="/administrador" >Administrador</router-link> - <router-link to="/pacientes" >Ingreso medico</router-link>
    </v-col>
  </v-footer>
</template>
    
  </div>



</template>


  


<script>

 
export default {
  name: 'App',
  
  components: {
  
  },
  data: () => ({
     extended: false,
    extendedSlot: false,
    prominent: false,
    dense: false,
    collapse: false,
    flat: false,
    bg: false,
    extensionHeight: 48,
  }),
};
</script>



<style>

@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');

@media (min-width: 1200px){
  .container{
    max-width: 1268px;
  }
} 

.tituloPagina{
  font-family: 'Roboto Slab'; 
  font-weight: bold;
}

.theme--dark.v-sheet{
background-color: cadetblue!important;
}



</style>
