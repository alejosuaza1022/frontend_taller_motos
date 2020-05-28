<template>
  
   <div class="content">
     <transition appear name="fade"> 

    <b-container class="container2">
      <h1 class="title1">Pagina principal. <br>Bienvenido: {{nombre}}</h1>
     
     
    </b-container>
     </transition>
  </div>
</template>

<script>
export default {
    layout:"usuario",
    data() {
        return {
            nombre:''
        };
    },
    beforeMount(){
        this.nombre = JSON.parse(localStorage.getItem("Usuario")).nombre
    }


}
</script>

<style>
.container2 {
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
</style>