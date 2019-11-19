<template>
  <div>
    <v-app>
      <div id="container">
<H3>Seccion Administrador</h3>
 <b-card no-body>
    <b-tabs card>
      <b-tab title="Agregar Medico" active>
        <b-card-text>Tab contents 1</b-card-text>
      </b-tab>
      <b-tab title="Ver Estatisticas">
        <b-card-text>
            <div class="contenedorStatidisticas">
                <pure-vue-chart
  :points=[1,4,5,3,4]
:show-y-axis="false"
:show-x-axis="true"
:width="400"
:height="200"
:show-values="true"
:use-month-labels="true"
:months="['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']"
/>
            </div>
        </b-card-text>
      </b-tab>
        <b-tab title="Ver turnos" active>
         <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">OVERLINE</div>
          <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
          <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>
  
      
      </v-list-item>
  
      <v-card-actions>
        <v-btn text>Cancelar Turno</v-btn>
       
      </v-card-actions>
    </v-card>
      </b-tab>
      <b-tab title="Ver pacientes registrados" active>
        <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">OVERLINE</div>
          <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
          <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>
  
      
      </v-list-item>
  
      <v-card-actions>
        <v-btn text>Cancelar Turno</v-btn>
       
      </v-card-actions>
    </v-card>
      </b-tab>
    </b-tabs>
  </b-card>
        </div>

<!--Modal Turnos -->
<template>
  <v-row justify="center">
    <v-dialog v-model="modalShow" persistent max-width="600px">
      <v-card>
      <v-content>
      <h3>Log in</h3>
      <h4>{{admin.usuario}}</h4>
      <input v-model="user" placeholder="Usuario">
      <input v-model="password" placeholder="password">
     <v-btn color="primary"  :click="modalShow = false">Login</v-btn>
    </v-content>
       

      
      </v-card>
    </v-dialog>
  </v-row>
</template>

     
     
      </v-app>
  </div>
</template>
<script>
import turnos from '../data/turnos.json';
 import admin from '../data/admin.json';
 import medicos from '../data/medicos.json';
 import pacientes from '../data/pacientes.json';
import PureVueChart from 'pure-vue-chart';

export default {
  data: function() {
    return {
    modalShow: true,
    user : "",
    turnos : turnos, 
    pacientes: pacientes,
    medicos: medicos, 
    password: "",
    admin : admin
    };
  },
  components:{
        PureVueChart
  },
  computed: {
   
    
  },
  methods: {
      isLoginValid(){
          if (this.user == admin.usuario && this.password == admin.contraseña){
              this.modalShow = false;
          }
      }
  }
};
</script>

<style >


</style>
