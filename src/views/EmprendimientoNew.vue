<template>
  <div class="contact-us section" id="contact">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="contact-us-content">
            <div class="row">
              <!-- FOTO con input debajo del iframe -->
              <div class="col-lg-4">
                <div id="map">
                  <img v-if="previewFoto" :src="previewFoto" id="fotoimg" width="100%" height="300"
                    style="border-radius: 10px; object-fit: cover;" />
                  <img v-else-if="fotografia" :src="'data:image/png;base64,' + fotografia" width="100%" height="300"
                    style="border-radius: 10px; object-fit: cover;" />
                  <img v-else src="https://emprendedores.biz/wp-content/uploads/2023/08/QEE-2.png" width="100%"
                    height="300" style="border-radius: 10px; object-fit: cover;" />

                </div>

                <h6 class="text-center">Haz clic en el cuadro de abajo para añadir la foto de tu emprendimiento. La foto
                  debe tener un tamaño máximo de 320x240 píxeles.</h6>
                <div class="input-with-icon">
                  <input ref="fileFoto" @change="cargarfoto" type="file"
                    accept="image/jpeg, image/jpg" class="form-control text-dark mt-2">

                  <!-- Botón de ayuda -->
                  <span class="help-icon" @mouseenter="showTooltipimagen = true" @mouseleave="hideOnLeave('imagen')"
                    @click.stop="toggleTooltip('imagen')" ref="tooltipIconimagen">❓</span>

                  <!-- Tooltip -->
                  <div v-if="showTooltipimagen" class="tooltip-box" ref="tooltipBoximagen"
                    @mouseenter="hoveringTooltipimagen = true" @mouseleave="hideOnLeave('imagen')">
                    Si su emprendimiento posee una imagen, de clic en este cuadro para cargar la foto de su
                    emprendimiento, caso contrario deje en blanco.
                    <div class="tooltip-arrow"></div>
                  </div>
                </div>
                <br>
                 <p v-if="Errorfoto" class="text-danger text-center">Si tienes problemas en añadir la foto puedes dar <a href="https://www.iloveimg.com/es/redimensionar-imagen" target="_blank">clic aquí</a>. Te llevará a una página donde podrás 
                 ajustar tu foto al tamaño solicitado. Si no deseas añadir la foto puedes dejar en blanco y dar clic en guardar</p>
              </div>

              <div class="col-lg-8">
                <form id="contact-form" action="" method="post">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="section-heading">
                        <h4 class="text-primary display-6 fw-bold mb-0">Registre <strong class="text-secondary"> su
                          </strong> Emprendimiento</h4>
                      </div>
                      &nbsp;&nbsp;
                      <h6 class="text-justify">Lea detenidamente los campos para que no tenga inconvenientes en el
                        llenado, si tiene dudas de como llenar, cada campo tiene este icono ❓ para que le de
                        información de como llenarlo</h6>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>

                    <!-- Campo RUC con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="text" inputmode="numeric" pattern="[0-12]{13}" maxlength="13"
                          @input="validateNumber" v-model="ruc" id="ruc" placeholder="RUC del emprendimiento..."
                          autocomplete="on" required>
                        <!-- Botón de ayuda (ícono chiquito) -->
                        <span class="help-icon" @mouseenter="showTooltipRuc = true" @mouseleave="hideOnLeave('ruc')"
                          @click.stop="toggleTooltip('ruc')" ref="tooltipIconRuc">❓</span>

                        <!-- Tooltip -->
                        <div v-if="showTooltipRuc" class="tooltip-box" ref="tooltipBoxRuc"
                          @mouseenter="hoveringTooltipRuc = true" @mouseleave="hideOnLeave('ruc')">
                          El RUC debe ser válido. Si no tiene, ingrese <b>0000000000000</b>, para que no le aparezca el mensaje de error
                          <!-- Flechita -->
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                      <p v-if="correoErrornueRucf" class="text-danger">El ruc debe tener 13 dígitos</p>
                    </div>
                    <!-- Campo Nombre con tooltip -->
                    <div class="col-lg-6 relative">

                      <div class="input-with-icon">
                        <input type="text" v-model="nombre_emprendimiento" id="nombre"
                          placeholder="Nombre del emprendimiento..." autocomplete="on" required>
                        <!-- Icono Nombre -->
                        <span class="help-icon" @mouseenter="showTooltipNombre = true"
                          @mouseleave="hideOnLeave('nombre')" @click.stop="toggleTooltip('nombre')"
                          ref="tooltipIconNombre">❓</span>

                        <!-- Tooltip Nombre -->
                        <div v-if="showTooltipNombre" class="tooltip-box tooltip-box-top" ref="tooltipBoxNombre"
                          @mouseenter="hoveringTooltipNombre = true" @mouseleave="hideOnLeave('nombre')">
                          Ingrese el nombre oficial de su emprendimiento.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo Tiempo con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="text" v-model="tiempo_emprendimiento" id="tiempo"
                          placeholder="Tiempo del emprendimiento..." autocomplete="on" required>
                        <!-- Icono tiempo -->
                        <span class="help-icon" @mouseenter="showTooltiptiempo = true"
                          @mouseleave="hideOnLeave('tiempo')" @click.stop="toggleTooltip('tiempo')"
                          ref="tooltipIcontiempo">❓</span>

                        <!-- Tooltip tiempo -->
                        <div v-if="showTooltiptiempo" class="tooltip-box" ref="tooltipBoxtiempo"
                          @mouseenter="hoveringTooltiptiempo = true" @mouseleave="hideOnLeave('tiempo')">
                          Debe ingresar el tiempo de creación que tiene su emprendimiento, por ejemplo: <b>2 años</b>.
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo Horario con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <select v-model="horarios_atencion" id="horario">
                          <option value="" disabled selected>Seleccione el horario de atención</option>
                          <option value="Lunes a Viernes: 08h00 - 12h00">Lunes a Viernes: 08h00 - 12h00</option>
                          <option value="Lunes a Viernes: 08h00 - 17h00">Lunes a Viernes: 08h00 - 17h00</option>
                          <option value="Lunes a Viernes: 09h00 - 18h00">Lunes a Viernes: 09h00 - 18h00</option>
                          <option value="Lunes a Viernes: 10h00 - 19h00">Lunes a Viernes: 10h00 - 19h00</option>
                          <option value="Lunes a Sábado: 08h00 - 17h00">Lunes a Sábado: 08h00 - 17h00</option>
                          <option value="Lunes a Sábado: 09h00 - 14h00">Lunes a Sábado: 09h00 - 14h00</option>
                          <option value="Lunes a Domingo: 09h00 - 13h00">Lunes a Domingo: 09h00 - 13h00</option>
                          <option value="Sábado: 08h00 - 12h00">Sábado: 08h00 - 12h00</option>
                          <option value="Sábado y Domingo: 10h00 - 16h00">Sábado y Domingo: 10h00 - 16h00</option>
                          <option value="24/7 - Atención todo el día">24/7 - Atención todo el día</option>
                          <option value="Horarios a conveniencia">Horarios a conveniencia</option>
                        </select>
                        <!-- Icono horario -->
                        <span class="help-icon" @mouseenter="showTooltiphorario = true"
                          @mouseleave="hideOnLeave('horario')" @click.stop="toggleTooltip('horario')"
                          ref="tooltipIconhorario">❓</span>

                        <!-- Tooltip horario -->
                        <div v-if="showTooltiphorario" class="tooltip-box tooltip-box-top" ref="tooltipBoxhorario"
                          @mouseenter="hoveringTooltiphorario = true" @mouseleave="hideOnLeave('horario')">
                          Debe seleccionar el horario de atención de su emprendimiento.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>

                    </div>
                    <!-- Campo Teléfono con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="text" v-model="telefono_contacto" id="telefono" inputmode="numeric"
                          pattern="[0-9]{10}" maxlength="10" @input="validateNumberT"
                          placeholder="Teléfono de contacto..." autocomplete="on" required>
                        <!-- Icono telefono -->
                        <span class="help-icon" @mouseenter="showTooltiptelefono = true"
                          @mouseleave="hideOnLeave('telefono')" @click.stop="toggleTooltip('telefono')"
                          ref="tooltipIcontelefono">❓</span>

                        <!-- Tooltip telefono -->
                        <div v-if="showTooltiptelefono" class="tooltip-box" ref="tooltipBoxtelefono"
                          @mouseenter="hoveringTooltiptelefono = true" @mouseleave="hideOnLeave('telefono')">
                          Debe ingresar el número de teléfono o celular de contacto del emprendimiento.
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                      <p v-if="correoErrornuetelf" class="text-danger">EL número de teléfono debe tener 10 dígitos</p>
                    </div>
                    <!-- Campo Email con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="email" v-model="email_contacto" id="email_contacto"  @input="validateEmail"
                          placeholder="Email del emprendimiento..." autocomplete="on" required>
                        <span class="help-icon" @mouseenter="showTooltipemail = true" @mouseleave="hideOnLeave('email')"
                          @click.stop="toggleTooltip('email')" ref="tooltipIconemail">❓</span>
                        <div v-if="showTooltipemail" class="tooltip-box tooltip-box-top" ref="tooltipBoxemail"
                          @mouseenter="hoveringTooltipemail = true" @mouseleave="hideOnLeave('email')">
                          Ingrese el correo electrónico oficial de contacto de su emprendimiento.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                      <p v-if="correoErrornue" class="text-danger">Por favor, ingrese un correo válido</p>
                    </div>
                    <!-- Campo Sitio Web con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="text" v-model="sitio_web" id="sitio_web"
                          placeholder="Sitio web del emprendimiento..." autocomplete="on" required>
                        <span class="help-icon" @mouseenter="showTooltipsitio = true" @mouseleave="hideOnLeave('sitio')"
                          @click.stop="toggleTooltip('sitio')" ref="tooltipIconsitio">❓</span>
                        <div v-if="showTooltipsitio" class="tooltip-box" ref="tooltipBoxsitio"
                          @mouseenter="hoveringTooltipsitio = true" @mouseleave="hideOnLeave('sitio')">
                          Coloque la dirección web de su emprendimiento, si no tiene ingrese <b>ninguno</b>.
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo Redes Sociales con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="text" v-model="redes_sociales" id="redes_sociales"
                          placeholder="Red social del emprendimiento..." autocomplete="on" required>
                        <span class="help-icon" @mouseenter="showTooltipredes = true" @mouseleave="hideOnLeave('redes')"
                          @click.stop="toggleTooltip('redes')" ref="tooltipIconredes">❓</span>
                        <div v-if="showTooltipredes" class="tooltip-box tooltip-box-top" ref="tooltipBoxredes"
                          @mouseenter="hoveringTooltipredes = true" @mouseleave="hideOnLeave('redes')">
                          Ingrese el enlace de una red social de su emprendimiento, recomendable que sea de Facebook.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>

                    <!-- Campo Descripción con tooltip -->
                    <div class="col-lg-12 relative">
                      <div class="input-with-icon">
                        <textarea rows="6" v-model="descripcion" id="descripcion"
                          placeholder="Describa su emprendimiento.." required></textarea>
                        <span class="help-icon" @mouseenter="showTooltipdescripcion = true"
                          @mouseleave="hideOnLeave('descripcion')" @click.stop="toggleTooltip('descripcion')"
                          ref="tooltipIcondescripcion">❓</span>
                        <div v-if="showTooltipdescripcion" class="tooltip-box tooltip-box-top"
                          ref="tooltipBoxdescripcion" @mouseenter="hoveringTooltipdescripcion = true"
                          @mouseleave="hideOnLeave('descripcion')">
                          Describa brevemente su emprendimiento, sus productos o servicios principales.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo Dirección con tooltip -->
                    <div class="col-lg-12 relative">
                      <div class="input-with-icon">
                        <textarea rows="6" v-model="direccion" id="direccion"
                          placeholder="Dirección del emprendimiento.." required></textarea>
                        <span class="help-icon" @mouseenter="showTooltipdireccion = true"
                          @mouseleave="hideOnLeave('direccion')" @click.stop="toggleTooltip('direccion')"
                          ref="tooltipIcondireccion">❓</span>
                        <div v-if="showTooltipdireccion" class="tooltip-box tooltip-box-top" ref="tooltipBoxdireccion"
                          @mouseenter="hoveringTooltipdireccion = true" @mouseleave="hideOnLeave('direccion')">
                          Indique la dirección exacta de su emprendimiento.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12" v-if="!correoErrornue && !correoErrornuetelf && !correoErrornueRucf">
                      <fieldset>
                        <button type="submit" v-on:click="guardar" id="form-submit" class="orange-button">Guardar
                          Datos</button>
                      </fieldset>
                    </div>
                  </div>
                </form>
                <div class="more-info">
                  <div class="row">

                    <div class="col-lg-12">
                      <div class="info-item">
                        <i class="fa fa-like"></i>
                        <h4 style="color:white" class="display-1">Registro Seguro</h4>
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
import script2 from '@/assets/scripts/scriptfunciones/save-emprendimi.js';
import { ref } from 'vue'
export default {

  mixins: [script2],
  data() {
    return {
      // Estado del tooltip RUC
      showTooltipRuc: false, hoveringTooltipRuc: false,
      // Estado del tooltip imagen
      showTooltipimagen: false, hoveringTooltipimagen: false,
      // Estado del tooltip tiempo
      showTooltiptiempo: false, hoveringTooltiptiempo: false,
      // Estado del tooltip Nombre
      showTooltipNombre: false, hoveringTooltipNombre: false,
      // Estado del tooltip horario
      showTooltiphorario: false, hoveringTooltiphorario: false,
      // Estado del tooltip telefono
      showTooltiptelefono: false, hoveringTooltiptelefono: false,
      // Estado del tooltip email
      showTooltipemail: false, hoveringTooltipemail: false,
      // Estado del tooltip sitio web
      showTooltipsitio: false, hoveringTooltipsitio: false,
      // Estado del tooltip redes sociales
      showTooltipredes: false, hoveringTooltipredes: false,
      // Estado del tooltip descripcion
      showTooltipdescripcion: false, hoveringTooltipdescripcion: false,
      // Estado del tooltip direccion
      showTooltipdireccion: false, hoveringTooltipdireccion: false,
      correoErrornue: false,
      correoErrornuetelf: false,
      correoErrornueRucf: false,
      

    };
  },
  methods: {
    toggleTooltip(field) {
      if (field === "ruc") this.showTooltipRuc = !this.showTooltipRuc;
      if (field === "imagen") this.showTooltipimagen = !this.showTooltipimagen;
      if (field === "nombre") this.showTooltipNombre = !this.showTooltipNombre;
      if (field === "horario") this.showTooltiphorario = !this.showTooltiphorario;
      if (field === "tiempo") this.showTooltiptiempo = !this.showTooltiptiempo;
      if (field === "telefono") this.showTooltiptelefono = !this.showTooltiptelefono;
      if (field === "email") this.showTooltipemail = !this.showTooltipemail;
      if (field === "sitio") this.showTooltipsitio = !this.showTooltipsitio;
      if (field === "redes") this.showTooltipredes = !this.showTooltipredes;
      if (field === "descripcion") this.showTooltipdescripcion = !this.showTooltipdescripcion;
      if (field === "direccion") this.showTooltipdireccion = !this.showTooltipdireccion;
    },
    hideOnLeave(field) {
      setTimeout(() => {
        if (field === "ruc" && !this.hoveringTooltipRuc) this.showTooltipRuc = false;
        if (field === "imagen" && !this.hoveringTooltipimagen) this.showTooltipimagen = false;
        if (field === "nombre" && !this.hoveringTooltipNombre) this.showTooltipNombre = false;
        if (field === "horario" && !this.hoveringTooltiphorario) this.showTooltiphorario = false;
        if (field === "tiempo" && !this.hoveringTooltiptiempo) this.showTooltiptiempo = false;
        if (field === "telefono" && !this.hoveringTooltiptelefono) this.showTooltiptelefono = false;
        if (field === "email" && !this.hoveringTooltipemail) this.showTooltipemail = false;
        if (field === "sitio" && !this.hoveringTooltipsitio) this.showTooltipsitio = false;
        if (field === "redes" && !this.hoveringTooltipredes) this.showTooltipredes = false;
        if (field === "descripcion" && !this.hoveringTooltipdescripcion) this.showTooltipdescripcion = false;
        if (field === "direccion" && !this.hoveringTooltipdireccion) this.showTooltipdireccion = false;
      }, 200);
    },
    handleClickOutside(event) {
      const refs = [
        ["tooltipIconRuc", "tooltipBoxRuc", "showTooltipRuc"],
        ["tooltipIconimagen", "tooltipBoximagen", "showTooltipimagen"],
        ["tooltipIconNombre", "tooltipBoxNombre", "showTooltipNombre"],
        ["tooltipIconhorario", "tooltipBoxhorario", "showTooltiphorario"],
        ["tooltipIcontiempo", "tooltipBoxtiempo", "showTooltiptiempo"],
        ["tooltipIcontelefono", "tooltipBoxtelefono", "showTooltiptelefono"],
        ["tooltipIconemail", "tooltipBoxemail", "showTooltipemail"],
        ["tooltipIconsitio", "tooltipBoxsitio", "showTooltipsitio"],
        ["tooltipIconredes", "tooltipBoxredes", "showTooltipredes"],
        ["tooltipIcondescripcion", "tooltipBoxdescripcion", "showTooltipdescripcion"],
        ["tooltipIcondireccion", "tooltipBoxdireccion", "showTooltipdireccion"],
      ];
      refs.forEach(([iconRef, boxRef, state]) => {
        const icon = this.$refs[iconRef];
        const box = this.$refs[boxRef];
        if (icon && box && !icon.contains(event.target) && !box.contains(event.target)) {
          this[state] = false;
        }
      });
    },
    validateNumber() {
      this.ruc = this.ruc.replace(/\D/g, '').slice(0, 13);
      if(this.ruc.length !== 13){
        this.correoErrornueRucf = true;
      } else {
        this.correoErrornueRucf = false;
      }
      
      
    },
    validateNumberT() {
      this.telefono_contacto = this.telefono_contacto.replace(/\D/g, '').slice(0, 10);
      if(this.telefono_contacto.length !== 10){
        this.correoErrornuetelf = true;
      } else {
        this.correoErrornuetelf = false;
      }
      
      
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email_contacto)) {
        this.correoErrornue = true;
      } else {
        this.correoErrornue = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>