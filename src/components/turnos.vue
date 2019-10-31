<template>
  <div id="app">
    <v-app>
      <div id="container">
     <input
      type="text"
      class="form-control"
      v-model="criterioDeBusqueda"
      placeholder="Ingresar un criterio de busqueda..."
    />
     
    <br />
    <h2 v-text="`${medicosFiltradas.length} Medicos disponibles`"></h2>
    <!--<h5 v-text="`${legajosDistintos.length} legajos distintos`"></h5>-->

    
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
          color="grey"
        >
        <img src="../assets/medico.jpg"> 
        </v-list-item-avatar>

      </v-list-item>
  
      <v-card-actions >
         <v-btn depressed small color="success" @click="modalShow = true; nombreModal = getNombreCompleto(medico)"  v-if="medico.hayTurno">Reservar Turno</v-btn>
         <v-btn depressed small disabled v-else>No hay turnos</v-btn>
          <v-btn depressed small color="primary"   v-if="medico.hayTurno">Ver Ubicacion</v-btn>
        
       
      </v-card-actions>

      
    </v-card>
 
         

        </div>

<template>
  <v-row justify="center">
    <v-dialog v-model="modalShow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Está solicitando un turno para {{especialidadModal}} con {{nombreModal}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Nombre" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Apellido"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="DNI" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
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
          <v-btn color="blue darken-1" text @click="modalShow = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="modalShow = false">Confirmar</v-btn>
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

export default {
   
  data: function() {
    return {
      hayTurno: false, //Mostrar o no boton de reserva turnos
      criterioDeBusqueda: "",
      nombreModal : "",
 items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
     modalShow: false,
      medicos: [
        {
          nombre: "Juan Perez",
          apellido: "Test 1",
          legajo: 12345,
          especialidad: "Obstetra",
          foto: "../assets/medico.jpg",
          hayTurno: false
        },
        {
          nombre: "Pepe Perez",
          apellido: "Test 1",
          legajo: 12346,
          especialidad: "Clinico",
          foto: "../assets/medico.jpg",
          hayTurno: true
        },
         {
          nombre: "Deno Lemon",
          apellido: "Test 1",
          legajo: 12342,
          especialidad: "Dentista",
          foto: "../assets/medico.jpg",
          hayTurno: true
        },
         {
          nombre: "Elvis Cochuelo",
          apellido: "Test 1",
          legajo: 12341,
          especialidad: "Oftalmologo",
          foto: "../assets/medico.jpg",
          hayTurno: true
        },
         {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 12344,
          especialidad: "Otorrinonaringologo",
          foto: "../assets/medico.jpg",
          hayTurno: true
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 12340,
          especialidad: "Cardiologo",
          foto: '../assets/medico.jpg',
          hayTurno: false
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 12300,
          especialidad: "Ginecologo",
          foto: '../assets/medico.jpg',
          hayTurno: true
        },
        {
          nombre: "Medico",
          apellido: "Neurologo",
          legajo: 12311,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: false
        },
                {
          nombre: "Medico",
          apellido: "Neurologo",
          legajo: 12311,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: false
        },
                {
          nombre: "Medico",
          apellido: "Neurologo",
          legajo: 12311,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: false
        },
                {
          nombre: "Medico",
          apellido: "Neurologo",
          legajo: 12311,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: false
        },
                {
          nombre: "Medico",
          apellido: "Neurologo",
          legajo: 12311,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: false
        },
                {
          nombre: "Medico",
          apellido: "Neurologo",
          legajo: 12311,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: false
        },
        {
          nombre: "Medico",
          apellido: "Pediatra",
          legajo: 12333,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: true
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 12222,
          especialidad: "Psiquiatra",
          foto: '../assets/medico.jpg',
          hayTurno: false
        }
      ]
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
