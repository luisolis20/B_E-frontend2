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
                  <img v-else
                    src="https://www.gob.ec/sites/default/files/styles/gobec_image_content/public/2019-09/SR_3.png.jpeg?itok=MI5zsSAT"
                    width="100%" height="300" style="border-radius: 10px; object-fit: cover;" />

                </div>

                <h6 class="text-center">Haz clic en el cuadro de abajo para añadir la foto de tu emprendimiento. La foto
                  debe tener un tamaño máximo de 320x240 píxeles.</h6>
                <div class="input-with-icon">
                  <input ref="fileFoto" @change="cargarfoto" type="file" accept="image/jpeg, image/jpg"
                    class="form-control text-dark mt-2">

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
                <p v-if="Errorfoto" class="text-danger text-center">Si tienes problemas en añadir la foto puedes dar <a
                    href="https://www.iloveimg.com/es/redimensionar-imagen" target="_blank">clic aquí</a>. Te llevará a
                  una página donde podrás
                  ajustar tu foto al tamaño solicitado. Si no deseas añadir la foto puedes dejar en blanco y dar clic en
                  guardar</p>
              </div>
              <div class="col-lg-8">
                <form id="contact-form" action="" method="post">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="section-heading">
                        <h4 class="text-primary display-6 fw-bold mb-0">Registre <strong class="text-secondary"> su
                          </strong> Empresa</h4>
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
                          @input="validateNumber" v-model="ruc" id="ruc" placeholder="RUC de la empresa..."
                          autocomplete="on" required>
                        <!-- Botón de ayuda (ícono chiquito) -->
                        <span class="help-icon" @mouseenter="showTooltipRuc = true" @mouseleave="hideOnLeave('ruc')"
                          @click.stop="toggleTooltip('ruc')" ref="tooltipIconRuc">❓</span>

                        <!-- Tooltip -->
                        <div v-if="showTooltipRuc" class="tooltip-box" ref="tooltipBoxRuc"
                          @mouseenter="hoveringTooltipRuc = true" @mouseleave="hideOnLeave('ruc')">
                          El RUC debe ser válido. Si no tiene, ingrese <b>0000000000000</b>, para que no le aparezca el
                          mensaje de error
                          <!-- Flechita -->
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                      <p v-if="correoErrornueRucf" class="text-danger">El ruc debe tener 13 dígitos</p>
                    </div>
                    <!-- Campo empresacorta con tooltip -->
                    <div class="col-lg-6 relative">

                      <div class="input-with-icon">
                        <input type="text" v-model="empresacorta" id="empresacorta"
                          placeholder="Nombre de la empresa..." autocomplete="on" required>
                        <!-- Icono empresacorta -->
                        <span class="help-icon" @mouseenter="showTooltipempresacorta = true"
                          @mouseleave="hideOnLeave('empresacorta')" @click.stop="toggleTooltip('empresacorta')"
                          ref="tooltipIconempresacorta">❓</span>

                        <!-- Tooltip empresacorta -->
                        <div v-if="showTooltipempresacorta" class="tooltip-box tooltip-box-top"
                          ref="tooltipBoxempresacorta" @mouseenter="hoveringTooltipempresacorta = true"
                          @mouseleave="hideOnLeave('empresacorta')">
                          Ingrese el nombre oficial de su empresa.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo pais con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <select v-model="pais" id="pais">
                          <option value="Ecuador" disabled selected>Ecuador</option>

                        </select>
                        <!-- Botón de ayuda (ícono chiquito) -->
                        <span class="help-icon" @mouseenter="showTooltippais = true" @mouseleave="hideOnLeave('pais')"
                          @click.stop="toggleTooltip('pais')" ref="tooltipIconpais">❓</span>

                        <!-- Tooltip -->
                        <div v-if="showTooltippais" class="tooltip-box" ref="tooltipBoxpais"
                          @mouseenter="hoveringTooltippais = true" @mouseleave="hideOnLeave('pais')">
                          Por defecto el país seleccionado es Ecuador
                          <!-- Flechita -->
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo Tipoe con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <select v-model="tipo" id="tipo">
                          <option value="" disabled selected>Seleccione el tipo</option>
                          <option value="Vinculación">Vinculación</option>
                          <option value="Pública">Pública</option>
                          <option value="Pre-Profesionales">Pre-Profesionales</option>
                          <option value="Organización sin Fines de Lucro">Organización sin Fines de Lucro</option>
                          <option value="Laborales">Laborales</option>


                        </select>
                        <!-- Botón de ayuda (ícono chiquito) -->
                        <span class="help-icon" @mouseenter="showTooltiptipo = true" @mouseleave="hideOnLeave('tipo')"
                          @click.stop="toggleTooltip('tipo')" ref="tooltipIcontipo">❓</span>

                        <!-- Tooltip -->
                        <div v-if="showTooltiptipo" class="tooltip-box tooltip-box-top" ref="tooltipBoxtipo"
                          @mouseenter="hoveringTooltiptipo = true" @mouseleave="hideOnLeave('tipo')">
                          Debe seleccionar si la empresa es para tipo: <b>Pre-profesional, Vinculación, Laborales</b>
                          <!-- Flechita -->
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo ciudad con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <select v-model="ciudad" id="ciudad">
                          <option value="" disabled selected>Seleccione la ciudad</option>
                          <option value="Alausí">Alausí</option>
                          <option value="Ambato">Ambato</option>
                          <option value="Babahoyo">Babahoyo</option>
                          <option value="Bahía de Caráquez">Bahía de Caráquez</option>
                          <option value="Balzar">Balzar</option>
                          <option value="Baños de Agua Santa">Baños de Agua Santa</option>
                          <option value="Cayambe">Cayambe</option>
                          <option value="Catamayo">Catamayo</option>
                          <option value="Chone">Chone</option>
                          <option value="Cuenca">Cuenca</option>
                          <option value="Daule">Daule</option>
                          <option value="Durán">Durán</option>
                          <option value="El Pangui">El Pangui</option>
                          <option value="El Triunfo">El Triunfo</option>
                          <option value="Esmeraldas">Esmeraldas</option>
                          <option value="Francisco de Orellana (Coca)">Francisco de Orellana (Coca)</option>
                          <option value="Guano">Guano</option>
                          <option value="Guaranda">Guaranda</option>
                          <option value="Guayaquil">Guayaquil</option>
                          <option value="Huaquillas">Huaquillas</option>
                          <option value="Ibarra">Ibarra</option>
                          <option value="Jipijapa">Jipijapa</option>
                          <option value="Joya de los Sachas">Joya de los Sachas</option>
                          <option value="La Libertad">La Libertad</option>
                          <option value="Latacunga">Latacunga</option>
                          <option value="Loja">Loja</option>
                          <option value="Macas">Macas</option>
                          <option value="Machala">Machala</option>
                          <option value="Manta">Manta</option>
                          <option value="Milagro">Milagro</option>
                          <option value="Mocache">Mocache</option>
                          <option value="Montalvo">Montalvo</option>
                          <option value="Naranjal">Naranjal</option>
                          <option value="Naranjito">Naranjito</option>
                          <option value="Nueva Loja (Lago Agrio)">Nueva Loja (Lago Agrio)</option>
                          <option value="Otavalo">Otavalo</option>
                          <option value="Pasaje">Pasaje</option>
                          <option value="Pedro Carbo">Pedro Carbo</option>
                          <option value="Pelileo">Pelileo</option>
                          <option value="Playas (General Villamil)">Playas (General Villamil)</option>
                          <option value="Portoviejo">Portoviejo</option>
                          <option value="Pujilí">Pujilí</option>
                          <option value="Puyo">Puyo</option>
                          <option value="Quevedo">Quevedo</option>
                          <option value="Quito">Quito</option>
                          <option value="Riobamba">Riobamba</option>
                          <option value="Salinas">Salinas</option>
                          <option value="San Gabriel">San Gabriel</option>
                          <option value="Santa Elena">Santa Elena</option>
                          <option value="Santa Rosa">Santa Rosa</option>
                          <option value="Santo Domingo">Santo Domingo</option>
                          <option value="Saquisilí">Saquisilí</option>
                          <option value="Shushufindi">Shushufindi</option>
                          <option value="Tena">Tena</option>
                          <option value="Tulcán">Tulcán</option>
                          <option value="Valencia">Valencia</option>
                          <option value="Vinces">Vinces</option>
                          <option value="Yantzaza">Yantzaza</option>
                          <option value="Zamora">Zamora</option>

                        </select>
                        <!-- Botón de ayuda (ícono chiquito) -->
                        <span class="help-icon" @mouseenter="showTooltipciudad = true"
                          @mouseleave="hideOnLeave('ciudad')" @click.stop="toggleTooltip('ciudad')"
                          ref="tooltipIconciudad">❓</span>

                        <!-- Tooltip -->
                        <div v-if="showTooltipciudad" class="tooltip-box" ref="tooltipBoxciudad"
                          @mouseenter="hoveringTooltipciudad = true" @mouseleave="hideOnLeave('ciudad')">
                          Seleccione la ciudad de origen de la empresa
                          <!-- Flechita -->
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                    </div>

                    <!-- Campo Teléfono con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="text" v-model="telefono" id="telefono" inputmode="numeric" pattern="[0-9]{10}"
                          maxlength="10" @input="validateNumberT" placeholder="Teléfono de contacto..."
                          autocomplete="on" required>
                        <!-- Icono telefono -->
                        <span class="help-icon" @mouseenter="showTooltiptelefono = true"
                          @mouseleave="hideOnLeave('telefono')" @click.stop="toggleTooltip('telefono')"
                          ref="tooltipIcontelefono">❓</span>

                        <!-- Tooltip telefono -->
                        <div v-if="showTooltiptelefono" class="tooltip-box tooltip-box-top" ref="tooltipBoxtelefono"
                          @mouseenter="hoveringTooltiptelefono = true" @mouseleave="hideOnLeave('telefono')">
                          Debe ingresar el número de teléfono o celular de contacto del emprendimiento.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                      <p v-if="correoErrornuetelf" class="text-danger">EL número de teléfono debe tener 10 dígitos</p>
                    </div>


                    <!-- Campo Email con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="email" v-model="emailempre" id="emailempre" @input="validateEmail"
                          placeholder="Correo electrónico de la empresa..." autocomplete="on" required>
                        <span class="help-icon" @mouseenter="showTooltipemail = true"
                          @mouseleave="hideOnLeave('emailempre')" @click.stop="toggleTooltip('emailempre')"
                          ref="tooltipIconemail">❓</span>
                        <div v-if="showTooltipemail" class="tooltip-box" ref="tooltipBoxemail"
                          @mouseenter="hoveringTooltipemail = true" @mouseleave="hideOnLeave('emailempre')">
                          Ingrese el correo electrónico oficial de contacto de su empresa.
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                      <p v-if="correoErrornue" class="text-danger">Por favor, ingrese un correo válido</p>
                    </div>

                    <!-- Campo Sitio Web con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="text" v-model="urlempre" id="urlempre" placeholder="Sitio web de la empresa..."
                          autocomplete="on" required>
                        <span class="help-icon" @mouseenter="showTooltipurlempre = true"
                          @mouseleave="hideOnLeave('urlempre')" @click.stop="toggleTooltip('urlempre')"
                          ref="tooltipIconurlempre">❓</span>
                        <div v-if="showTooltipurlempre" class="tooltip-box tooltip-box-top" ref="tooltipBoxurlempre"
                          @mouseenter="hoveringTooltipurlempre = true" @mouseleave="hideOnLeave('urlempre')">
                          Coloque la dirección web de su empresa, si no tiene ingrese <b>ninguno</b>.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo ciudad con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <select v-model="titulorepre" id="titulorepre">
                          <option value="" disabled selected>Seleccione la título del representante</option>
                          <option value="Sr.">Sr.</option>
                          <option value="Sra.">Sra.</option>
                          <option value="Srta.">Srta.</option>
                          <option value="Mx.">Mx. (neutral)</option>
                          <option value="Ingeniero">Ingeniero</option>
                          <option value="Ingeniera">Ingeniera</option>
                          <option value="Licenciado">Licenciado</option>
                          <option value="Licenciada">Licenciada</option>
                          <option value="Médico">Médico</option>
                          <option value="Médica">Médica</option>
                          <option value="Arquitecto">Arquitecto</option>
                          <option value="Arquitecta">Arquitecta</option>
                          <option value="Abogado">Abogado</option>
                          <option value="Abogada">Abogada</option>
                          <option value="Economista">Economista</option>
                          <option value="Economista">Economista</option>
                          <option value="Enfermero">Enfermero</option>
                          <option value="Enfermera">Enfermera</option>
                          <option value="Profesor">Profesor</option>
                          <option value="Profesora">Profesora</option>
                          <option value="Docente">Docente (neutral)</option>
                          <option value="Tecnólogo">Tecnólogo</option>
                          <option value="Tecnóloga">Tecnóloga</option>
                          <option value="Magíster (M)">Magíster</option>
                          <option value="Magíster (F)">Magíster</option>
                          <option value="MBA">MBA</option>
                          <option value="Especialista (M)">Especialista</option>
                          <option value="Especialista (F)">Especialista</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Doctora">Doctora</option>
                          <option value="PhD (neutral)">PhD</option>
                          <option value="Posdoctor">Posdoctor</option>
                          <option value="Posdoctora">Posdoctora</option>
                          <option value="Otro">Otro</option>

                        </select>
                        <!-- Botón de ayuda (ícono chiquito) -->
                        <span class="help-icon" @mouseenter="showTooltiptitulorepre = true"
                          @mouseleave="hideOnLeave('titulorepre')" @click.stop="toggleTooltip('titulorepre')"
                          ref="tooltipIcontitulorepre">❓</span>

                        <!-- Tooltip -->
                        <div v-if="showTooltiptitulorepre" class="tooltip-box" ref="tooltipBoxtitulorepre"
                          @mouseenter="hoveringTooltiptitulorepre = true" @mouseleave="hideOnLeave('titulorepre')">
                          Seleccione el titulo del representante de la empresa.
                          <!-- Flechita -->
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo nombrerepre con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="text" v-model="nombrerepre" id="nombrerepre"
                          placeholder="Nombres y Apellidos del representante..." autocomplete="on" required>
                        <span class="help-icon" @mouseenter="showTooltipnombrerepre = true"
                          @mouseleave="hideOnLeave('nombrerepre')" @click.stop="toggleTooltip('nombrerepre')"
                          ref="tooltipIconnombrerepre">❓</span>
                        <div v-if="showTooltipnombrerepre" class="tooltip-box tooltip-box-top"
                          ref="tooltipBoxnombrerepre" @mouseenter="hoveringTooltipnombrerepre = true"
                          @mouseleave="hideOnLeave('nombrerepre')">
                          Ingrese los nombres y apellidos del representante de la empresa.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo cargo con tooltip -->
                    <div class="col-lg-6 relative">

                      <div class="input-with-icon">
                        <input type="text" v-model="cargorepre" id="cargorepre" placeholder="Cargo del Representante..."
                          autocomplete="on" required>
                        <!-- Icono cargo -->
                        <span class="help-icon" @mouseenter="showTooltipcargorepre = true"
                          @mouseleave="hideOnLeave('cargorepre')" @click.stop="toggleTooltip('cargorepre')"
                          ref="tooltipIconcargorepre">❓</span>

                        <!-- Tooltip cargo -->
                        <div v-if="showTooltipcargorepre" class="tooltip-box" ref="tooltipBoxcargorepre"
                          @mouseenter="hoveringTooltipcargorepre = true" @mouseleave="hideOnLeave('cargorepre')">
                          Ingrese el cargo que tiene el representante de la empresa.
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo actividad con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <select v-model="actividad" id="actividad">
                          <option value="" disabled selected>Seleccione la actividad</option>
                          <option value="Venta">Venta</option>
                          <option value="Turismo">Turismo</option>
                          <option value="Servicios Turísticos">Servicios Turísticos</option>
                          <option value="Servicios Sociales">Servicios Sociales</option>
                          <option value="Servicios Petroleros">Servicios Petroleros</option>
                          <option value="Servicios Pecuarios">Servicios Pecuarios</option>
                          <option value="Servicios Empresariales">Servicios Empresariales</option>
                          <option value="Servicios">Servicios</option>
                          <option value="Servicio Público">Servicio Público</option>
                          <option value="Servicio Eléctrico">Servicio Eléctrico</option>
                          <option value="Servicio Comunitario">Servicio Comunitario</option>
                          <option value="Servicio Ciudadano/a">Servicio Ciudadano/a</option>
                          <option value="Salud Pública">Salud Pública</option>
                          <option value="Salud">Salud</option>
                          <option value="Reciclaje">Reciclaje</option>
                          <option value="Prácticas Preprofesionales">Prácticas Preprofesionales</option>
                          <option value="Prácticas de Servicio Comunitario (Vinculación)">Prácticas de Servicio
                            Comunitario (Vinculación)</option>
                          <option value="Protección de los derechos de los niños y adolescentes">Protección de los
                            derechos de los niños y adolescentes</option>
                          <option value="Protección de los derechos ciudadanos">Protección de los derechos ciudadanos
                          </option>
                          <option value="Producción y comercialización">Producción y comercialización</option>
                          <option value="Producción Pecuaria">Producción Pecuaria</option>
                          <option value="Producción Agropecuaria">Producción Agropecuaria</option>
                          <option value="Producción">Producción</option>
                          <option value="Municipio Atacames">Municipio Atacames</option>
                          <option value="Medio Ambiente">Medio Ambiente</option>
                          <option value="Investigación">Investigación</option>
                          <option value="Institución Educativa">Institución Educativa</option>
                          <option value="Hotelería">Hotelería</option>
                          <option value="Gestión Educativa">Gestión Educativa</option>
                          <option value="Empresa Transporte">Empresa Transporte</option>
                          <option value="Empresa Pública">Empresa Pública</option>
                          <option value="Empresa Exportadora">Empresa Exportadora</option>
                          <option value="Empresa de Tecnología e Innovación">Empresa de Tecnología e Innovación</option>
                          <option value="Empresa Comercial">Empresa Comercial</option>
                          <option value="Educativa">Educativa</option>
                          <option value="Educación">Educación</option>
                          <option value="Educación Superior">Educación Superior</option>
                          <option value="Coordinación, Gestión e Investigación">Coordinación, Gestión e Investigación
                          </option>
                          <option value="Cooperación">Cooperación</option>
                          <option value="Comunicación">Comunicación</option>
                          <option value="Comercialización">Comercialización</option>
                          <option value="Comercial Bananera">Comercial Bananera</option>
                          <option value="Ciencias Pedagógicas">Ciencias Pedagógicas</option>
                          <option value="Asesoría Contable">Asesoría Contable</option>
                          <option value="Administración Pública">Administración Pública</option>
                          <option value="Administración-Gestión">Administración-Gestión</option>
                          <option value="Académica">Académica</option>

                        </select>
                        <!-- Botón de ayuda (ícono chiquito) -->
                        <span class="help-icon" @mouseenter="showTooltipactividad = true"
                          @mouseleave="hideOnLeave('actividad')" @click.stop="toggleTooltip('actividad')"
                          ref="tooltipIconactividad">❓</span>

                        <!-- Tooltip -->
                        <div v-if="showTooltipactividad" class="tooltip-box tooltip-box-top" ref="tooltipBoxactividad"
                          @mouseenter="hoveringTooltipactividad = true" @mouseleave="hideOnLeave('actividad')">
                          Seleccione la actividad que realiza la empresa con la UTLVTE
                          <!-- Flechita -->
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo tipo_empre con tooltip -->
                    <div class="col-lg-6 relative">

                      <div class="input-with-icon">
                        <select v-model="tipo_empre" id="tipo_empre">
                          <option value="" disabled selected>Seleccione el tipo de institución</option>
                          <option value="Institución Pública">Institución Pública</option>
                          <option value="Institución Privada">Institución Privada</option>
                          <option value="Institución Mixta">Institución Mixta</option>
                          <option value="Institución Educativa">Institución Educativa</option>
                          <option value="Institución de Educación Superior">Institución de Educación Superior</option>
                          <option value="Institución Técnica y Tecnológica">Institución Técnica y Tecnológica</option>
                          <option value="Institución de Investigación">Institución de Investigación</option>
                          <option value="Institución de Salud">Institución de Salud</option>
                          <option value="Institución Social">Institución Social</option>
                          <option value="Institución Cultural">Institución Cultural</option>
                          <option value="Institución Financiera">Institución Financiera</option>
                          <option value="Institución Deportiva">Institución Deportiva</option>
                          <option value="Institución Ambiental">Institución Ambiental</option>
                          <option value="Gobierno Autónomo Descentralizado (GAD)">Gobierno Autónomo Descentralizado
                            (GAD)</option>
                          <option value="Ministerio">Ministerio</option>
                          <option value="Empresa Pública">Empresa Pública</option>
                          <option value="Empresa Privada">Empresa Privada</option>
                          <option value="Organización No Gubernamental (ONG)">Organización No Gubernamental (ONG)
                          </option>
                          <option value="Organismo Internacional">Organismo Internacional</option>
                          <option value="Fundación">Fundación</option>
                          <option value="Cooperativa">Cooperativa</option>
                          <option value="Asociación">Asociación</option>
                          <option value="Cámara de Comercio o Producción">Cámara de Comercio o Producción</option>
                          <option value="Colegio Profesional">Colegio Profesional</option>
                          <option value="Centro de Investigación">Centro de Investigación</option>
                          <option value="Centro Comunitario">Centro Comunitario</option>
                          <option value="Hospital o Centro de Salud">Hospital o Centro de Salud</option>
                          <option value="Escuela o Colegio">Escuela o Colegio</option>
                          <option value="Universidad o Politécnica">Universidad o Politécnica</option>
                          <option value="Otro">Otro</option>


                        </select>
                        <!-- Icono tipo_empre -->
                        <span class="help-icon" @mouseenter="showTooltiptipo_empre = true"
                          @mouseleave="hideOnLeave('tipo_empre')" @click.stop="toggleTooltip('tipo_empre')"
                          ref="tooltipIcontipo_empre">❓</span>

                        <!-- Tooltip tipo_empre -->
                        <div v-if="showTooltiptipo_empre" class="tooltip-box" ref="tooltipBoxtipo_empre"
                          @mouseenter="hoveringTooltiptipo_empre = true" @mouseleave="hideOnLeave('tipo_empre')">
                          Seleccione el tipo de institucón.
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo fechafin con tooltip -->
                    <div class="col-lg-6 relative">

                      <div class="input-with-icon">
                        <input type="date" v-model="fechafin" id="fechafin" required>
                        <!-- Icono cargo -->
                        <span class="help-icon" @mouseenter="showTooltipfechafin = true"
                          @mouseleave="hideOnLeave('fechafin')" @click.stop="toggleTooltip('fechafin')"
                          ref="tooltipIconfechafin">❓</span>

                        <!-- Tooltip cargo -->
                        <div v-if="showTooltipfechafin" class="tooltip-box tooltip-box-top" ref="tooltipBoxfechafin"
                          @mouseenter="hoveringTooltipfechafin = true" @mouseleave="hideOnLeave('fechafin')">
                          Seleccione la fecha exacta que termina el convenido/carta/relación de su empresa con la
                          UTLVTE.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo lugar con tooltip -->
                    <div class="col-lg-6 relative">
                      <div class="input-with-icon">
                        <input type="address" v-model="lugar" id="lugar" placeholder="Lugar de la empresa..."
                          autocomplete="on" required>
                        <span class="help-icon" @mouseenter="showTooltiplugar = true" @mouseleave="hideOnLeave('lugar')"
                          @click.stop="toggleTooltip('lugar')" ref="tooltipIconlugar">❓</span>
                        <div v-if="showTooltiplugar" class="tooltip-box" ref="tooltipBoxlugar"
                          @mouseenter="hoveringTooltiplugar = true" @mouseleave="hideOnLeave('lugar')">
                          Ingrese el lugar donde se encuentra la empresa.
                          <div class="tooltip-arrow"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo Proceso con tooltip -->
                    <div class="col-lg-12 relative">
                      <div class="input-with-icon">
                        <textarea rows="6" v-model="empresaproce" id="empresaproce"
                          placeholder="Proceso que tiene la empresa con la UTLVTE.." required></textarea>
                        <span class="help-icon" @mouseenter="showTooltipempresaproce = true"
                          @mouseleave="hideOnLeave('empresaproce')" @click.stop="toggleTooltip('empresaproce')"
                          ref="tooltipIconempresaproce">❓</span>
                        <div v-if="showTooltipempresaproce" class="tooltip-box tooltip-box-top"
                          ref="tooltipBoxempresaproce" @mouseenter="hoveringTooltipempresaproce = true"
                          @mouseleave="hideOnLeave('empresaproce')">
                          Detalle el proceso que tiene la empresa con la UTLVTE, ya sea Carta de compromiso o Convenio.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo direccion con tooltip -->
                    <div class="col-lg-12 relative">
                      <div class="input-with-icon">
                        <textarea rows="6" v-model="direccion" id="direccion" placeholder="Dirección de la empresa.."
                          required></textarea>
                        <span class="help-icon" @mouseenter="showTooltipdireccion = true"
                          @mouseleave="hideOnLeave('direccion')" @click.stop="toggleTooltip('direccion')"
                          ref="tooltipIcondireccion">❓</span>
                        <div v-if="showTooltipdireccion" class="tooltip-box tooltip-box-top" ref="tooltipBoxdireccion"
                          @mouseenter="hoveringTooltipdireccion = true" @mouseleave="hideOnLeave('direccion')">
                          Ingrese la dirección exacta de la empresa.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo mision con tooltip -->
                    <div class="col-lg-12 relative">
                      <div class="input-with-icon">
                        <textarea rows="6" v-model="mision" id="mision" placeholder="Misión de la empresa.."
                          required></textarea>
                        <span class="help-icon" @mouseenter="showTooltipmision = true"
                          @mouseleave="hideOnLeave('mision')" @click.stop="toggleTooltip('mision')"
                          ref="tooltipIconmision">❓</span>
                        <div v-if="showTooltipmision" class="tooltip-box tooltip-box-top" ref="tooltipBoxmision"
                          @mouseenter="hoveringTooltipmision = true" @mouseleave="hideOnLeave('mision')">
                          Ingrese la misión de la empresa.
                          <div class="tooltip-arrow tooltip-arrow-down"></div>
                        </div>
                      </div>
                    </div>
                    <!-- Campo vision con tooltip -->
                    <div class="col-lg-12 relative">
                      <div class="input-with-icon">
                        <textarea rows="6" v-model="vision" id="vision" placeholder="Visión de la empresa.."
                          required></textarea>
                        <span class="help-icon" @mouseenter="showTooltipvision = true"
                          @mouseleave="hideOnLeave('vision')" @click.stop="toggleTooltip('vision')"
                          ref="tooltipIconvision">❓</span>
                        <div v-if="showTooltipvision" class="tooltip-box tooltip-box-top" ref="tooltipBoxmision"
                          @mouseenter="hoveringTooltipvision = true" @mouseleave="hideOnLeave('vision')">
                          Ingrese la visión de la empresa.
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
import script2 from '@/assets/scripts/scriptfunciones/save-empre.js';

export default {
  mixins: [script2],
  data() {
    return {
      // Estado del tooltip RUC
      showTooltipRuc: false, hoveringTooltipRuc: false,
      // Estado del tooltip imagen
      showTooltipimagen: false, hoveringTooltipimagen: false,
      // Estado del tooltip empresacorta
      showTooltipempresacorta: false, hoveringTooltipempresacorta: false,
      // Estado del tooltip pais
      showTooltippais: false, hoveringTooltippais: false,
      // Estado del tooltip tipo
      showTooltiptipo: false, hoveringTooltiptipo: false,
      // Estado del tooltip ciudad
      showTooltipciudad: false, hoveringTooltipciudad: false,
      // Estado del tooltip telefono
      showTooltiptelefono: false, hoveringTooltiptelefono: false,
      // Estado del tooltip email
      showTooltipemail: false, hoveringTooltipemail: false,
      // Estado del tooltip urlempre
      showTooltipurlempre: false, hoveringTooltipurlempre: false,
      // Estado del tooltip titulorepre
      showTooltiptitulorepre: false, hoveringTooltiptitulorepre: false,
      // Estado del tooltip nombrerepre
      showTooltipnombrerepre: false, hoveringTooltipnombrerepre: false,
      // Estado del tooltip cargorepre
      showTooltipcargorepre: false, hoveringTooltipcargorepre: false,
      // Estado del tooltip actividad
      showTooltipactividad: false, hoveringTooltipactividad: false,
      // Estado del tooltip tipo_empre
      showTooltiptipo_empre: false, hoveringTooltiptipo_empre: false,
      // Estado del tooltip fechafin
      showTooltipfechafin: false, hoveringTooltipfechafin: false,
      // Estado del tooltip empresaproce
      showTooltipempresaproce: false, hoveringTooltipempresaproce: false,
      // Estado del tooltip direccion
      showTooltipdireccion: false, hoveringTooltipdireccion: false,
      // Estado del tooltip mision
      showTooltipmision: false, hoveringTooltipmision: false,
      // Estado del tooltip vision
      showTooltipvision: false, hoveringTooltipvision: false,
      // Estado del tooltip lugar
      showTooltiplugar: false, hoveringTooltiplugar: false,



      correoErrornue: false,
      correoErrornuetelf: false,
      correoErrornueRucf: false,



    };
  },
  methods: {
    toggleTooltip(field) {
      if (field === "ruc") this.showTooltipRuc = !this.showTooltipRuc;
      if (field === "imagen") this.showTooltipimagen = !this.showTooltipimagen;
      if (field === "empresacorta") this.showTooltipempresacorta = !this.showTooltipempresacorta;
      if (field === "pais") this.showTooltippais = !this.showTooltippais;
      if (field === "tipo") this.showTooltiptipo = !this.showTooltiptipo;
      if (field === "ciudad") this.showTooltipciudad = !this.showTooltipciudad;
      if (field === "telefono") this.showTooltiptelefono = !this.showTooltiptelefono;
      if (field === "emailempre") this.showTooltipemail = !this.showTooltipemail;
      if (field === "urlempre") this.showTooltipurlempre = !this.showTooltipurlempre;
      if (field === "titulorepre") this.showTooltiptitulorepre = !this.showTooltiptitulorepre;
      if (field === "nombrerepre") this.showTooltipnombrerepre = !this.showTooltipnombrerepre;
      if (field === "cargorepre") this.showTooltipcargorepre = !this.showTooltipcargorepre;
      if (field === "actividad") this.showTooltipactividad = !this.showTooltipactividad;
      if (field === "tipo_empre") this.showTooltiptipo_empre = !this.showTooltiptipo_empre;
      if (field === "fechafin") this.showTooltipfechafin = !this.showTooltipfechafin;
      if (field === "empresaproce") this.showTooltipempresaproce = !this.showTooltipempresaproce;
      if (field === "direccion") this.showTooltipdireccion = !this.showTooltipdireccion;
      if (field === "mision") this.showTooltipmision = !this.showTooltipmision;
      if (field === "vision") this.showTooltipvision = !this.showTooltipvision;
      if (field === "lugar") this.showTooltiplugar = !this.showTooltiplugar;

    },
    hideOnLeave(field) {
      setTimeout(() => {
        if (field === "ruc" && !this.hoveringTooltipRuc) this.showTooltipRuc = false;
        if (field === "imagen" && !this.hoveringTooltipimagen) this.showTooltipimagen = false;
        if (field === "empresacorta" && !this.hoveringTooltipempresacorta) this.showTooltipempresacorta = false;
        if (field === "pais" && !this.hoveringTooltippais) this.showTooltippais = false;
        if (field === "tipo" && !this.hoveringTooltiptipo) this.showTooltiptipo = false;
        if (field === "ciudad" && !this.hoveringTooltipciudad) this.showTooltipciudad = false;
        if (field === "telefono" && !this.hoveringTooltiptelefono) this.showTooltiptelefono = false;
        if (field === "emailempre" && !this.hoveringTooltipemail) this.showTooltipemail = false;
        if (field === "urlempre" && !this.hoveringTooltipurlempre) this.showTooltipurlempre = false;
        if (field === "titulorepre" && !this.hoveringTooltiptitulorepre) this.showTooltiptitulorepre = false;
        if (field === "nombrerepre" && !this.hoveringTooltipnombrerepre) this.showTooltipnombrerepre = false;
        if (field === "cargorepre" && !this.hoveringTooltipcargorepre) this.showTooltipcargorepre = false;
        if (field === "actividad" && !this.hoveringTooltipactividad) this.showTooltipactividad = false;
        if (field === "tipo_empre" && !this.hoveringTooltiptipo_empre) this.showTooltiptipo_empre = false;
        if (field === "fechafin" && !this.hoveringTooltipfechafin) this.showTooltipfechafin = false;
        if (field === "empresaproce" && !this.hoveringTooltipempresaproce) this.showTooltipempresaproce = false;
        if (field === "direccion" && !this.hoveringTooltipdireccion) this.showTooltipdireccion = false;
        if (field === "mision" && !this.hoveringTooltipmision) this.showTooltipmision = false;
        if (field === "vision" && !this.hoveringTooltipvision) this.showTooltipvision = false;
        if (field === "lugar" && !this.hoveringTooltiplugar) this.showTooltiplugar = false;
      }, 200);
    },
    handleClickOutside(event) {
      const refs = [
        ["tooltipIconRuc", "tooltipBoxRuc", "showTooltipRuc"],
        ["tooltipIconimagen", "tooltipBoximagen", "showTooltipimagen"],
        ["tooltipIconempresacorta", "tooltipBoxempresacorta", "showTooltipempresacorta"],
        ["tooltipIconpais", "tooltipBoxpais", "showTooltippais"],
        ["tooltipIcontipo", "tooltipBoxtipo", "showTooltiptipo"],
        ["tooltipIconciudad", "tooltipBoxciudad", "showTooltipciudad"],
        ["tooltipIcontelefono", "tooltipBoxtelefono", "showTooltiptelefono"],
        ["tooltipIconemail", "tooltipBoxemail", "showTooltipemail"],
        ["tooltipIconurlempre", "tooltipBoxurlempre", "showTooltipurlempre"],
        ["tooltipIcontitulorepre", "tooltipBoxtitulorepre", "showTooltiptitulorepre"],
        ["tooltipIconnombrerepre", "tooltipBoxnombrerepre", "showTooltipnombrerepre"],
        ["tooltipIconcargorepre", "tooltipBoxcargorepre", "showTooltipcargorepre"],
        ["tooltipIconactividad", "tooltipBoxactividad", "showTooltipactividad"],
        ["tooltipIcontipo_empre", "tooltipBoxtipo_empre", "showTooltiptipo_empre"],
        ["tooltipIconfechafin", "tooltipBoxfechafin", "showTooltipfechafin"],
        ["tooltipIconempresaproce", "tooltipBoxempresaproce", "showTooltipempresaproce"],
        ["tooltipIcondireccion", "tooltipBoxdireccion", "showTooltipdireccion"],
        ["tooltipIconmision", "tooltipBoxmision", "showTooltipmision"],
        ["tooltipIconvision", "tooltipBoxvision", "showTooltipvision"],
        ["tooltipIconlugar", "tooltipBoxlugar", "showTooltiplugar"],
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
      if (this.ruc.length !== 13) {
        this.correoErrornueRucf = true;
      } else {
        this.correoErrornueRucf = false;
      }


    },
    validateNumberT() {
      this.telefono = this.telefono.replace(/\D/g, '').slice(0, 10);
      if (this.telefono.length !== 10) {
        this.correoErrornuetelf = true;
      } else {
        this.correoErrornuetelf = false;
      }


    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.emailempre)) {
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