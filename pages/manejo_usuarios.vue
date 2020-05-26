<template>
  <div>
    <b-container>
      <b-card class="bcard ">
        <h1>Formulario de usuarios</h1>
        <br />

        <b-form action="javascript:void(0)" @submit="crear_usuario">
          <b-form-group label="Documento" label-for="Documento" v-if="crear">
            <b-form-input
              class="form-control"
              type="number"
              v-bind:required="true"
              v-model="usuario.documento"
              placeholder="Ingrese  documento"
              id="documento"
              
            />
          </b-form-group>
          <b-form-group label="Tipo documento" label-for="tipo_documento" v-if="crear">
            <b-form-select
              class="form-control"
              v-model="usuario.tipo_documento"
              :options="options"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Nombre" label-for="nombre">
            <b-form-input
              class="form-control"
              type="text"
              v-bind:required="true"
              v-model="usuario.nombre"
              placeholder="Ingrese nombre"
              id="nombre"
            />
          </b-form-group>
          <b-form-group label="Apellidos" label-for="apellido">
            <b-form-input
              class="form-control"
              v-bind:required="true"
              v-model="usuario.apellidos"
              placeholder="Ingrese apellidos"
              id="apellido"
            />
          </b-form-group>

          <b-form-group label="Celular" label-for="cc">
            <b-form-input
              class="form-control"
              v-bind:required="true"
              v-model="usuario.celular"
              type="number"
              placeholder="Ingrese número celular"
              id="cc"
            />
          </b-form-group>

          <b-form-group label="Correo" label-for="email">
            <b-form-input
              class="form-control"
              v-bind:required="true"
              type="email"
              v-model="usuario.correo"
              placeholder="Ingrese correo"
              id="email"
            />
          </b-form-group>

          <b-form-group label="Rol" label-for="rol">
            <b-form-select
              class="form-control"
              v-model="usuario.rol"
              :options="roles"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group label="Clave" label-for="clave" v-if="crear">
            <b-form-input
              class="form-control"
              type="password"
              v-bind:required="true"
              v-model="usuario.clave"
              id="clave"
              placeholder="Ingrese su clave"
            />
          </b-form-group>

          <b-button block type="submit" variant="primary" class="submit-button" v-if="crear"
            >Crear usuario
            <b-icon icon="person-plus"></b-icon>
          </b-button>
             <b-button block type="submit" variant="primary" class="submit-button" v-else
            >Actualizar usuario
            <b-icon icon="pencil-square"></b-icon>
          </b-button>

          <!-- <b-button
          @click="actualizarEvaluador()"
          variant="danger"
          v-else
          class="submit-button"
          >Actualizar evaluador</b-button
        >-->
        </b-form>
      </b-card>
    </b-container>
    <div class="btnmostrar">
      <b-button @click="mostrar_tabla()" variant="outline-primary" v-if="tabla"
        >Ver más
        <b-icon icon="chevron-double-down"></b-icon>
      </b-button>
        <b-button @click="esconder_tabla()" variant="outline-primary" v-else
        >Ver menos
        <b-icon icon="chevron-double-up"></b-icon>
      </b-button>
    </div>
    <div >
        <b-container v-if="!tabla">
        <b-card class="bcard" v-if="!tabla">
      <b-table
        class="border border-dark text-center"
        responsive
        hover
         striped
        :fields="fields"
        :items="lista_tabla"
        head-variant="primary"
        v-if="!tabla"
      >
        <template v-slot:cell(acciones)="row">
          <div>
            <b-button
              variant="outline-primary"
              size="sm"
              @click="cargar_usuario(row)"
              class="mr-2 acciones"
              ><b-icon icon="person-lines-fill"></b-icon> </b-button
            >
            <b-button
              variant="primary"
              size="sm"
              @click="eliminar_usuario(row)"
              class="mr-2 acciones"
              ><b-icon icon="trash"></b-icon></b-button
            >
          </div>
        </template>
      </b-table>
        </b-card>
        </b-container>
    </div>
  </div>
</template>

<script src="../assets/manejo_usuarios.js" />

<style>

.btnmostrar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
