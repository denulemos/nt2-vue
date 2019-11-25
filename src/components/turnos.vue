<template>
  <div id="app">
    <v-app>
      <div id="container">
        <div>
          <b-input-group>
            <template v-slot:prepend>
              <b-input-group-text>Busqueda</b-input-group-text>
            </template>
            <b-form-input v-model="criterioDeBusqueda"></b-form-input>

            <template v-slot:append>
              <b-dropdown text="Especialidad" variant="success">
                <b-dropdown-item
                  v-for="(v, i) in especialidadDistinta"
                  :key="i"
                  :value="i"
                  @click="criterioDeBusqueda = v"
                  >{{ v }}</b-dropdown-item
                >
              </b-dropdown>
            </template>
          </b-input-group>
        </div>
        <br />
        <h3
          class="tituloMedDisp"
          v-text="`${medicosFiltradas.length} Medicos disponibles`"
        ></h3>
        <b-button variant="success" @click="modalUbicacionGeneralShow = true"
          >Ver mapa de todos los medicos</b-button
        >
         <b-button variant="warning">¿Que medicos tengo cercanos?</b-button>
        <div class="card-deck">
          <div class="row">
            <div
              class="col-md-3"
              v-for="medico in medicosFiltradas"
              v-bind:key="medico.legajo"
            >
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">{{ medico.especialidad }}</div>
                    <v-list-item-title class="headline mb-1" id="nombre">{{
                      getNombreCompleto(medico)
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      >Legajo {{ medico.legajo }}</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-list-item-avatar tile size="80" color="grey">
                    <img src="../assets/medico.jpg" />
                  </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                  <v-btn
                    depressed
                    small
                    color="success"
                    @click="
                      modalShow = true;
                      nombreModal = getNombreCompleto(medico);
                      especialidadModal = getEspecialidad(medico);
                      form.horaMedico = getHoraMedico(medico);
                      form.diaMedico = getDiaMedico(medico);
                    "
                    v-if="medico.hayTurno"
                    >Reservar Turno</v-btn
                  >
                  <v-btn depressed small disabled v-else>No hay turnos</v-btn>
                  <v-btn
                    depressed
                    small
                    color="primary"
                    @click="modalUbicacionShow = true"
                    v-if="medico.hayTurno"
                    >Ubicacion</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>

            <!--Modal Turnos -->
            <template>
              <v-row justify="center">
                <v-dialog v-model="modalShow" persistent max-width="685px">
                  <v-card>
                    <v-card-title class="tituloFormu">
                      <span
                        >Está solicitando un turno para
                        {{ especialidadModal }} con {{ nombreModal }}</span
                      >
                    </v-card-title>
                    <div>
                      <b-input-group
                        class="mb-3"
                        prepend="¿Registrado? Ingresa tu DNI para autocompletar tus datos"
                      >
                        <b-form-input
                          v-model="busquedaPacientes"
                        ></b-form-input>
                        <b-input-group-append>
                          <b-button
                            size="sm"
                            text="Button"
                            variant="success"
                            :click="buscarPaciente(busquedaPacientes)"
                            >Buscar</b-button
                          >
                        </b-input-group-append>
                      </b-input-group>
                    </div>
                    <div>
                      <b-form
                        @submit="onSubmit"
                        @reset="onReset"
                        style="padding:25px"
                      >
                        <b-form-group
                          id="input-group-1"
                          label="Email:"
                          label-for="input-1"
                          description="Te enviaremos un mail de confirmacion de turno"
                        >
                          <b-form-input
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="Enter email"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group
                          id="input-group-2"
                          label="Nombre:"
                          label-for="input-2"
                        >
                          <b-form-input
                            id="input-2"
                            v-model="form.name"
                            required
                            placeholder="Juan"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group
                          id="input-group-3"
                          label="Apellido:"
                          label-for="input-2"
                        >
                          <b-form-input
                            id="input-2"
                            v-model="form.apellido"
                            required
                            placeholder="Perez"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group
                          id="input-group-4"
                          label="Dia:"
                          label-for="input-3"
                        >
                          <b-form-select
                            id="input-3"
                            v-model="form.diaMedico"
                            :options="diaMedico"
                            required
                          ></b-form-select>
                        </b-form-group>
                        <b-form-group
                          id="input-group-4"
                          label="Hora:"
                          label-for="input-3"
                        >
                          <b-form-select
                            id="input-3"
                            v-model="form.horaMedico"
                            :options="horaMedico"
                            required
                          ></b-form-select>
                        </b-form-group>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="error"
                            dark
                            text
                            @click="modalShow = false"
                            >Cancelar</v-btn
                          >
                          <v-btn
                            type="submit"
                            color="blue darken-1"
                            text
                            @click="modalShow = false"
                            >Confirmar</v-btn
                          >
                        </v-card-actions>
                      </b-form>
                    </div>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>

            <!--Modal Ubicacion-->
            <template>
              <v-row justify="center">
                <v-dialog
                  v-model="modalUbicacionShow"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <div
                      style="overflow:hidden;width: 700px;position: relative;"
                    >
                      <iframe
                        width="600"
                        height="450"
                        frameborder="0"
                        style="border:0"
                        src="https://www.google.com/maps/embed/v1/search?q=Famatina%204018%2C%20IOX%2C%20Buenos%20Aires%2C%20Argentina&key=AIzaSyDSDU_29QYkLeBel6eA_7qygQ7A8M8bayk"
                        allowfullscreen
                      ></iframe>
                    </div>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="modalUbicacionShow = false"
                        >Cerrar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>

            <!-- Ubicacion general -->
            <template>
              <v-row justify="center">
                <v-dialog
                  v-model="modalUbicacionGeneralShow"
                  persistent
                  max-width="639px"
                >
                  <v-card>
                    <div
                      style="overflow:hidden;width: 700px;position: relative;"
                    >
                      <iframe
                        src="https://www.google.com/maps/d/embed?mid=1x3Ey31iQ-Y5en0LLUFT-a_3rtKlWRYy2"
                        width="640"
                        height="480"
                      ></iframe>
                    </div>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="modalUbicacionGeneralShow = false"
                        >Cerrar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
          </div>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
import medicos from "../data/medicos.json";
import turnos from "../data/turnos.json";
import pacientes from "../data/pacientes.json";
// import axios from 'axios';
// import VueAxios from 'vue-axios';
export default {
  data: function() {
    return {
      medicos: medicos,
      turnos: turnos,
      pacientes: pacientes,
      busquedaPacientes: "",
      pacienteEncontrado: null,
      listaEspecialidades: [],
      hayTurno: false, //Mostrar o no boton de reserva turnos
      criterioDeBusqueda: "",
      nombreModal: "",
      form: {
        email: "",
        name: "",
        apellido: "",
        checked: [],
        horaMedico: [],
        diaMedico: []
      },
      show: true,
      modalShow: false,
      modalUbicacionShow: false,
      modalUbicacionGeneralShow: false
    };
  },


  created: {
  
    medicosFiltradas() {
     
      return this.medicos.filter(medico => {
        let registroConcatenado = `${medico.nombre}${medico.apellido}${medico.legajo}${medico.especialidad}`;
     return registroConcatenado
         .toLowerCase()
          .includes(this.criterioDeBusqueda.toLowerCase());
      });
    },
    legajosDistintos() {
      return Array.from(new Set(this.medicos.map(p => p.legajo)));
    },
    especialidadDistinta() {
      return Array.from(new Set(this.medicos.map(p => p.especialidad)));
    }
  },

  


  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.horaMedico = null;
      this.form.diaMedico = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getNombreCompleto(medico) {
      return `${medico.nombre} ${medico.apellido}`;
    },
    getHoraMedico(medico) {
      return Array.from(
        new Set(this.turnos.map(p => p.medicoId === medico.id))
      );
    },
    getDiaMedico(medico) {
      return Array.from(
        new Set(this.turnos.map(p => p.medicoId === medico.id))
      );
    },
    getEspecialidad(medico) {
      return `${medico.especialidad}`;
    },
    showModal() {
      this.$root.$emit("bv::show::modal", "modal-1", "#btnShow");
    },
    hideModal() {
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");
    },
    buscarPaciente(busquedaPacientes) {
      this.pacienteEncontrado = this.pacientes.filter(
        d => d.dni === busquedaPacientes
      );
      this.busquedaPacientes = "";
    },
    
    toggleModal() {
      this.$root.$emit("bv::toggle::modal", "modal-1", "#btnToggle");
    }
  }
};
</script>

<style>
@import "../styles/turnos.css";
</style>
