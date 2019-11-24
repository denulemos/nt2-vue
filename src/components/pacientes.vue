<template>
  <div>
    <v-app>
      <div id="container">
        <H3>Seccion Profesional</H3>
        <b-card no-body>
          <b-tabs card>
            <b-tab  title="Informacion Medico" active>
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
                <v-list-item-title class="title">Marcus Obrien</v-list-item-title>
                <v-list-item-subtitle>Network Engineer</v-list-item-subtitle>
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
      <li>Legajo</li>
      <li>Id en sistema</li>
      <li>Especialidad</li>
      <li>Email</li>
      <li>Cantidad de turnos totales</li>
      </ul>
    </v-col>
    </div>
            </b-tab>

            <!--Turnos -->
            <div class="card-deck">
              <div class="row">
                <b-tab title="Ver turnos propios" active>
                  <div class="row">
            <b-tab title="Ver turnos" active>
               <b-table striped hover  :items="turnos">
                

               </b-table>
           
            </b-tab>
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
                  <v-col cols="12" sm="6" md="4">
                    <p>Ingrese legajo para continuar </p>
            <v-text-field
              label="Solo"
              solo
              dense
              v-model="medicoSearch"
            ></v-text-field>
          </v-col>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="modalShow = false , getMedico(medicoSearch)"
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
      medico : null,
      medicos : medicos,
      medicoSearch : "",
      turnos: turnos
     
    };
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
    turnosFiltradas() {
      return this.turnos.filter(turnos => {
        let registroConcatenado = `${turnos.dia}${turnos.hora}`;
        return registroConcatenado
          .toLowerCase()
          .includes(this.criterioBusquedaTurnos.toLowerCase());
      });
    }
  },
  methods: {
    getNombreCompletoPaciente(pacientes) {
      return `${pacientes.nombre} ${pacientes.apellido}`;
    },
    getNombreCompletoMedico(medico) {
      return `${medico.nombre} ${medico.apellido}`;
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
  getMedico(legajo) {
    this.medico =  this.medicos.map(p => p.legajo === legajo);

      
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
