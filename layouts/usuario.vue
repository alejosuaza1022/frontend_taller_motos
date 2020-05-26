<template>
  <div>
    <div>
      <b-navbar toggleable="md" type="dark" variant="primary" class="margin2">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">
          <div >
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'usuario_principal' }" class="margin1"
                ><b><i>Principal</i></b></b-nav-item
              >
              <b-nav-item :to="{ name: 'manejo_usuarios' }" class="margin1" v-if="bool"
                ><b><i>Manejo usuarios</i></b></b-nav-item
              >
              <b-nav-item :to="{ name: 'manejo_motos' }" class="margin1"
                ><b><i>Manejo motos</i></b></b-nav-item
              >
              <b-nav-item :to="{ name: 'mantenimientos' }" class="margin1" v-if="bool"
                ><b><i>Mantenimientos</i></b></b-nav-item
              >
              <b-nav-item :to="{ name: 'mantenimientos_mecanico' }" class="margin1" v-if="!bool"
                ><b><i>Mantenimientos</i></b></b-nav-item
              >
            </b-navbar-nav>
          </div>
          <b-button @click="log_out" variant="outline-light" class="mb-2 mgl">
            <b-icon icon="power" aria-hidden="true"></b-icon> Logout
          </b-button>
        </b-collapse>
      </b-navbar>
    </div>

    <nuxt />
  </div>
</template>

<script>
import { BIcon, BIconPower } from "bootstrap-vue";
export default {
  components: {
    BIcon,
    BIconPower
  },
  beforeMount() {
    let aux = JSON.parse(localStorage.getItem("Usuario")).rol;
    this.bool = aux === 2 ? true : false;
    console.log(aux, this.bool);
  },
  data() {
    return {
      bool: false
    };
  },
  methods: {
    log_out(){
      this.$router.push("/")
    }

  }
};
</script>

<style>
.dropdown-item:active {
  background: #dc3546;
}
.mgl{
  margin-left: auto;

}
.center1 {
  margin: auto;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.a :hover {
  background: #dc3546;
}
body {
  background-image: url("../images/img2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.bcard {
  margin-top: 15px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  -webkit-box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
  -moz-box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
  box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
}
.margin {
  margin-right: 20px;
}
.margin2 {
  margin-top: 20px;
}
.margin1{
   margin-right: 20px;
}
</style>
<!-- <div>
      <b-navbar toggleable="lg" type="dark" variant="danger">
        <b-navbar-brand href=".">Gestión de evaluación</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
           Right aligned nav items 
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Navegación" right>
              <b-dropdown-item class="a" href="revisionesNuevas"
                >publicaciones nuevas</b-dropdown-item
              >
              <b-dropdown-item class="a" href="infoEvaluadores?actu=1"
                >Actualizar info</b-dropdown-item
              >
              <b-dropdown-item class="a" href="evalPendientes"
                >Evaluaciones pendientes</b-dropdown-item
              >
              <b-dropdown-item class="a" href="/">log out</b-dropdown-item>
                            <b-dropdown-item class = "a"  href="notificacionAutor">notificaciones</b-dropdown-item>
              <b-dropdown-item class = "a"  href="evalPublicacion">evalPublicaion</b-dropdown-item>
              <b-dropdown-item class = "a"  href="documentos">Documentos</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>-->
