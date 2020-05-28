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
      <b-container fluid>
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
            <b-form-group label="Seleccione la asignación">
              <div class="btnmostrar">
                <b-select
                  text="hola"
                  v-model="selected"
                  @change="clic()"
                  class="bgcolor text-center"
                >
                  <option
                    class="text-center"
                    v-for="(item1, index) in drop"
                    :key="index"
                    :value="item1.value"
                  >
                    {{ item1.text }}
                  </option></b-select
                >
              </div>
            </b-form-group>
            <transition appear name="fade">
              <div v-if="selec">
                <b-form-group label="Número de horas" label-for="nro_soat">
                  <b-form-input
                    class="form-control"
                    type="number"
                    min="0"
                    v-model="horas"
                    v-bind:required="true"
                    id="nro_soat"
                    placeholder="Ingrese número de horas trabajadas"
                  />
                </b-form-group>

                <b-form-group label="Trabajos realizados">
                  <b-form-tags v-model="value" no-outer-focus class="mb-2">
                    <template
                      v-slot="{
                        tags,
                        inputAttrs,
                        inputHandlers,
                        addTag,
                        removeTag
                      }"
                    >
                      <b-input-group aria-controls="my-custom-tags-list">
                        <input
                          v-bind="inputAttrs"
                          v-on="inputHandlers"
                          placeholder="Presione enter o el botón, para agregar"
                          class="form-control"
                        />
                        <b-input-group-append>
                          <b-button @click="addTag()" variant="primary"
                            >Add</b-button
                          >
                        </b-input-group-append>
                      </b-input-group>
                      <ul
                        id="my-custom-tags-list"
                        class="list-unstyled d-inline-flex flex-wrap mb-0"
                        aria-live="polite"
                        aria-atomic="false"
                        aria-relevant="additions removals"
                      >
                        <!-- Always use the tag value as the :key, not the index! -->
                        <!-- Otherwise screen readers will not read the tag
               additions and removals correctly -->
                        <b-card
                          v-for="tag in tags"
                          :key="tag"
                          :id="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
                          tag="li"
                          class="mt-1 mr-1"
                          body-class="py-1 pr-2 text-nowrap"
                        >
                          <strong>{{ tag }}</strong>
                          <b-button
                            @click="removeTag(tag)"
                            variant="link"
                            size="sm"
                            :aria-controls="
                              `my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`
                            "
                            >remove</b-button
                          >
                        </b-card>
                      </ul>
                    </template>
                  </b-form-tags>
                </b-form-group>

                <b-button
                  block
                  type="submit"
                  variant="primary"
                  class="submit-button"
                  >Asignar mantenimiento
                  <b-icon icon="plus"></b-icon>
                </b-button>
              </div>
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
  </div>
</template>

<script src="../assets/mantenimientos_mecanico.js" />

<style>
.btnmostrar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
.bgcolor {
  border-style: solid;
  border-color: #b8e0fe;
  border-width: 2px;
  box-shadow: 4px 3px 20px 4px #b8e0fe;
}
.mg {
  margin-right: 5px;
}
</style>
