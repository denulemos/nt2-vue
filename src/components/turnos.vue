<template>
  <div id="app">
    <v-app>
      {{ form.horaMedico }}
      <div id="busqueda">
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
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="8">
            <div id="container">
              <h3 class="tituloMedDisp"></h3>
              <b-button
                variant="success"
                @click="modalUbicacionGeneralShow = true"
                >Ver mapa de todos los medicos</b-button
              >
              <!-- <b-button variant="warning"
                >¿Que medicos tengo cercanos?</b-button
              > -->
              <div class="card-deck">
                <div class="row">
                  <div
                    class="col-md-5"
                    v-for="medico in medicosFiltradas"
                    v-bind:key="medico.legajo"
                  >
                    <v-card class="mx-auto" max-width="344" outlined>
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div class="overline mb-4">
                            {{ medico.especialidad }}
                          </div>
                          <v-list-item-title
                            class="headline mb-1"
                            id="nombre"
                            >{{ getNombreCompleto(medico) }}</v-list-item-title
                          >
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
                            turnos.medicoId = medico.legajo;
                            especialidadModal = getEspecialidad(medico);
                            medicoSeleccion = medico.legajo;
                          "
                          v-if="medico.hayTurno"
                          >Reservar Turno</v-btn
                        >
                        <v-btn depressed small disabled v-else
                          >No hay turnos</v-btn
                        >
                        <v-btn
                          depressed
                          small
                          color="primary"
                          @click="
                            //modalUbicacionShow = true;
                            getLatitud(medico);
                            getLongitud(medico);
                          "
                          >Ubicacion</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="3" md="4">
            <iframe
              width="350"
              height="400"
              frameborder="0"
              style="border:0"
              :src="
                `https://www.google.com/maps/embed/v1/search?key=AIzaSyDSDU_29QYkLeBel6eA_7qygQ7A8M8bayk&q=${latitud},${longitud}`
              "
              allowfullscreen
            ></iframe>
          </v-col>
        </v-row>
      </v-container>

      <!--Modal Turnos -->
      <template>
        <v-row justify="center">
          <v-dialog v-model="modalShow" persistent max-width="685px">
            <v-card>
              <v-card-title class="tituloFormu">
                <span
                  >Está solicitando un turno para {{ especialidadModal }} con
                  {{ nombreModal }}
                </span>
              </v-card-title>

              <!-- <div>
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
                            >Buscar</b-button>
                           
                        </b-input-group-append>
                      </b-input-group>
                    </div> -->
              <div>
                <b-alert v-if="this.pacientes != null" variant="success" show>
                  {{ this.mensajeSaludo }}!</b-alert
                >

                <b-form
                  @submit="onSubmit"
                  @reset="onReset"
                  style="padding:20px"
                >
                  <b-form-group
                    id="input-group-1"
                    label="Dni:"
                    label-for="input-1"
                    description="En el caso de ya existir en sistema, se llenaran los campos automaticamente"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="busquedaPacientes"
                      type="text"
                      required
                      placeholder=""
                    ></b-form-input>
                  </b-form-group>
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
                      placeholder="Juan@email.com"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-2"
                    label="Nombre:"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="form.nombre"
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
                  </b-form-group>
                  <b-dropdown
                    text="Seleccionar turno deseado"
                    variant="success"
                  >
                    <b-dropdown-item
                      v-for="(v, i) in turnosFiltradas(medicoSeleccion)"
                      :key="i"
                      :value="i"
                      @click="
                        turno.fecha = v.fecha;
                        turno.horario = v.horario;
                      "
                      >{{ v.fecha }} {{ v.horario }}</b-dropdown-item
                    >
                  </b-dropdown>
                  <P
                    >Tomando turno para {{ turno.fecha }} {{ turno.horario }}
                  </P>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" dark text @click="modalShow = false"
                      >Cancelar</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="tomarTurno()"
                      >Confirmar</v-btn
                    >
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="buscarPaciente(busquedaPacientes)"
                      >Comprobar registro</v-btn
                    >
                  </v-card-actions>
                </b-form>
              </div>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <!--modal paciente -->
      <!-- <template>
   <div v-if="notLoggedOn">
              <v-row justify="center">
                <v-dialog
                  v-model="modalPacienteShow"
                  persistent
                  max-width="600px"
                >
               
                  <v-card>
                  <v-col >
                    <h5 style="text-align:center">¿Ya estas en sistema? Ingresa tu DNI</h5>  
            <b-form @submit.stop.prevent>
   
 
    <b-input type="text" id="password" v-model="dnipaciente" aria-describedby="password-help-block"></b-input>
   
   </b-form>
              <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        v-on:click="buscarPaciente(dnipaciente)"
                        >Ingresar</v-btn
                      >
                      
                    </v-card-actions>
                     <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="modalPacienteShow = false;"
                        >Continuar sin registro</v-btn
                      >
                    </v-card-actions>
          </v-col>
                  
                  </v-card>
                </v-dialog>
              </v-row>
              </div>
            </template> -->
      <!--Modal Ubicacion-->
      <template>
        <v-row justify="center">
          <v-dialog v-model="modalUbicacionShow" persistent max-width="600px">
            <v-card>
              <div style="overflow:hidden;width: 700px;position: relative;">
                <iframe
                  width="600"
                  height="450"
                  frameborder="0"
                  style="border:0"
                  :src="
                    `https://www.google.com/maps/embed/v1/search?key=AIzaSyDSDU_29QYkLeBel6eA_7qygQ7A8M8bayk&q=${latitud},${longitud}`
                  "
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
              <div style="overflow:hidden;width: 700px;position: relative;">
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
    </v-app>
  </div>
</template>

<script>
//import medicos from "../data/medicos.json";
// import turnos from "../data/turnos.json";
// import pacientes from "../data/pacientes.json";

export default {
  data: function() {
    return {
      medicos: "",
      turnos: "",
      medicoSeleccion: "",
      turno: {
        codigo: "Turno Mediturnos",
        fecha: "",
        horario: "",
        medicoId: "",
        pacienteId: "",
        id: Math.ceil(Math.random() * 10)
      },

      pacientes: null,
      latitud: -34.651819,
      dniPaciente: "-4",
      longitud: -58.440095,
      busquedaPacientes: "",
      pacienteEncontrado: null,
      listaEspecialidades: [],
      notLoggedOn: true,
      hayTurno: false, //Mostrar o no boton de reserva turnos
      criterioDeBusqueda: "",
      nombreModal: "",
      errored: false,
      registro : true,
      mensajeSaludo: "",
      modalPacienteShow: true,
      form: {
        email: "",
        name: "",
        apellido: "",
        horariosMedico: []
      },
      show: true,
      modalShow: false,
      modalUbicacionShow: false,
      modalUbicacionGeneralShow: false
    };
  },
  mounted: function() {
    this.axios.get("http://localhost:3000/medicos/").then(
      function(response) {
        this.medicos = response.data;
      }.bind(this)
    );
    this.axios.get("http://localhost:3000/turnos/").then(
      function(response) {
        this.turnos = response.data;
      }.bind(this)
    );
  },

  computed: {
    medicosFiltradas() {
      if (this.medicos != "") {
        return this.medicos.data.filter(medico => {
          let registroConcatenado = `${medico.nombre}${medico.apellido}${medico.legajo}${medico.especialidad}`;
          return registroConcatenado
            .toLowerCase()
            .includes(this.criterioDeBusqueda.toLowerCase());
        });
      } else {
        return null;
      }
    },
    legajosDistintos() {
      if (this.medicos != "") {
        return Array.from(new Set(this.medicos.data.map(p => p.legajo)));
      } else {
        return null;
      }
    },
    especialidadDistinta() {
      if (this.medicos != "") {
        return Array.from(new Set(this.medicos.data.map(p => p.especialidad)));
      } else {
        return null;
      }
    }
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },

    buscarPaciente(dnipaciente) {
      if (dnipaciente != "") {
        this.axios.get("http://localhost:3000/pacientes/" + dnipaciente).then(
          response => {
            (this.pacientes = response.data),
            this.registro = false,
              (this.form.nombre = this.pacientes.data.nombre),
              (this.form.email = this.pacientes.data.mail),
              (this.form.apellido = this.pacientes.data.apellido),
              (this.turnos.pacienteId = this.pacientes.data.dni),
              (this.mensajeSaludo = "Hola " + this.pacientes.data.nombre);
          },
          error => {
            this.mensajeSaludo =
              "No encontrado en sistema :( Confirmar si queres ser registrado bajo estos mismos datos " +
              error;
              this.registro = true; 
          }
        );
      }
    },

    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.horaMedico = null;
      this.form.diaMedico = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getNombreCompleto(medico) {
      return `${medico.nombre} ${medico.apellido}`;
    },
    getLatitud(medico) {
      this.latitud = `${medico.latitud}`;
    },
    getLongitud(medico) {
      this.longitud = `${medico.longitud}`;
    },

    turnosFiltradas(medicoSeleccion) {
      if (medicoSeleccion != "") {
        return this.turnos.data.filter(turnos => {
          return (
            turnos.medicoId == medicoSeleccion && turnos.pacienteId == null
          );
        });
      } else {
        return null;
      }
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
    tomarTurno() {
      if (this.registro){
        this.registrarUsuario()
      }
      this.axios.post('http://localhost:3000/turno',{
        codigo: this.turno.codigo,
        id : this.turno.id,
        fecha: this.turno.fecha,
        horario : this.turno.horario,
        medicoId : this.turno.medicoId,
        pacienteId : this.turno.pacienteId
      }).then(response =>{
        alert(response)
      }).catch(e => {
        alert(e)
      })

    },
    registrarUsuario(){
      this.axios.post('http://localhost:3000/paciente',{
        dni : this.busquedaPacientes,
        id : this.busquedaPacientes,
        nombre : this.form.nombre,
        apellido : this.form.apellido,
        mail : this.form.email
      }).then(response =>{
        alert(response)
      }).catch(e => {
        alert(e)
      })
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
