<template>
  <div id="app">
    
  <div id="login">
    <div id="description">
      <h1>Login</h1>
      <p>By logging in you agree to the ridiculously long terms that you didn't bother to read.</p>
    </div>
    <div id="form">
      <form @submit.prevent="doLogin">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email" placeholder="me@example.com" autocomplete="off">

        <label for="password">Password</label>&nbsp;
        <i class="fas" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
        <input :type="passwordType" id="password" v-model="password" placeholder="**********">

        <button type="submit">Log in</button>
      </form>
    </div>
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
