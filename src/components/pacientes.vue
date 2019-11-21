<template>
  <div id="app">
    <div clas="container">
      <h1>Login medico</h1>
      <p>Ingrese su legajo para consultar sus turnos</p>
      </div>
  
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style>
@import "../styles/pacientes.css";
</style>
