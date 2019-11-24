<template>
  <div>
    <v-app>
      <div id="container">
        <H3>Seccion Administrador</H3>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Informacion Medico" active>
              <h1>Informacion Medico</h1>
              
            </b-tab>
          
          

            <!--Turnos -->
<div class="card-deck">
          <div class="row">
            <b-tab title="Ver turnos propios" active>
               <b-table sticky-header striped hover  :items="turnos">
                

               </b-table>
           
            </b-tab>
          </div></div>
            <!--Pacientes -->

          </b-tabs>
        </b-card>
      </div>

      <!-- Modal Ok -->
<b-modal ref="my-modal" hide-footer >
      <div class="d-block text-center">
        <img class="medicoOk" src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_640.png">
        <h2>Medico agregado con exito!</h2>
      </div>
      
     
   
    </b-modal>

     
      
    </v-app>
  </div>
</template>
<script>
import turnos from "../data/turnos.json";
import admin from "../data/admin.json";
import medicos from "../data/medicos.json";
import pacientes from "../data/pacientes.json";


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
        this.$refs['my-modal'].hide()
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

<style>
@import "../styles/administrador.css";
</style>
