<template>
  <div>
    <v-app>
      <div id="container">
        <H3>Seccion Administrador</H3>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Agregar Medico" active>
              <h1>Agregar medico</h1>
              <v-form ref="form" v-model="valid" lazy-validation>
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
                  @click="showModalOk "
                >
                  Validate
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset">
                  Reset Form
                </v-btn>
              </v-form>
            </b-tab>
            <b-tab title="Ver Estatisticas">
              <b-card-text>
                <div class="contenedorStatidisticas">
                  <p>Top de medicos con turnos</p>
                  <pure-vue-chart
                    :points="[1, 4, 5, 3, 4]"
                    :show-y-axis="false"
                    :show-x-axis="true"
                    :width="400"
                    :height="200"
                    :show-values="true"
                    :use-month-labels="true"
                    :months="[
                      'Jan',
                      'Fev',
                      'Mar',
                      'Abr',
                      'Mai',
                      'Jun',
                      'Jul',
                      'Ago',
                      'Set',
                      'Out',
                      'Nov',
                      'Dez'
                    ]"
                  />
                  <p>Top de pacientes con turnos</p>
                  <pure-vue-chart
                    :points="[1, 4, 5, 3, 4]"
                    :show-y-axis="false"
                    :show-x-axis="true"
                    :width="400"
                    :height="200"
                    :show-values="true"
                    :use-month-labels="true"
                    :months="[
                      'Jan',
                      'Fev',
                      'Mar',
                      'Abr',
                      'Mai',
                      'Jun',
                      'Jul',
                      'Ago',
                      'Set',
                      'Out',
                      'Nov',
                      'Dez'
                    ]"
                  />
                </div>
              </b-card-text>
            </b-tab>

            <!--Turnos -->

            <b-tab title="Ver turnos" active>
              <div
                class="col-md-3"
                v-for="turnos in turnosFiltradas"
                v-bind:key="turnos.id"
              >
                <v-card class="mx-auto" max-width="344" outlined>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">Turno {{turnos.id}}</div>
                      <v-list-item-title class="headline mb-1"
                        >Medico {{turnos.medicoId}} Paciente{{turnos.pacienteId}}</v-list-item-title
                      >
                      <v-list-item-subtitle
                        >{{turnos.dia}} {{turnos.hora}}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn text>Cancelar Turno</v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </b-tab>

            <!--Pacientes -->

            <b-tab title="Ver pacientes registrados" active>
              <b-input-group>
                <template v-slot:prepend>
                  <b-input-group-text>Busqueda</b-input-group-text>
                </template>
                <b-form-input
                  v-model="criterioDeBusquedaPacientes"
                ></b-form-input>
              </b-input-group>
              <h3
                class="tituloMedDisp"
                v-text="`${pacientesFiltradas.length} Pacientes registrados`"
              ></h3>

              <div
                class="col-md-3"
                v-for="pacientes in pacientesFiltradas"
                v-bind:key="pacientes.dni"
              >
                <v-card class="mx-auto" max-width="344" outlined>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">Dni {{ pacientes.dni }}</div>
                      <v-list-item-title class="headline mb-1"
                        >{{ pacientes.nombre }}
                        {{ pacientes.apellido }}</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        pacientes.email
                      }}</v-list-item-subtitle>
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

      <!-- Modal Ok -->
<b-modal ref="my-modal" hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
    </b-modal>

      <!--Modal Turnos -->
      <template>
        <v-row justify="center">
          <v-dialog v-model="modalShow" persistent max-width="600px">
            <v-card>
              <v-content>
                <h3>Log in</h3>
                <h4>{{ admin.usuario }}</h4>
                <input v-model="user" placeholder="Usuario" />
                <input v-model="password" placeholder="password" />
                <v-btn color="primary" :click="(modalShow = false)"
                  >Login</v-btn
                >
              </v-content>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-app>
  </div>
</template>
<script>
import turnos from "../data/turnos.json";
import admin from "../data/admin.json";
import medicos from "../data/medicos.json";
import pacientes from "../data/pacientes.json";
import PureVueChart from "pure-vue-chart";

export default {
  data: function() {
    return {
      modalShow: true,
      user: "",
      criterioDeBusquedaPacientes: "",
      criterioBusquedaMedicos: "",
      criterioBusquedaTurnos: "",
      //Registro medico
      nombreMedico: "",
     
      apellidoMedico: "",
      emailMedico: "",
      legajoMedico: "",
      ubicacionMedico: "",
      turnos: turnos,
      pacientes: pacientes,
      medicos: medicos,

      password: "",
      admin: admin
    };
  },
  components: {
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
    getDni(pacientes) {
      return `${pacientes.dni}`;
    },
     showModalOk() {
        this.$refs['my-modal'].show()
      },
    isLoginValid() {
      if (this.user == admin.usuario && this.password == admin.contraseña) {
        this.modalShow = false;
      }
    }
  }
};
</script>

<style></style>
