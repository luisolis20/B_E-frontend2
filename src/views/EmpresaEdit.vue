<template>
    <div class="contact-us section" id="contact">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="contact-us-content">
            <div class="row">
              <div class="col-lg-4">
                <div id="map">
                  <iframe
                    src="https://images.adsttc.com/media/images/5129/02b8/b3fc/4b11/a700/5a54/large_jpg/1291668435-1285857452-2-768x1000.jpg?1414301378"
                    width="100%" height="670px" frameborder="0" style="border:0; border-radius: 23px;overflow: hidden;" scrolling="no"
                    ></iframe>
                </div>
              </div>
              <div class="col-lg-8">
                <form id="contact-form" action="" method="post">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="section-heading">
                        <h4 class="text-primary display-6 fw-bold mb-0">Actualice<strong class="text-secondary"> su </strong>Empresa</h4>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="name" v-model="ruc" id="nombre" placeholder="Ruc de la empresa..." autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="name" v-model="nombre" id="nombre" placeholder="Nombre de la empresa..." autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="name" v-model="ciudad" id="ciudad" placeholder="Ingrese la ciudad..."
                          autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="name" v-model="pais" id="pais" placeholder="Ingrese el país..."
                          autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="tel" v-model="telefono" id="telefono" placeholder="Teléfono..."
                          required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="address" v-model="direccion" id="direccion" placeholder="Ingrese la dirección..." autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="address" v-model="emailempre" id="emailempre" placeholder="Email de la empresa..." autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="address" v-model="urlempre" id="urlempre" placeholder="Url de la empresa..." autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="address" v-model="titulorepre" id="titulorepre" placeholder="Título del Representante..." autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="address" v-model="nombrerepre" id="nombrerepre" placeholder="Nombre del Representante..." autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="address" v-model="cargorepre" id="cargorepre" placeholder="Cargo del Representante..." autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-6">
                      <fieldset>
                        <input type="address" v-model="tipo_empre" id="tipo_empre" placeholder="Tipo de Empresa..." autocomplete="on" required>
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <textarea rows="6" v-model="mision" id="mision" placeholder="Ingrese la misión de la empresa.." required></textarea>
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <textarea rows="6" v-model="vision" id="vision" placeholder="Ingrese la visión de la empresa.." required></textarea>
                      </fieldset>
                    </div>
                    <div class="col-lg-12">
                      <fieldset>
                        <button type="submit" v-on:click="actualizar" id="form-submit" class="orange-button">Actualizar</button>
                      </fieldset>
                    </div>
                  </div>
                </form>
                <div class="more-info">
                    <div class="row">
                        
                        <div class="col-lg-12">
                            <div class="info-item">
                                <i class="fa fa-like"></i>
                                <h4 style="color:white" class="display-1">Actualización Segura</h4>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  @import url('@/assets/styles/styles.css');
  
</style>
<script>
  import script2 from '@/assets/scripts/scriptfunciones/edit-empre.js';

  export default {
    mixins: [script2],
  };
</script>