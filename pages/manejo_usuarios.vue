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
        title="Taller dice"
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
      id="modal-3"
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

    <b-modal
      id="modal-1"
      header-bg-variant="primary"
      body-text-variant="dark"
      header-text-variant="light"
      header-class="text-center"
      body-class="text-center"
      title="Ver horas en rango de fechas"
      ok-only
    >
      <b-form-group label="Fecha inicio">
        <b-form-datepicker
          class="form-control left-align"
          v-bind:required="true"
          v-model="fechaini"
          id="fecha_ini"
          today-button
        />
      </b-form-group>
      <b-form-group label="Fecha fin">
        <b-form-datepicker
          class="form-control left-align"
          v-bind:required="true"
          v-model="fechafin"
          id="fecha_fin"
          today-button
        />
      </b-form-group>

      <b-button variant="outline-primary" size="sm" @click="calcular_pago">
        Calcular
      </b-button>
      <br />
      <b-form-group label="Total a horas:" class="m-3" v-if="bandera">
        <b-form-input
          class="form-control text-center"
          v-model="valor_hora"
          id="valor_hora"
          disabled
        />
      </b-form-group>
      <template v-slot:modal-footer>
        <b-button variant="primary" block class="float-center" @click="close">
          Cerrar
        </b-button>
      </template>
    </b-modal>
    <transition appear name="fade">
      <b-container>
        <b-card class="bcard">
          <div class="container_login">
            <b-img
              src="../images/logo2.png"
              fluid
              alt="Fluid image"
              width="250px"
            ></b-img>
            <div><h1>Formulario usuarios</h1></div>
          </div>
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
            <b-form-group
              label="Tipo documento"
              label-for="tipo_documento"
              v-if="crear"
            >
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
              <b-input-group class="mb-2 ">
                <b-form-input
                  class="form-control"
                  :type="password"
                  v-bind:required="true"
                  v-model="usuario.clave"
                  id="clave"
                  placeholder="Ingrese su clave"
                />

                <b-input-group-prepend is-text>
                  <b-icon
                    icon="eye-fill"
                    size="lg"
                    variant="primary"
                    @mouseenter="mostrar()"
                    @mouseleave="esconder()"
                    :scale="scale"
                  ></b-icon>
                </b-input-group-prepend>
              </b-input-group>
            </b-form-group>

            <transition name="fade" mode="out-in">
              <b-button
                block
                type="submit"
                variant="primary"
                class="submit-button"
                v-if="crear"
                key="cre"
                >Crear usuario
                <b-icon icon="person-plus"></b-icon>
              </b-button>

              <b-button
                block
                type="submit"
                variant="primary"
                class="submit-button"
                v-else
                key="upd"
                >Actualizar usuario
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
              key="save"
              >Ver más
              <b-icon icon="chevron-double-down"></b-icon>
            </b-button>
            <b-button
              @click="esconder_tabla()"
              variant="outline-primary"
              v-else
              key="edit"
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
              <b-card class="bcard1" v-if="!tabla">
                <b-table
                  class="border border-dark text-center"
                  responsive
                  bordered
                  sticky-header
                  hover
                  :fields="fields"
                  :items="lista_tabla"
                  v-if="!tabla"
                >
                  <template v-slot:cell(acciones)="row">
                    <div>
                      <b-button
                        variant="outline-primary"
                        size="sm"
                        @click="cargar_usuario(row)"
                        class="mr-2 acciones"
                        ><b-icon icon="person-lines-fill"></b-icon>
                      </b-button>
                      <b-button
                        variant="primary"
                        size="sm"
                        @click="eliminar_usuario(row)"
                        class="mr-2 acciones"
                        ><b-icon icon="trash"></b-icon
                      ></b-button>
                      <b-button
                        variant="outline-primary"
                        size="sm"
                        @click="abrir_modal(row)"
                        class="mr-2 acciones"
                        ><b-icon icon="clipboard-data"></b-icon
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

<script src="../assets/manejo_usuarios.js" />

<style>
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
