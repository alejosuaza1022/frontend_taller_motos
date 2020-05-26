<template>
  <div class="content">
    <b-container class="container">
      <h1 class="title1">Gestión de evaluación</h1>
      <h2 class="subtitle text-center">
        Plataforma para todo lo referente a la evaluación de nuevas propuestas
        de publicación
      </h2>
      <b-button @click="login" variant="outline-primary">
        <b-icon icon="person-fill"></b-icon> Log in
      </b-button>
    </b-container>
  </div>
</template>

<script>
import { BIcon, BIconPersonCircle,BIconPersonFill } from "bootstrap-vue";
export default {
   components: {
    BIcon,
    BIconPersonCircle,
    BIconPersonFill
  },
  beforeMount() {},
  methods:{
    login(){
      this.$router.push("login")
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 50vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 100px 75px;
}

.title1 {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #0044ff;
  letter-spacing: 1px;
  border: black;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #0044ff;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
