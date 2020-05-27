<template>
  <div>
    <transition appear name="fade">
      <b-container>
        <b-card class="bcard ">
          <div class="container_login">
            <b-img
              src="../images/logo2.png"
              fluid
              alt="Fluid image"
              width="250px"
            ></b-img>
            <div><h1>Formulario mantenimientos</h1></div>
          </div>
          <br />

          <b-form action="javascript:void(0)" @submit="asignar_mantenimiento">
            <b-form-group label="Motos en espera de mantenimiento" v-if="crear">
              <b-form-select
                class="form-control"
                v-model="mantenimiento.moto"
                :options="motos"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group label="Mecanico" label-for="mec">
              <b-form-select
                class="form-control"
                v-model="mantenimiento.mecanico"
                :options="mecanicos"
                required
              ></b-form-select>
            </b-form-group>
            <b-button
              block
              type="submit"
              variant="primary"
              class="submit-button"
              v-if="crear"
              >Asignar mantenimiento
              <b-icon icon="person-plus"></b-icon>
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
    </transition>
     <transition appear name="fade"> 
    <b-container>
      <div class="btnmostrar">
        <transition name="fade" mode="out-in">
          <b-button
            @click="mostrar_tabla()"
            variant="outline-primary"
            v-if="tabla"
            key="mant_tabl"
            >Ver más
            <b-icon icon="chevron-double-down"></b-icon>
          </b-button>
          <b-button
            @click="esconder_tabla()"
            variant="outline-primary"
            v-else
            key="mant_notabl"
            >Ver menos
            <b-icon icon="chevron-double-up"></b-icon>
          </b-button>
        </transition>
      </div>
    </b-container>
     </transition>
     <transition appear name="fade"> 
     
    <b-container>
      <div>
        <transition name="fade" mode="out-in">
          <b-container v-if="!tabla">
            <b-card class="bcard" v-if="!tabla">
              <b-table
                class="border border-dark text-center"
                responsive
                hover
                striped
                :items="lista_tabla"
                head-variant="primary"
                v-if="!tabla"
              >
                <template v-slot:cell(acciones)="row">
                  <div>
                    <!--    <b-button
              variant="outline-primary"
              size="sm"
              @click="cargar_usuario(row)"
              class="mr-2 acciones"
              ><b-icon icon="person-lines-fill"></b-icon> </b-button
            >-->
                    <b-button
                      variant="primary"
                      size="sm"
                      @click="eliminar_usuario(row)"
                      class="mr-2 acciones"
                      ><b-icon icon="trash"></b-icon
                    ></b-button>
                  </div>
                </template>
              </b-table>
            </b-card>
          </b-container>
        </transition>
      </div>
    </b-container>
     </transition>
  </div>
</template>

<script src="../assets/mantenimientos.js" />

<style>
.btnmostrar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
