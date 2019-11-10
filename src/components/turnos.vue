<template>
  <div id="app">
    <v-app>
      <div id="container">
<div>
 <b-input-group>
    <template v-slot:prepend>
      <b-input-group-text >Busqueda</b-input-group-text>
    </template>
    <b-form-input v-model="criterioDeBusqueda"></b-form-input>

    <template v-slot:append>
      <b-dropdown  text="Especialidad" variant="success">
        <b-dropdown-item  v-for="(v , i)  in especialidadDistinta" v-bind:key="i"  v-model="criterioDeBusqueda" v-text="`${v}`">1 </b-dropdown-item>
      </b-dropdown> 
    </template>
  </b-input-group>
</div>
    <br />
    <h2 class="tituloMedDisp" v-text="`${medicosFiltradas.length} Medicos disponibles`"></h2>
   
    
    <div class="card-deck">
      <div class="row">
        <div class="col-md-3" v-for="medico in medicosFiltradas" v-bind:key="medico.legajo">
     <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{medico.especialidad}}</div>
          <v-list-item-title class="headline mb-1" id="nombre">{{getNombreCompleto(medico)}}</v-list-item-title>
          <v-list-item-subtitle>Legajo {{medico.legajo}}</v-list-item-subtitle>
        </v-list-item-content>
  
        <v-list-item-avatar
          tile 
          size="80"
          color="grey">
        <img src="../assets/medico.jpg"> 
        </v-list-item-avatar>

      </v-list-item>
  
      <v-card-actions >
         <v-btn depressed small color="success" @click="modalShow = true; nombreModal = getNombreCompleto(medico); especialidadModal = getEspecialidad(medico)"  v-if="medico.hayTurno">Reservar Turno</v-btn>
         <v-btn depressed small disabled v-else>No hay turnos</v-btn>
          <v-btn depressed small color="primary"  @click="modalUbicacionShow = true" v-if="medico.hayTurno">Ver Ubicacion</v-btn>
        
       
      </v-card-actions>

      
    </v-card>
 
         

        </div>

<!--Modal Turnos -->
<template>
  <v-row justify="center">
    <v-dialog v-model="modalShow" persistent max-width="600px">
      <v-card>
        <v-card-title class="tituloFormu">
          <span >Está solicitando un turno para {{especialidadModal}} con {{nombreModal}}</span>
        </v-card-title>
       
        <div>
    <b-form @submit="onSubmit" @reset="onReset"  style="padding:30px">
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

      <b-form-group id="input-group-2" label="Nombre:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Juan"
        ></b-form-input>
      </b-form-group>
         <b-form-group id="input-group-3" label="Apellido:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.apellido"
          required
          placeholder="Perez"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Dia:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>
       <b-form-group id="input-group-4" label="Hora:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>


      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="blue darken-1" text @click="modalShow = false">Cancelar</v-btn>
          <v-btn type="submit" color="blue darken-1" text @click="modalShow = false">Confirmar</v-btn>
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
    <v-dialog v-model="modalUbicacionShow" persistent max-width="600px">
      <v-card>
      <div style="overflow:hidden;width: 700px;position: relative;"><iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/search?q=Famatina%204018%2C%20IOX%2C%20Buenos%20Aires%2C%20Argentina&key=AIzaSyBf09cFcLx6LjeOc57t0epUd4C36VJRCws" allowfullscreen></iframe>

         </div>
      
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="modalUbicacionShow = false">Cerrar</v-btn>
         
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

 import medicos from '../data/medicos.json';
 import axios from 'axios';

export default {
  data: function() {
    return {
    medicos : medicos,
    listaEspecialidades: [],
    hayTurno: false, //Mostrar o no boton de reserva turnos
    criterioDeBusqueda: "",
    nombreModal : "",
      form: {
          email: '',
          name: '',
          apellido: '',
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
   
    modalShow: false,
    modalUbicacionShow:false
    };
  },
  computed: {
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
    especialidadDistinta(){
      return Array.from(new Set(this.medicos.map(p => p.especialidad)));
    }
  },
  methods: {
     onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
    getEspecialidades(){
      axios.get('../data/especialidades.json').then(response => (this.listaEspecialidades = response.data));
    },
    getNombreCompleto(medico) {
      return `${medico.nombre} ${medico.apellido}`;
    },
    getEspecialidad(medico){
      return `${medico.especialidad}`;
    },
    showModal() {
      this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
    toggleModal() {
      this.$root.$emit('bv::toggle::modal', 'modal-1', '#btnToggle')
    
  }
  }
};
</script>

<style >
@import '../styles/turnos.css';

</style>
