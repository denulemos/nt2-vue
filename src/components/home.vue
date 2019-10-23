<template>
   

<div id="app">
  <v-app id="inspire">
    <v-row align="center" justify="center">
      <v-img
        src="../assets/doctor.jpg"
        lazy-src="https://picsum.photos/id/11/10/6"
        aspect-ratio="1"
        class="grey lighten-2"
        
        max-height="620"
      ></v-img>
    </v-row>
  </v-app>
</div>
</template>

<style scoped>
.v-application .align-center{
   -webkit-box-align:unset!important;
   align-items:unset!important;
}
.theme--light.v-application{
   background: none;
}
.lighten-2 {
max-height: 621px;
}
.v-image__image .v-image__image--cover{
height: 622px;
}
</style>