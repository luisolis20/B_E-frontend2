<template>
    <div class="container-fluid RSVP-form py-5" id="weddingRsvp">
        <div class="container py-5">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary">Edita Tu Oferta Laboral</h1>
                <p class="text-dark">Aquí puedes editar los datos de tu oferta laboral publicada en la bolsa de
                    empleo.</p>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            Edita los Datos de tu oferta
                        </div>
                        <form>
                            <div class="row gx-12 gy-3">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Título de la
                                            oferta</label>
                                        <div class="input-with-icon">
                                            <input type="text" v-model="titulo"
                                                class="form-control py-3 border-1 text-dark" id="titulo">
                                            <!-- Icono titulo -->
                                            <span class="help-icon" @mouseenter="showTooltiptitulo = true"
                                                @mouseleave="hideOnLeave('titulo')"
                                                @click.stop="toggleTooltip('titulo')" ref="tooltipIcontitulo">❓</span>

                                            <!-- Tooltip titulo -->
                                            <div v-if="showTooltiptitulo" class="tooltip-box" ref="tooltipBoxtitulo"
                                                @mouseenter="hoveringTooltiptitulo = true"
                                                @mouseleave="hideOnLeave('titulo')">
                                                Ingrese el titulo de su oferta laboral.
                                                <div class="tooltip-arrow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Seleccione la
                                            jornada</label>
                                        <div class="input-with-icon">
                                            <select v-model="this.jornada" class="form-control py-3 border-0 text-dark"
                                                id="jornada">
                                                <option value="" disabled selected>
                                                    Tipos de Jornadas
                                                </option>
                                                <option value="Tiempo completo">Tiempo completo</option>
                                                <option value="Medio tiempo">Medio tiempo</option>
                                                <option value="Por horas">Por horas</option>
                                                <option value="Pasantía">Pasantía</option>
                                            </select>

                                            <!-- Icono jornada -->
                                            <span class="help-icon" @mouseenter="showTooltipjornada = true"
                                                @mouseleave="hideOnLeave('jornada')"
                                                @click.stop="toggleTooltip('jornada')" ref="tooltipIconjornada">❓</span>
                                            <!-- Tooltip jornada -->
                                            <div v-if="showTooltipjornada" class="tooltip-box tooltip-box-down"
                                                ref="tooltipBoxjornada" @mouseenter="hoveringTooltipjornada = true"
                                                @mouseleave="hideOnLeave('jornada')">
                                                Seleccione la jornada laboral de su oferta (Ejemplo: Tiempo completo,
                                                Medio
                                                tiempo, etc).
                                                <div class="tooltip-arrow tooltip-arrow-up"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Seleccione el Tipo de
                                            contrato</label>
                                        <div class="input-with-icon">
                                            <select v-model="this.tipo_contrato"
                                                class="form-control py-3 border-0 text-dark" id="tipo_contrato">
                                                <option value="" disabled selected>
                                                    Tipos de Contrato
                                                </option>
                                                <option value="Indefinido">Indefinido</option>
                                                <option value="Plazo fijo">Plazo fijo</option>
                                                <option value="Por obra o servicio">Por obra o servicio</option>
                                                <option value="Prácticas">Prácticas</option>
                                                <option value="Formación">Formación</option>
                                                <option value="Eventual por circunstancias de la producción">Eventual
                                                    por
                                                    circunstancias de la producción</option>
                                            </select>
                                            <!-- Icono tipo_contrato -->
                                            <span class="help-icon" @mouseenter="showTooltiptipo_contrato = true"
                                                @mouseleave="hideOnLeave('tipo_contrato')"
                                                @click.stop="toggleTooltip('tipo_contrato')"
                                                ref="tooltipIcontipo_contrato">❓</span>
                                            <!-- Tooltip tipo_contrato -->
                                            <div v-if="showTooltiptipo_contrato" class="tooltip-box"
                                                ref="tooltipBoxtipo_contrato"
                                                @mouseenter="hoveringTooltiptipo_contrato = true"
                                                @mouseleave="hideOnLeave('tipo_contrato')">
                                                Seleccione el tipo de contrato de su oferta (Ejemplo: Indefinido,
                                                Plazo
                                                fijo, etc).
                                                <div class="tooltip-arrow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <label for="Examplename" class="form-label text-dark">Seleccione la categoría de la
                                        oferta</label>
                                    <div class="form-group input-with-icon">
                                        <select v-model="this.categoriaSeleccionada"
                                            class="form-control py-3 border-0 text-dark" id="inputPersonOne">
                                            <option value="" disabled selected>
                                                Categorías / Área
                                            </option>
                                            <option value="Administración y RRHH">Administración y RRHH</option>
                                            <option value="Arquitectura y Producción">Arquitectura y Producción</option>
                                            <option value="Comercial">Comercial</option>
                                            <option value="Comercial, Negocios y Atención al público">Comercial,
                                                Negocios y Atención al público
                                            </option>
                                            <option value="Educación y Docencia">Educación y Docencia</option>
                                            <option value="Hotelería, Gastronomía y Turismo">Hotelería, Gastronomía y
                                                Turismo</option>
                                            <option value="Ingenierías">Ingenierías</option>
                                            <option value="Logística y Abastecimiento">Logística y Abastecimiento
                                            </option>
                                            <option value="Marketing, Publicidad, Comunicación y Diseño">Marketing,
                                                Publicidad, Comunicación y Diseño
                                            </option>
                                            <option value="Oficios">Oficios</option>
                                            <option value="Producción y Operarios">Producción y Operarios</option>
                                            <option value="Salud, Medicina, Farmacia y Bioquímica">Salud, Medicina,
                                                Farmacia y Bioquímica</option>
                                            <option value="Secretaría y Recepción">Secretaría y Recepción</option>
                                            <option value="Seguridad y Vigilancia">Seguridad y Vigilancia</option>
                                            <option value="Tecnología y Sistemas">Tecnología y Sistemas</option>
                                            <option value="Textil">Textil</option>
                                            <option value="Ventas">Ventas</option>
                                            <option value="Otros">Otros</option>
                                        </select>
                                        <!-- Icono categoria -->
                                        <span class="help-icon" @mouseenter="showTooltipcategoria = true"
                                            @mouseleave="hideOnLeave('categoria')"
                                            @click.stop="toggleTooltip('categoria')" ref="tooltipIconcategoria">❓</span>
                                        <!-- Tooltip categoria -->
                                        <div v-if="showTooltipcategoria" class="tooltip-box tooltip-box-down"
                                            ref="tooltipBoxcategoria" @mouseenter="hoveringTooltipcategoria = true"
                                            @mouseleave="hideOnLeave('categoria')">
                                            Seleccione la categoría o área de su oferta (Ejemplo: Administración y
                                            RRHH, Comercial, Educación y Docencia, etc).
                                            <div class="tooltip-arrow tooltip-arrow-up"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Seleccione la
                                            Modalidad</label>
                                        <div class="input-with-icon">
                                            <select v-model="this.modalidad"
                                                class="form-control py-3 border-0 text-dark" id="modalidad">
                                                <option value="" disabled selected>
                                                    Tipos de Modalidades
                                                </option>
                                                <option value="Presencial">Presencial</option>
                                                <option value="Remoto">Remoto</option>
                                                <option value="Híbrido">Híbrido</option>
                                            </select>
                                            <!-- Icono modalidad -->
                                            <span class="help-icon" @mouseenter="showTooltipmodalidad = true"
                                                @mouseleave="hideOnLeave('modalidad')"
                                                @click.stop="toggleTooltip('modalidad')"
                                                ref="tooltipIconmodalidad">❓</span>
                                            <!-- Tooltip modalidad -->
                                            <div v-if="showTooltipmodalidad" class="tooltip-box"
                                                ref="tooltipBoxmodalidad" @mouseenter="hoveringTooltipmodalidad = true"
                                                @mouseleave="hideOnLeave('modalidad')">
                                                Seleccione la modalidad de su oferta (Ejemplo: Presencial, Remoto,
                                                Híbrido).
                                                <div class="tooltip-arrow tooltip-arrow-up"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Seleccione la fecha de
                                            vigencia de la
                                            oferta</label>
                                        <div class="input-with-icon">
                                            <input type="date" v-model="Fechafinofer"
                                                class="form-control py-3 border-1 text-dark" id="Fechafinofer">
                                            <!-- Icono fecha -->
                                            <span class="help-icon" @mouseenter="showTooltipfecha = true"
                                                @mouseleave="hideOnLeave('fecha')" @click.stop="toggleTooltip('fecha')"
                                                ref="tooltipIconfecha">❓</span>
                                            <!-- Tooltip fecha -->
                                            <div v-if="showTooltipfecha" class="tooltip-box tooltip-box-down"
                                                ref="tooltipBoxfecha" @mouseenter="hoveringTooltipfecha = true"
                                                @mouseleave="hideOnLeave('fecha')">
                                                Seleccione la fecha de vigencia de su oferta laboral. Esta será la
                                                fecha límite para que los postulantes puedan aplicar a su oferta.
                                                <div class="tooltip-arrow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Requisitos</label>
                                        <div class="input-with-icon">
                                            <textarea name="text" v-model="requisistos"
                                                class="form-control border-1 text-dark" id="requisistos" cols="30"
                                                rows="5"></textarea>
                                            <!-- Icono requisitos -->
                                            <span class="help-icon" @mouseenter="showTooltiprequisistos = true"
                                                @mouseleave="hideOnLeave('requisistos')"
                                                @click.stop="toggleTooltip('requisistos')"
                                                ref="tooltipIconrequisistos">❓</span>

                                            <!-- Tooltip requisitos -->
                                            <div v-if="showTooltiprequisistos" class="tooltip-box tooltip-box-top"
                                                ref="tooltipBoxrequisistos"
                                                @mouseenter="hoveringTooltiprequisistos = true"
                                                @mouseleave="hideOnLeave('requisistos')">
                                                Ingrese los requisitos para postular a su oferta laboral.
                                                <div class="tooltip-arrow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Descripción</label>
                                        <div class="input-with-icon">
                                            <textarea name="text" v-model="descripcion"
                                                class="form-control border-1 text-dark" id="descripcion" cols="30"
                                                rows="5"></textarea>
                                            <!-- Icono descripcion -->
                                            <span class="help-icon" @mouseenter="showTooltipdescripcion = true"
                                                @mouseleave="hideOnLeave('descripcion')"
                                                @click.stop="toggleTooltip('descripcion')"
                                                ref="tooltipIcondescripcion">❓</span>

                                            <!-- Tooltip descripcion -->
                                            <div v-if="showTooltipdescripcion" class="tooltip-box tooltip-box-down"
                                                ref="tooltipBoxdescripcion"
                                                @mouseenter="hoveringTooltipdescripcion = true"
                                                @mouseleave="hideOnLeave('descripcion')">
                                                Ingrese la descripción de su oferta laboral.
                                                <div class="tooltip-arrow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">

                                        <div class="mt-4">
                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <p class="text-dark">Si ya editó todos los datos para la oferta puede
                                                    dar clic en el botón de abajo</p>

                                                <button v-on:click="actualizar"
                                                    class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">Editar y Publicar Oferta</button>
                                                


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
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
import store from '@/store';
import {mostraralertas, enviarsolig,enviarsoliedit} from '@/assets/scripts/scriptfunciones/funciones';
import { getMe } from '@/store/auth';
import { useRoute } from 'vue-router';
import axios from 'axios';
export default {
   data(){
        return{
            idus:0,
            ide:0,
            titulo:'',
            descripcion:'',
            requisistos:'',
            jornada:'',
            tipo_contrato:'',
            modalidad:'',
            categoriaSeleccionada:'',
            Fechafinofer:'',
            ur3:`${__API_BOLSA__}/b_e/vin/oferta_empleos_emprendimientos2`,
            emprendimiento_id:'',
            cargando: false,
            showTooltiptitulo: false,
            hoveringTooltiptitulo: false,
            showTooltipjornada: false,
            hoveringTooltipjornada: false,
            showTooltiptipo_contrato: false,
            hoveringTooltiptipo_contrato: false,
            showTooltipcategoria: false,
            hoveringTooltipcategoria: false,
            showTooltipmodalidad: false,
            hoveringTooltipmodalidad: false,
            showTooltipfecha: false,
            hoveringTooltipfecha: false,
            showTooltiprequisistos: false,
            hoveringTooltiprequisistos: false,
            showTooltipdescripcion: false,
            hoveringTooltipdescripcion: false,
        }
    },
    async mounted(){
        const ruta = useRoute();
        const usuario = await getMe();
        this.ide = ruta.params.id;
        this.idus = ruta.params.secondId;
        this.ur3 +=  '/'+this.idus;
        //console.log(this.ur3)
        this.getOfertas();
        
        
    },
    methods:{
        async getOfertas(){
            axios.get(this.ur3).then(
                res=>{
                    this.titulo= res.data.data[0].titulo;
                    this.descripcion= res.data.data[0].descripcion;
                    this.requisistos= res.data.data[0].requisistos;
                    this.jornada= res.data.data[0].jornada;
                    this.tipo_contrato= res.data.data[0].tipo_contrato;
                    this.modalidad= res.data.data[0].modalidad;
                    this.Fechafinofer= res.data.data[0].fechaFinOferta;
                    this.categoriaSeleccionada= res.data.data[0].categoria;
                }
            );
            
        },
         toggleTooltip(field) {
            if (field === "titulo") this.showTooltiptitulo = !this.showTooltiptitulo;
            if (field === "jornada") this.showTooltipjornada = !this.showTooltipjornada;
            if (field === "tipo_contrato") this.showTooltiptipo_contrato = !this.showTooltiptipo_contrato;
            if (field === "categoria") this.showTooltipcategoria = !this.showTooltipcategoria;
            if (field === "modalidad") this.showTooltipmodalidad = !this.showTooltipmodalidad;
            if (field === "fecha") this.showTooltipfecha = !this.showTooltipfecha;
            if (field === "requisistos") this.showTooltiprequisistos = !this.showTooltiprequisistos;
            if (field === "descripcion") this.showTooltipdescripcion = !this.showTooltipdescripcion;

        },
        hideOnLeave(field) {
            setTimeout(() => {
                if (field === "titulo" && !this.hoveringTooltiptitulo) this.showTooltiptitulo = false;
                if (field === "jornada" && !this.hoveringTooltipjornada) this.showTooltipjornada = false;
                if (field === "tipo_contrato" && !this.hoveringTooltiptipo_contrato) this.showTooltiptipo_contrato = false;
                if (field === "categoria" && !this.hoveringTooltipcategoria) this.showTooltipcategoria = false;
                if (field === "modalidad" && !this.hoveringTooltipmodalidad) this.showTooltipmodalidad = false;
                if (field === "fecha" && !this.hoveringTooltipfecha) this.showTooltipfecha = false;
                if (field === "requisistos" && !this.hoveringTooltiprequisistos) this.showTooltiprequisistos = false;
                if (field === "descripcion" && !this.hoveringTooltipdescripcion) this.showTooltipdescripcion = false;
            }, 200);
        },
        handleClickOutside(event) {
            const refs = [
                ['tooltipIcontitulo', 'tooltipBoxtitulo', 'showTooltiptitulo'],
                ['tooltipIconjornada', 'tooltipBoxjornada', 'showTooltipjornada'],
                ['tooltipIcontipo_contrato', 'tooltipBoxtipo_contrato', 'showTooltiptipo_contrato'],
                ['tooltipIconcategoria', 'tooltipBoxcategoria', 'showTooltipcategoria'],
                ['tooltipIconmodalidad', 'tooltipBoxmodalidad', 'showTooltipmodalidad'],
                ['tooltipIconfecha', 'tooltipBoxfecha', 'showTooltipfecha'],
                ['tooltipIconrequisistos', 'tooltipBoxrequisistos', 'showTooltiprequisistos'],
                ['tooltipIcondescripcion', 'tooltipBoxdescripcion', 'showTooltipdescripcion']
            ];
            refs.forEach(([iconRef, boxRef, state]) => {
                const icon = this.$refs[iconRef];
                const box = this.$refs[boxRef];
                if (icon && box && !icon.contains(event.target) && !box.contains(event.target)) {
                    this[state] = false;
                }
            });
        },

       
        async actualizar(event){
            event.preventDefault();
            if(this.titulo.trim()==''){
                mostraralertas('Ingrese Titulo de la Oferta','warning','titulo');
            }
            else if(this.descripcion.trim()==''){
                mostraralertas('Ingrese Descripcion de la Oferta','warning','descripcion');
            }
            else if(this.requisistos.trim()==''){
                mostraralertas('Ingrese requisitos','warning','requisistos');
            }
            else if(this.jornada.trim()==''){
                mostraralertas('Ingrese jornada','warning','jornada');
            }
            else if(this.modalidad.trim()==''){
                mostraralertas('Ingrese modalidad','warning','modalidad');
            }
            else if(this.tipo_contrato.trim()==''){
                mostraralertas('Ingrese tipo de contrato','warning','tipo_contrato');
            }
            else if(this.categoriaSeleccionada.trim()==''){
                mostraralertas('Seleccione una categoria','warning','categoria');
            }
            else if(this.Fechafinofer.trim()==''){
                mostraralertas('Ingrese fecha de vigencia de la oferta','warning','fecha');
            }
            
            
            else{
                var parametros = {
                    titulo:this.titulo.trim(),
                    descripcion:this.descripcion.trim(),
                    requisistos:this.requisistos.trim(),
                    jornada:this.jornada.trim(),
                    tipo_contrato:this.tipo_contrato.trim(),
                    categoria:this.categoriaSeleccionada,
                    modalidad:this.modalidad.trim(),
                    fechaFinOferta:this.Fechafinofer,
                    estado_ofert_empr: 2,
                    emprendimiento_id:this.ide

                }
               
                await enviarsoliedit('PUT',parametros,this.ur3,'Oferta Actualizada')
                this.$router.push('/emprendimientosofertview/'+store.state.idusu);
            }
        },
        

    },
    name: 'editofertasemprendimiento',
};
</script>