<template>
  <div id="app">
    <input
      type="text"
      class="form-control"
      v-model="criterioDeBusqueda"
      placeholder="Ingresar un criterio de busqueda..."
    />
    <br />
    <h2 v-text="`${medicosFiltradas.length} resultados`"></h2>
    <h5 v-text="`${legajosDistintos.length} legajos distintos`"></h5>
    <div class="card-deck">
      <div class="row">
        <div class="col" v-for="medico in medicosFiltradas">
          <div class="card mb-3">
            <div>
              <div class="card-body">
                <h5 class="card-title">{{getNombreCompleto(medico)}}</h5>
                <p class="card-text">Legajo {{medico.legajo}}</p>
                <a href="#" class="card-link">{{medico.especialidad}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      criterioDeBusqueda: "",
      medicos: [
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra"
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra"
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra"
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra"
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra"
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra"
        },
        {
          nombre: "Medico",
          apellido: "Test 1",
          legajo: 123456789,
          especialidad: "Obstetra"
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
