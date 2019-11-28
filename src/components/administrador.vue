<template>
  <div>
    <v-app>
      <div id="container">
        <H3 style="  font-family: 'Roboto Slab'">Seccion Administrador</H3>
        <b-card no-body>
          <b-tabs card>
            <!-- <b-tab title="Agregar Medico" active>
             
              
              <h1 style="background-color: antiquewhite; text-align: center">Agregar medico</h1>
              <v-form ref="form" v-model="valid" lazy-validation style="padding:50px">
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
<br/>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="showModalOk"
                >
                  Agregar
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset">
                  Resetear Formulario
                </v-btn>
              </v-form>
            </b-tab> -->

            <!--Turnos -->
            <div class="card-deck">
              <div class="row" style="margin-left:25px; margin-right:18px;">
                <b-tab title="Ver turnos" active>
                  <b-table
                    striped
                    hover
                    :items="turnosFiltradas"
                    selectable
                    v-model= this.selected
                    :select-mode="selectMode"
                    @row-selected="onRowSelected"
                    responsive="sm"
                  >
                  </b-table>
                  <!-- TESTING -->
                  <!-- <p>
                    Selected Rows:<br />
                    {{ selected }}
                   
                  </p> -->

                  <b-button style="position: center" @click=" showAvisoOk" v-if="selected != []" variant="danger">Eliminar turno seleccionado</b-button>
                </b-tab>
              </div>
            </div>

                    <b-tab title="Ver Pacientes registrados" active>
              <b-input-group>
                <template v-slot:prepend>
                  <b-input-group-text >Busqueda</b-input-group-text>
                </template>
                <b-form-input
                  v-model="criterioDeBusquedaMedicos"
                ></b-form-input>
              </b-input-group>
              <br />
              <h3
              style="  font-family: 'Roboto Slab'"
                class="tituloMedDisp"
                v-text="`${pacientesFiltradas.length} Pacientes registrados`"
              ></h3>
              <br />
               
              <b-table striped hover :items="pacientesFiltradas"> </b-table>
            </b-tab>
            <!--Pacientes -->

            <b-tab title="Ver medicos en Sistema" active>
              <b-input-group>
                <template v-slot:prepend>
                  <b-input-group-text>Busqueda</b-input-group-text>
                </template>
                <b-form-input
                  v-model="criterioDeBusquedaPacientes"
                ></b-form-input>
              </b-input-group>
              <br />
              <h3
              style="  font-family: 'Roboto Slab'"
                class="tituloMedDisp"
                v-text="`${medicosFiltradas.length} medicos registrados`"
              ></h3>
              <br />
               
              <b-table striped hover :items="medicosFiltradas"> </b-table>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>

  <template>
              <v-row justify="center">
                <v-dialog
                  v-model="modalAdminShow"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                  <v-col >
                    <h5 style="text-align:center">Ingreso Administrador</h5>  
            <b-form @submit.stop.prevent>
    <label for="text-password">Password Administrador</label>
 
    <b-input type="password" id="password" v-model="password" aria-describedby="password-help-block"></b-input>
   
   </b-form>
              <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="isLoginValid(password)"
                        >Ingresar</v-btn
                      >
                    </v-card-actions>
          </v-col>
                  
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
      <!-- Modal Ok -->
      <b-modal ref="my-modal" hide-footer>
        <div class="d-block text-center">
          <img
            class="medicoOk animated bounce"
            src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_640.png"
          />
          <h2>Medico agregado con exito!</h2>
        </div>
      </b-modal>
      <!-- Modal eliminacion medico --> 
       <b-modal ref="my-modal-aviso" hide-footer>
        <div class="d-block text-center">
          <img
            class="medicoOk animated bounce"
            src="../assets/atencion.png"
          />
          <br/>
           <br/>
          <h2>Estas por eliminar el turno ID {{selected.id}}, continuar?</h2>
          <br/>
           <v-btn
                        color="blue darken-1"
                        text
                        v-on:click ="eliminarTurno(selected.id)"
                        >Continuar</v-btn
                      >
                  
          
        </div>
      </b-modal>
    </v-app>
  </div>
</template>
<script>


export default {
  data: function() {
    return {
      modalShow: true,
      user: "",
    
      modalAdminShow : true,
      criterioDeBusquedaPacientes: "",
      criterioBusquedaMedicos: "",
      criterioBusquedaTurnos: "",
      //Registro medico
      nombreMedico: "",
      apellidoMedico: "",
      emailMedico: "",
      selected: "",
      legajoMedico: "",
      mensajeExito: "",
      ubicacionMedico: "",
      turnos: "",
      pacientes: "",
      medicos: "",
      password: "",
      validPassword: "test"
    };
  },

mounted(){
     this.axios.get('http://localhost:3000/turnos/',{
      }).then(response =>{
        this.turnos = response.data;
      }).catch(e => {
        alert(e)
      })
      this.axios.get('http://localhost:3000/pacientes/',{ })
      .then(response =>{
        this.pacientes = response.data;
      }).catch(e => {
        alert(e)
      })
      this.axios.get('http://localhost:3000/medicos/',{ })
      .then(response =>{
        this.medicos = response.data;
      }).catch(e => {
        alert(e)
      })
},
  computed: {
    pacientesFiltradas() {
      if (this.pacientes != ""){
         return this.pacientes.data.filter(pacientes => {
        let registroConcatenado = `${pacientes.nombre}${pacientes.apellido}${pacientes.dni}`;
        return registroConcatenado
          .toLowerCase()
          .includes(this.criterioDeBusquedaPacientes.toLowerCase());
      });
      }
      else{
        return null
      }
     
    },
   
   medicosFiltradas() {
      if (this.medicos != ""){
         return this.medicos.data.filter(medicos => {
        let registroConcatenado = `${medicos.nombre}${medicos.apellido}${medicos.legajo}`;
        return registroConcatenado
          .toLowerCase()
          .includes(this.criterioDeBusquedaPacientes.toLowerCase());
      });
      }
      else{
        return null
      }
     
    },
    turnosFiltradas() {
      if (this.turnos != ""){
        return Array.from(new Set(this.turnos.data.filter(turnos => {
        let registroConcatenado = `${turnos.dia}${turnos.hora}`;
        return registroConcatenado
          .toLowerCase()
          .includes(this.criterioBusquedaTurnos.toLowerCase());
      })));
      }
      else{
        return null
      }
      
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
    onRowSelected(turnos) {
      this.selected = turnos;
    },
    getDni(pacientes) {
      return `${pacientes.dni}`;
    },
    showModalOk() {
      this.$refs["my-modal"].show();
    },
    showAvisoOk(){
       this.$refs["my-modal-aviso"].show();
    },
   eliminarTurno(id) {
     if (id != "" && id != undefined){
        this.axios.delete('http://localhost:3000/turno/' + id,{
      }).then(response =>{
        alert(response)
      }).catch(e => {
        alert(e)
      })
     }
     

    },
    
    isLoginValid(password) {
      if (password == this.validPassword) {
        this.modalAdminShow = false;
      }

    }
  }
};
</script>

<style>
@import "../styles/administrador.css";
</style>
