<template>
  <div>
    <v-app>
      <div id="container">
<H3>Seccion Administrador</h3>
 <b-card no-body>
    <b-tabs card>
      <b-tab title="Agregar Medico" active>
        <h1>Agregar medico</h1>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="nombreMedico"
        :counter="10"
        :rules="nameRules"
        label="Nombre Medico"
        required
      ></v-text-field>
    <v-text-field
        v-model="apellidoMedico"
        :counter="10"
        :rules="nameRules"
        label="Apellido Medico"
        required
      ></v-text-field>
      <v-text-field
        v-model="emailMedico"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>
   <v-text-field
        v-model="especialidadMedico"
        :counter="20"
        :rules="nameRules"
        label="Especialidad"
        required
      ></v-text-field>
       <v-text-field
        v-model="legajoMedico"
        :counter="10"
        :rules="nameRules"
        label="Legajo"
        required
      ></v-text-field>
        <v-text-field
        v-model="ubicacionMedico"
        :counter="10"
        :rules="nameRules"
        label="Donde esta ubicado? Reemplazar por mapa"
        required
      ></v-text-field>
  
      
  
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
  
      
    </v-form>
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

      <!--Turnos -->

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

      <!--Pacientes -->
 
      <b-tab title="Ver pacientes registrados" active>

         <b-input-group>
    <template v-slot:prepend>
      <b-input-group-text >Busqueda</b-input-group-text>
    </template>
    <b-form-input v-model="criterioDeBusquedaPacientes"></b-form-input>

    
  </b-input-group>
 <h3 class="tituloMedDisp" v-text="`${pacientesFiltradas.length} Pacientes registrados`"></h3>


 <div class="col-md-3" v-for="pacientes in pacientesFiltradas" v-bind:key="pacientes.dni">
        <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >

   

      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Dni {{pacientes.dni}}</div>
          <v-list-item-title class="headline mb-1">{{pacientes.nombre}} {{pacientes.apellido}}</v-list-item-title>
          <v-list-item-subtitle>{{pacientes.email}}</v-list-item-subtitle>
        </v-list-item-content>
  
      
      </v-list-item>
  
      <!-- <v-card-actions>
        <v-btn text>Cancelar Turno</v-btn>
       
      </v-card-actions> -->

    </v-card>
    </div>
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
    criterioDeBusquedaPacientes : "",
    criterioBusquedaMedicos : "",
    //Registro medico
    nombreMedico : "",
    apellidoMedico: "",
    emailMedico : "",
    legajoMedico : "",
    ubicacionMedico : "",
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
     pacientesFiltradas() {
      return this.pacientes.filter(pacientes => {
        let registroConcatenado = `${pacientes.nombre}${pacientes.apellido}${pacientes.dni}`;
        return registroConcatenado
          .toLowerCase()
          .includes(this.criterioDeBusquedaPacientes.toLowerCase());
      });
    },
  
    
  },
  methods: {
    getNombreCompletoPaciente(pacientes) {
      return `${pacientes.nombre} ${pacientes.apellido}`;
    },
     getNombreCompletoMedico(medico) {
      return `${medico.nombre} ${medico.apellido}`;
    },
    getDni(pacientes){
      return `${pacientes.dni}`;
    },
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
