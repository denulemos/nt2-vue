<template>
  <div id="app">
    <v-app>
      <div id="container">

<v-col class="d-flex" cols="10" sm="12">
     <!--Input Busqueda medicos -->
     <input type="text" class="form-control" v-model="criterioDeBusqueda" placeholder="Ingresar un criterio de busqueda..." />
     
     <v-col class="d-flex" cols="12" sm="6">
          <v-select
            :items="especialidades"
            label="Especialidades"
            outlined
            v-model="criterioDeBusqueda"
          ></v-select>
        </v-col>
</v-col>
    
     
    <br />
    <h2 v-text="`${medicosFiltradas.length} Medicos disponibles`"></h2>
    
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
         <v-btn depressed small color="success" @click="modalShow = true; nombreModal = getNombreCompleto(medico)"  v-if="medico.hayTurno">Reservar Turno</v-btn>
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
        <v-card-text>
          <v-container>
            <v-row>
              <h5>Nombre</h5>
         
               <b-form-input v-model="text" required placeholder="Julia"></b-form-input>
           
               <h5>Apellido</h5>
             
               <b-form-input v-model="text" required placeholder="Lopez"></b-form-input>
           
             <h5>DNI</h5>
            
               <b-form-input v-model="text" required placeholder="12345678"></b-form-input>
              
               <h5>Email Valido</h5>
             
               <b-form-input v-model="text" required placeholder="Julia@gmail.com"></b-form-input>
             <hr>
              <hr>
               <hr>              <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Fecha"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Hora"
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  color="blue darken-1" text @click="modalShow = false">Cancelar</v-btn>
          <v-btn type="submit" color="blue darken-1" text @click="modalShow = false">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<!--Modal Ubicacion-->
<template>
  <v-row justify="center">
    <v-dialog v-model="modalUbicacionShow" persistent max-width="600px">
      <v-card>
       <div class="mapouter"><div class="gmap_canvas">
         <iframe width="398" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
         </div>
      
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="modalUbicacionShow = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="modalUbicacionShow = false">Confirmar</v-btn>
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
    especialidades: ['Clinico', 'Dentista', 'Fizz', 'Buzz'],
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
    }
  },
  methods: {
    getEspecialidades(){
      axios.get('../data/especialidades.json').then(response => (this.listaEspecialidades = response.data));
    },
    getNombreCompleto(medico) {
      return `${medico.nombre} ${medico.apellido}`;
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
