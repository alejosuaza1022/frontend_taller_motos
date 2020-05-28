<template>
  <div>
    <div>
      <b-modal
        id="modal-2"
        :header-bg-variant="model_header_color"
        :body-text-variant="model_tbody_color"
        header-text-variant="light"
        header-class="text-center"
        body-class="text-center"
        title="taller dice"
      >
        <h4>
          {{ message }}
        </h4>
        <template v-slot:modal-footer>
          <div class="w-200">
            <b-button
              variant="primary"
              size="sm"
              class="float-right"
              @click="aceptar"
            >
              Aceptar
            </b-button>
            <b-button
              variant="outline-primary"
              size="sm"
              class="float-md-right mg"
              @click="cancelar"
            >
              Cancelar
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
    <b-modal
      id="modal-1"
      :header-bg-variant="model_header_color"
      :body-text-variant="model_tbody_color"
      header-class="text-center"
      body-class="text-center"
      title="Taller dice"
      :ok-variant="colorOk"
      cancel-disabled
    >
      <h4>
        {{ message }}
      </h4>
    </b-modal>
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
            <div><h1>Formulario de motos</h1></div>
          </div>
          <br />

          <b-form action="javascript:void(0)" @submit="crear_moto">
            <b-form-group label="Placa" label-for="Placa" v-if="crear">
              <b-form-input
                class="form-control"
                v-bind:required="true"
                v-model="moto.placa"
                placeholder="Ingrese  Placa"
                id="Placa"
                @input="caracteres()"
              />
            </b-form-group>
            <b-form-group label="Estado" label-for="estado" v-if="!crear">
              <b-form-select
                class="form-control"
                v-model="moto.estado"
                :options="options"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group label="Clase" label-for="clase">
              <b-form-input
                class="form-control"
                type="text"
                v-bind:required="true"
                v-model="moto.clase"
                placeholder="Ingrese clase"
                id="clase"
              />
            </b-form-group>
            <b-form-group label="Marca" label-for="marca" v-if="crear">
              <b-form-input
                class="form-control"
                v-bind:required="true"
                v-model="moto.marca"
                placeholder="Ingrese marca"
                id="marca"
              />
            </b-form-group>
            <b-form-group label="Modelo" label-for="modelo" v-if="crear">
              <b-form-input
                class="form-control"
                v-bind:required="true"
                v-model="moto.modelo"
                placeholder="Ingrese modelo"
                id="modelo"
              />
            </b-form-group>

            <b-form-group label="Color" label-for="color">
              <b-form-input
                class="form-control"
                v-bind:required="true"
                v-model="moto.color"
                placeholder="Ingrese número color"
                id="cc"
              />
            </b-form-group>

            <b-form-group label="Cilindraje" label-for="cilindraje">
              <b-form-input
                class="form-control"
                v-bind:required="true"
                type="number"
                v-model="moto.cilindraje"
                placeholder="Ingrese cilindraje"
                id="cilindraje"
                @input="caracteres1()"
              />
            </b-form-group>

            <b-form-group label="Documento propetario" label-for="prop">
              <b-form-input
                class="form-control"
                v-model="moto.id_propietario"
                type="number"
                required
                placeholder="Ingrese documento"
                id="prop"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Número soat" label-for="nro_soat">
              <b-form-input
                class="form-control"
                type="number"
                v-bind:required="true"
                v-model="moto.nro_soat"
                id="nro_soat"
                placeholder="Ingrese número soat"
              />
            </b-form-group>
            <b-form-group
              label="Fecha vencimiento soat"
              label-for="vencimiento_soat"
            >
              <b-form-datepicker
                class="form-control"
                v-bind:required="true"
                v-model="moto.vencimiento_soat"
                id="vencimiento_soat"
                today-button
              />
            </b-form-group>
            <b-form-group
              label="Número tecnomecanica"
              label-for="nro_tecnomecanica"
            >
              <b-form-input
                class="form-control"
                type="number"
                v-bind:required="true"
                v-model="moto.nro_tecnomecanica"
                id="nro_tecnomecanica"
                placeholder="Ingrese su número tecnomecanica"
              />
            </b-form-group>
            <b-form-group
              label="Fecha vencimiento tecnomecanica"
              label-for="vencimiento_tecnomecanica"
            >
              <b-form-datepicker
                class="form-control left-align"
                v-bind:required="true"
                v-model="moto.vencimiento_tecnomecanica"
                id="vencimiento_tecnomecanica"
                today-button
                key=""
              />
            </b-form-group>
            <transition name="fade" mode="out-in">
              <b-button
                block
                type="submit"
                variant="primary"
                class="submit-button"
                v-if="crear"
                key="moto_cre"
                >Crear moto
                <b-icon icon="person-plus"></b-icon>
              </b-button>
              <b-button
                block
                type="submit"
                variant="primary"
                class="submit-button"
                v-else
                key="moto_up"
                >Actualizar moto
                <b-icon icon="pencil-square"></b-icon>
              </b-button>
            </transition>
            <transition name="fade">
              <b-button
                block
                variant="outline-primary"
                @click="cancel"
                v-if="!crear"
                key="p"
                >Cancelar</b-button
              >
            </transition>
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
              key="moto_tabla"
              >Ver más
              <b-icon icon="chevron-double-down"></b-icon>
            </b-button>
            <b-button
              @click="esconder_tabla()"
              variant="outline-primary"
              v-else
              key="moto_notabla"
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
          <transition name="fade">
            <b-container v-if="!tabla">
              <b-card class="bcard1" v-if="!tabla" responsive>
                <b-container class="btable">
                  <div class="overflow-auto">
                    <!--  <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                      aria-controls="my-table1"
                    ></b-pagination> -->
                    <b-table
                      sticky-header
                      class="border border-dark text-center mb-0"
                      responsive
                      hover
                      bordered
                      :fields="fields"
                      :items="lista_tabla"
                      v-if="!tabla"
                    >
                      <template v-slot:cell(acciones)="row">
                        <div>
                          <b-button
                            variant="outline-primary"
                            size="sm"
                            @click="cargar_moto(row)"
                            class="mr-2 acciones"
                            ><b-icon icon="person-lines-fill"></b-icon>
                          </b-button>
                        </div>
                      </template>
                    </b-table>
                  </div>
                </b-container>
              </b-card>
            </b-container>
          </transition>
        </div>
      </b-container>
    </transition>
  </div>
</template>

<script src="../assets/manejo_motos.js" />

<style>
.m {
  margin: auto;
  display: flex;
}
.btable {
  width: 98%;
}
.btnmostrar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 15px;
}
.mg {
  margin-right: 5px;
}
</style>
