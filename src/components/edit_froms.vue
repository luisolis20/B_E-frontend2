<template>
    <div class="container-fluid RSVP-form py-5" id="weddingRsvp">
        <div class="container py-3">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary">Editar Formulario</h1>
                <p class="text-dark">Rellene los siguientes campos para editar tu formulario</p>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                            Registra los datos del formulario
                        </div>
                        <form>
                            <div class="row gx-12 gy-3">
                                <div class="col-lg-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Nombre del
                                            Formulario</label>
                                        <div class="input-with-icon">
                                            <input type="text" v-model="nombre_forms"
                                                class="form-control py-3 border-1 text-dark" id="nombre_forms">
                                            <!-- Icono nombre_forms -->
                                            <span class="help-icon" @mouseenter="showTooltipnombre_forms = true"
                                                @mouseleave="hideOnLeave('nombre_forms')"
                                                @click.stop="toggleTooltip('nombre_forms')"
                                                ref="tooltipIconnombre_forms">❓</span>

                                            <!-- Tooltip nombre_forms -->
                                            <div v-if="showTooltipnombre_forms" class="tooltip-box"
                                                ref="tooltipBoxnombre_forms"
                                                @mouseenter="hoveringTooltipnombre_forms = true"
                                                @mouseleave="hideOnLeave('nombre_forms')">
                                                Ingrese el nombre de su formulario.
                                                <div class="tooltip-arrow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Seleccione el tipo de
                                            encuesta</label>
                                        <div class="input-with-icon">
                                            <select v-model="this.tipoencuesta"
                                                class="form-control py-3 border-0 text-dark" id="tipoencuesta">
                                                <option value="" disabled selected>
                                                    Tipo de Encuesta
                                                </option>
                                                <option value="Graduados">Graduados</option>
                                                <option value="Empleadores">Empleadores</option>
                                                <option value="Egresados">Egresados</option>
                                            </select>

                                            <!-- Icono tipoencuesta -->
                                            <span class="help-icon" @mouseenter="showTooltiptipoencuesta = true"
                                                @mouseleave="hideOnLeave('tipoencuesta')"
                                                @click.stop="toggleTooltip('tipoencuesta')"
                                                ref="tooltipIcontipoencuesta">❓</span>
                                            <!-- Tooltip tipoencuesta -->
                                            <div v-if="showTooltiptipoencuesta" class="tooltip-box tooltip-box-down"
                                                ref="tooltipBoxtipoencuesta"
                                                @mouseenter="hoveringTooltiptipoencuesta = true"
                                                @mouseleave="hideOnLeave('tipoencuesta')">
                                                Seleccione el tipo de encuesta, por ejemplo: Graduados, Empleadores,
                                                Egresados.
                                                <div class="tooltip-arrow tooltip-arrow-up"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Seleccione el
                                            estado</label>
                                        <div class="input-with-icon">
                                            <select v-model="this.ACTIVO"
                                                class="form-control py-3 border-0 text-dark" id="ACTIVO">
                                                <option value="" disabled selected>
                                                    Tipo de Estado
                                                </option>
                                                <option value="Habilitado">Habilitado</option>
                                                <option value="Deshabilitado">Deshabilitado</option>
                                            </select>

                                            <!-- Icono ACTIVO -->
                                            <span class="help-icon" @mouseenter="showTooltipACTIVO = true"
                                                @mouseleave="hideOnLeave('ACTIVO')"
                                                @click.stop="toggleTooltip('ACTIVO')"
                                                ref="tooltipIconACTIVO">❓</span>
                                            <!-- Tooltip ACTIVO -->
                                            <div v-if="showTooltipACTIVO" class="tooltip-box tooltip-box-down"
                                                ref="tooltipBoxACTIVO"
                                                @mouseenter="hoveringTooltipACTIVO = true"
                                                @mouseleave="hideOnLeave('ACTIVO')">
                                                Seleccione el tipo de estado del formulario, por ejemplo: Habilitado,
                                                Deshabilitado.
                                                <div class="tooltip-arrow tooltip-arrow-up"></div>
                                                Egresados.
                                                <div class="tooltip-arrow tooltip-arrow-up"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">

                                        <div class="mt-4">
                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <p class="text-dark">Si ya llenó todos los campos del formulario de clic
                                                    en el botón de abajo</p>

                                                <button v-on:click="editar"
                                                    class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">Editar
                                                    Formulario</button>



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
import axios from 'axios';
import { mostraralertas, enviarsolig } from '@/assets/scripts/scriptfunciones/funciones';
import { getMe } from '@/store/auth';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
export default {
    data() {
        return {
            idus: 0,
            nombre_forms: '',
            tipoencuesta: '',
            ACTIVO: '',
            cargando: false,
            showTooltipnombre_forms: false,
            hoveringTooltipnombre_forms: false,
            showTooltiptipoencuesta: false,
            hoveringTooltiptipoencuesta: false,
            showTooltipACTIVO: false,
            hoveringTooltipACTIVO: false,
            url: 'http://backendbolsaempleo.test/api/b_e/vin/seguiformulario'

        }
    },
    async mounted() {
        const ruta = useRoute();
         const usuario = await getMe();
        this.idus = ruta.params.id;
        this.url += '/' + this.idus;
        this.getFormulario();


    },
    methods: {
        async getFormulario() {
            try {
                const response = await axios.get(this.url);
                //console.log(response.data.data[0]);


                if (response.data.data) {
                    this.nombre_forms = response.data.data[0].NOMBRE;
                    this.tipoencuesta = response.data.data[0].tipoencuesta;
                    if (response.data.data[0].ACTIVO == 1) {
                        this.ACTIVO = 'Habilitado';
                    } else {
                        this.ACTIVO = 'Deshabilitado';
                    }
                    //this.ACTIVO = response.data.data[0].ACTIVO;


                }

            } catch (error) {
                console.error('Error al obtener la emprendimiento:', error);
                mostraralertas('Error al obtener la emprendimiento. Por favor, inténtelo de nuevo.', 'error');

            }


        },
        toggleTooltip(field) {
            if (field === "nombre_forms") this.showTooltipnombre_forms = !this.showTooltipnombre_forms;
            if (field === "tipoencuesta") this.showTooltiptipoencuesta = !this.showTooltiptipoencuesta;
            if (field === "ACTIVO") this.showTooltipACTIVO = !this.showTooltipACTIVO;


        },
        hideOnLeave(field) {
            setTimeout(() => {
                if (field === "nombre_forms" && !this.hoveringTooltipnombre_forms) this.showTooltipnombre_forms = false;
                if (field === "tipoencuesta" && !this.hoveringTooltiptipoencuesta) this.showTooltiptipoencuesta = false;
                if (field === "ACTIVO" && !this.hoveringTooltipACTIVO) this.showTooltipACTIVO = false;

            }, 200);
        },
        handleClickOutside(event) {
            const refs = [
                ['tooltipIconnombre_forms', 'tooltipBoxnombre_forms', 'showTooltipnombre_forms'],
                ['tooltipIcontipoencuesta', 'tooltipBoxtipoencuesta', 'showTooltiptipoencuesta'],
                ['tooltipIconACTIVO', 'tooltipBoxACTIVO', 'showTooltipACTIVO'],

            ];
            refs.forEach(([iconRef, boxRef, state]) => {
                const icon = this.$refs[iconRef];
                const box = this.$refs[boxRef];
                if (icon && box && !icon.contains(event.target) && !box.contains(event.target)) {
                    this[state] = false;
                }
            });
        },

        editar(event) {
            event.preventDefault();
            try {
                const fechaEcuador = dayjs().tz('America/Guayaquil').format('YYYY-MM-DD HH:mm:ss');

                if (this.nombre_forms.trim() == '') {
                    mostraralertas('Ingrese el nombre de su formulario', 'warning', 'nombre_forms');
                }


                else if (this.tipoencuesta.trim() == '') {
                    mostraralertas('Seleccione el tipo de encuesta', 'warning', 'tipoencuesta');
                }
                else if (this.ACTIVO.trim() == '') {
                    mostraralertas('Seleccione el estado del formulario', 'warning', 'ACTIVO');
                } else if (this.ACTIVO.trim() != 'Habilitado' && this.ACTIVO.trim() != 'Deshabilitado') {
                    mostraralertas('El estado del formulario debe ser Habilitado o Deshabilitado', 'warning', 'ACTIVO');
                } else {
                    var estado = 0;
                    if (this.ACTIVO.trim() == 'Habilitado') {
                        estado = 1;
                    } else {
                        estado = 0;
                    }
                    var parametros = {
                        NOMBRE: this.nombre_forms.trim(),
                        tipoencuesta: this.tipoencuesta.trim(),
                        ACTIVO: estado,
                        UP: store.state.name,
                        FINS: fechaEcuador.toString(),

                    }

                    enviarsolig('PUT', parametros, this.url, 'Formulario Editado');
                    this.$router.push('/encuestas_all/' + store.state.idusu);
                }
            
            } catch (error) {
                console.error('Error al guardar el formulario:', error);

            }

        },


    },
    name: 'edit_froms',
};
</script>