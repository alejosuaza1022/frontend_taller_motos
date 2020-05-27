<template>
  <div>
    <b-modal
      id="modal-1"
      :header-bg-variant="model_header_color"
      :body-text-variant="model_tbody_color"
      header-class="text-center"
      body-class="text-center"
      title="Udem dice"
      ok-only
    >
      <h4>
        {{ message }}
      </h4>
    </b-modal>
     <transition appear name="fade"> 

    <b-container>
     
      <b-card class="bcard mgrlog ">
        
        <b-form @submit="login">
          <b-form-group
            id="input-group-1"
            label="Numero de identificación:"
            label-for="input-1"
          >
          <b-input-group class="mb-2" >
            <b-input-group-prepend is-text>
                <b-icon icon="person-fill" size="lg" variant="primary" scale="2" ></b-icon>
              </b-input-group-prepend>
            <b-form-input
              id="input-1"
              v-model="usuario.id"
              type="text"
              required
              placeholder="Ingrese Documento"
            ></b-form-input>
             </b-input-group>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Clave"
            label-for="input-2"
          >
            <b-input-group class="mb-2 " >
              <b-input-group-prepend is-text>
                <b-icon icon="person-fill" ></b-icon>
              </b-input-group-prepend>
              <b-form-input
                id="input-2"
                v-model="usuario.clave"
                required
                type="password"
                placeholder="Ingrese Clave"
              >
              </b-form-input>
            </b-input-group>
          </b-form-group>
          <b-button @click="login()" block variant="primary">Log in
               <b-icon icon="forward-fill"></b-icon> 
          </b-button>
        </b-form>
      </b-card>
    </b-container>
     </transition>
  </div>
</template>

<script src="../assets/login.js" />

<style>
.bg1 {
  background-color: #a6d7fdcb;
}

.mgrlog {
  margin-top: 100px;
}

</style>
