<template>
  <div>
    <v-app>
      <div id="container">
        <H3>Seccion Profesional</H3>
        <div class="alert alert-success" role="alert">
 Bienvenido {{medico.nombre}}
</div>
        <b-card no-body>
          <b-tabs card>
            <!-- <b-tab  title="Informacion Medico" active>
              <div class="tarjetaInfoMedico">
              <v-col>
            <v-card

      class="mx-auto"
      max-width="400"
      display = "inline-grid"
      tile
    >
      <v-img
        height="100%"
        src="../assets/fondo2.jpg"
      >
        <v-row
          align="end"
          class="fill-height"
        >
          <v-col
            align-self="start"
            class="pa-0"
            cols="12"
               sm="12"
          md="4"
          >
            <v-avatar
              class="profile"
              color="grey"
              size="164"
              tile
            >
              <v-img src="../assets/medico.jpg"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item
              color="rgba(0, 0, 0, .4)"
              dark
            >
              <v-list-item-content>
                <v-list-item-title class="title"> {{this.medico.nombre}} {{this.medico.apellido}}</v-list-item-title>
                <v-list-item-subtitle>{{this.medico.especialidad}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
    </v-col>
    <v-col>
    <h3>Informacion en Sistema </h3>
    <ul>
      <li>Legajo => {{this.medico.legajo}}</li>
      <li>Id en sistema => {{this.medico.id}}</li>
      <li>Especialidad => {{this.medico.especialidad}}</li>
      <li>Email => {{this.medico.especialidad}}</li>
      <li>Cantidad de turnos totales</li>
      </ul>
    </v-col>
    </div>
            </b-tab> -->

            <!--Turnos -->
            <div class="card-deck">
              <div class="row" style="margin-left:25px; margin-right:18px;">
             
                <b-tab title="Ver turnos propios" active>
                 <div class="card-deck">
                    
              <div class="row">
                <b-tab title="Ver turnos" active>
                
                  <b-table
                    striped
                    hover
                    :items="turnosFiltradas(turnos)"
                    selectable
                    :select-mode="selectMode"
                    @row-selected="onRowSelected"
                    responsive="sm"
                  >
                  </b-table>
                  <!-- TESTING -->
                  <p>
                    Selected Rows:<br />
                    {{ selected }}
                  </p>
                  <b-button style="position: center" variant="danger">Eliminar turnos seleccionados</b-button>
                </b-tab>
              </div>
            </div>
                 
                </b-tab>
              </div>
            </div>
            <!--Pacientes -->
          </b-tabs>
        </b-card>
      </div>

    <template>
              <v-row justify="center">
                <v-dialog
                  v-model="modalShow"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                  <v-col >
                    <h5 style="text-align:center">Ingrese legajo para continuar </h5>
                    
            <b-form @submit.stop.prevent>
    <label for="text-password">Legajo</label>
    <b-input type="password" v-model="medicoSearch" id="text-password" aria-describedby="password-help-block"></b-input>
   
   </b-form>
            
          </v-col>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click=" getMedico(medicoSearch)"
                        >Cerrar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
     
    </v-app>
  </div>
</template>
<script>
 import turnos from "../data/turnos.json";
// import admin from "../data/admin.json";
 import medicos from "../data/medicos.json";
// import pacientes from "../data/pacientes.json";

export default {
  data: function() {
    return {
      modalShow: true,
      medico : "vacio",
      medicos : medicos,
      medicoSearch : "",
      turnos: turnos
     

     
    };
  },

 
  computed: {

    // turnosFiltradas(){
    //   return this.turnos.filter(turnos => {
    //     return turnos.medicoId == this.medico.id;
    //   })
    // },
    pacientesFiltradas() {
      return this.pacientes.filter(pacientes => {
        let registroConcatenado = `${pacientes.nombre}${pacientes.apellido}${pacientes.dni}`;
        return registroConcatenado
          .toLowerCase()
          .includes(this.criterioDeBusquedaPacientes.toLowerCase());
      });
    }
    // turnosFiltradas() {
    //   return this.turnos.filter(turnos => {
    //     let registroConcatenado = `${turnos.dia}${turnos.hora}`;
    //     return registroConcatenado
    //       .toLowerCase()
    //       .includes(this.criterioBusquedaTurnos.toLowerCase());
    //   });
    // }
  },
  methods: {
    getNombreCompletoPaciente(pacientes) {
      return `${pacientes.nombre} ${pacientes.apellido}`;
    },
    getNombreCompletoMedico(medico) {
      return `${medico.nombre} ${medico.apellido}`;
    },
    turnosFiltradas(){
      return this.turnos.filter(turnos => {
        return turnos.medicoId == this.medico.id;
      })
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    getMedico(legajo) {
    this.axios.get('http://localhost:3000/medicos/' + legajo).then(response => (this.medico = response.data.data))
  if (this.medicoSearch != "" && this.medico != "vacio" ){
    this.modalShow = false
  }
    },
    showModalOk() {
      this.$refs["my-modal"].show();
    },
    // isLoginValid() {
    //   if (this.user == admin.usuario && this.password == admin.contraseña) {
    //     this.modalShow = false;
    //   }
    // }
  }
};
</script>

<style>
@import "../styles/pacientes.css";
</style>
