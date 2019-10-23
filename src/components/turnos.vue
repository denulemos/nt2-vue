<template>
  <div id="app">
     <input
      type="text"
      class="form-control"
      v-model="criterioDeBusqueda"
      placeholder="Ingresar un criterio de busqueda..."
    />
    
    <br />
    <h2 v-text="`${medicosFiltradas.length} Medicos disponibles`"></h2>
    <h5 v-text="`${legajosDistintos.length} legajos distintos`"></h5>

    
    <div class="card-deck">
      <div class="row">
        <div class="col" v-for="medico in medicosFiltradas" v-bind:key="medico">
 <v-card
      class="mx-auto"
      max-width="344"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{medico.especialidad}}</div>
          <v-list-item-title class="headline mb-1">{{getNombreCompleto(medico)}}</v-list-item-title>
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
         <v-btn small  v-if="medico.hayTurno">Reservar Turno</v-btn>
         <v-btn small  v-else>No hay turnos</v-btn>
        
       
      </v-card-actions>
    </v-card>

         

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   
  data: function() {
    return {
      hayTurno: false, //Mostrar o no boton de reserva turnos
      criterioDeBusqueda: "",
      items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
      medicos: [
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra",
          foto: "../assets/medico.jpg",
          hayTurno: false
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra",
          foto: "../assets/medico.jpg",
          hayTurno: true
        },
         {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra",
          foto: "../assets/medico.jpg",
          hayTurno: true
        },
         {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra",
          foto: "../assets/medico.jpg",
          hayTurno: true
        },
         {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra",
          foto: "../assets/medico.jpg",
          hayTurno: true
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: false
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: true
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: false
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra",
          foto: '../assets/medico.jpg',
          hayTurno: true
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra",
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
    }
  }
};
</script>
<style scoped>
.v-avatar{
  background: pink;
}
</style>