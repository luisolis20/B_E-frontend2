<template>
    <div class="container-fluid RSVP-form py-3" id="weddingRsvp">
        <div class="container py-3">
            <div class="mb-5 text-center mx-auto wow fadeIn" data-wow-delay="0.1s" style="max-width: 800px;">
                <h1 class="display-2 text-primary" v-if="mostrarOpciones2">Tu Emprendimiento</h1>
                <p class="text-dark" v-if="mostrarOpciones2">En este apartado visualizarás los datos de tu
                    emprendimiento, no podrás editarlo. Aquí lo que harás es crear una oferta laboral para tu
                    emprendimiento</p>
                <h1 class="display-2 text-primary" v-if="mostrarOpciones3">Datos del Emprendimiento</h1>
                <p class="text-dark" v-if="mostrarOpciones3">En este apartado visualizarás los datos del emprendimiento
                </p>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="p-5 border-secondary position-relative" style="border-style: double;">
                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2 wow fadeIn"
                            data-wow-delay="0.1s"
                            style="width: 75%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);"
                            v-if="mostrarOpciones2">
                            Estos son los datos de tu Emprendimiento

                        </div>



                        <form>

                            <div class="testimonial-inner-img">
                                <img v-if="previewFotologo" :src="previewFotologo" class="img-fluid rounded-circle"
                                    alt="Image">
                                <img v-else-if="logo" :src="'data:image/png;base64,' + logo"
                                    class="img-fluid rounded-circle" alt="Image">
                                <img v-else src="https://emprendedores.biz/wp-content/uploads/2023/08/QEE-2.png"
                                    class="img-fluid rounded-circle" alt="Image">
                            </div>
                            <div class="row gx-4 gy-3">
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Ruc</label>
                                        <input type="text" v-model="ruc" class="form-control py-3 border-0 text-dark"
                                            id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Nombre del
                                            Emprendimiento</label>
                                        <input type="text" v-model="nombre_emprendimiento"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Tiempo que tienen el
                                            Emprendimiento</label>
                                        <input type="text" v-model="tiempo_emprendimiento"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Horarios de
                                            Atención</label>
                                        <input type="text" v-model="horarios_atencion"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>

                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Teléfono</label>
                                        <input type="text" v-model="telefono_contacto"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Email</label>
                                        <input type="text" v-model="email_contacto"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Sitio web</label>
                                        <input type="text" v-model="sitio_web"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Redes sociales</label>
                                        <input type="text" v-model="redes_sociales"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="Examplename" class="form-label text-dark">Estado actual del
                                            Emprendimiento</label>
                                        <input type="text" v-model="estado_empren"
                                            class="form-control py-3 border-0 text-dark" id="Examplename" disabled>
                                    </div>
                                </div>

                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Descripción</label>
                                        <textarea name="text" v-model="descripcion"
                                            class="form-control border-0 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Dirección</label>
                                        <textarea name="text" v-model="direccion"
                                            class="form-control border-0 text-dark" id="exampletextarea" cols="30"
                                            rows="5" disabled></textarea>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <label for="exampletextarea" class="form-label text-dark">Fotos</label>
                                       
                                    </div>
                                </div>
                                <div class="col-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <img v-if="previewFoto" :src="previewFoto" id="fotoimg" width="100%"
                                            height="300" class="img-fluid" />
                                        <img v-else-if="fotografia" :src="'data:image/png;base64,' + fotografia"
                                            width="100%" height="300"   class="img-fluid" />
                                        <img v-else src="https://emprendedores.biz/wp-content/uploads/2023/08/QEE-2.png"
                                            width="100%" height="300"   class="img-fluid" />
                                    </div>
                                    <br><br>
                                </div>
                                <div class="col-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div class="form-group">
                                        <img v-if="previewFoto2" :src="previewFoto2" id="fotoimg" width="100%"
                                            height="300"  class="img-fluid" />
                                        <img v-else-if="fotografia2" :src="'data:image/png;base64,' + fotografia2"
                                            width="100%"  class="img-fluid"/>
                                        <img v-else src="https://emprendedores.biz/wp-content/uploads/2023/08/QEE-2.png"
                                            width="100%"  class="img-fluid" />
                                    </div>
                                    <br><br>
                                </div>
                                <br><br>


                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s"
                                    v-if="est == 1 && mostrarOpciones2">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            ¿Deseas crear una oferta de empleo para este emprendimiento?
                                        </div>
                                        <div class="mt-4">
                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <router-link :to="{ path: '/ofertaempnew/' + ide }"
                                                    class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">Haz
                                                    Clic
                                                    Aquí</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s"
                                    v-if="est == 0 && mostrarOpciones2">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            El emprendimiento no cumplió con los requisitos necesarios para ser aprobado
                                        </div>

                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s"
                                    v-if="est == 2 && mostrarOpciones2">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            El emprendimiento está en proceso de revisión, no está disponible para crear
                                            ofertas de empleo
                                        </div>

                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s"
                                    v-if="mostrarOpciones3 && est == 2">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            --------------------
                                        </div>

                                        <div class="mt-4">

                                            <label for="" class="text-success">Este emprendimiento fue enviado el
                                                {{ formatFecha(updated_at) }}</label>


                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <p class="text-dark">Luego de revisar el emprendimineto y verificar que
                                                    los datos sean correctos. ¿Deseas aceptarlo?, al
                                                    aceptar o rechazar le llegará la notificación al correo al dueño del
                                                    emprendimiento </p>
                                                <div>
                                                    <button :disabled="botonesBloqueados"
                                                        @click.prevent="habilitar(idemprendimiento, nombre_emprendimiento)"
                                                        class="btn btn-primary btn-primary-outline-0 py-3 px-5 text-white">Si,
                                                        Aceptar el emprendimiento</button>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button :disabled="botonesBloqueados"
                                                        @click.prevent="eliminar(idemprendimiento, nombre_emprendimiento)"
                                                        class="btn btn-danger btn-primary-outline-0 py-3 px-5 text-white">No,
                                                        Rechazar el emprendimiento</button>
                                                </div>
                                            </div>
                                            <br>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-12 wow fadeIn" data-wow-delay="0.1s"
                                    v-if="mostrarOpciones3 && est == 1 || est == 0">
                                    <div class="text-center border border-secondary p-4 my-4 position-relative"
                                        v-if="est == 1">
                                        <div class="fw-bold text-primary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            Emprenidimiento aprobado
                                        </div>

                                        <div class="mt-4">

                                            <label for="" class="text-success">Este emprendimiento fue
                                                aprobado el: </label>

                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <label for="" class="text-dark">{{ formatFecha(updated_at) }}</label>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="text-center border border-secondary p-4 my-4 position-relative"
                                        v-if="est == 0 && mostrarOpciones3">
                                        <div class="fw-bold text-secondary bg-white d-flex align-items-center justify-content-center position-absolute border-secondary p-2"
                                            style="width: 50%; border-style: double; top: 0; left: 50%; transform: translate(-50%, -50%);">
                                            Emprenidimiento no aprobado
                                        </div>

                                        <div class="mt-4">

                                            <label for="" class="text-danger">Ese emprendimiento fue
                                                rechazado el: </label>

                                            <div class="col-12 text-center wow fadeIn" data-wow-delay="0.1s">
                                                <label for="" class="text-dark">{{ formatFecha(updated_at) }}</label>
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

import { useRoute } from 'vue-router';
import axios from 'axios';
import store from '@/store';
import script2 from '@/assets/scripts/custom.js';
import { getMe } from '@/store/auth';
import { mostraralertas, enviarsolig, mostraralertas2, enviarsolig23, confimar, confimarhabi } from '@/assets/scripts/scriptfunciones/funciones';

export default {
    data() {
        return {
            ide: 0,
            est: 0,
            idususuario: 0,
            ruc: '',
            nombre_emprendimiento: '',
            descripcion: '',
            tiempo_emprendimiento: '',
            horarios_atencion: '',
            direccion: '',
            telefono_contacto: '',
            email_contacto: '',
            sitio_web: '',
            redes_sociales: '',
            estado_empren: '',
            logo: '',
            fotografia2: '',
            previewFoto2: '',
            fotografia: '',
            previewFoto: '',
            previewFotologo: '',
            updated_at: '',
            idemprendimiento: 0,
            urlinformacionpersonal: "http://vinculacionconlasociedad.utelvt.edu.ec/cvubackendv2/api/cvn/v1/informacionpersonal",
            urk3: `${__API_BOLSA__}/b_e/vin/consultarediremp`,
            cargando: false,
            botonesBloqueados: false,
            urlofeempre: `${__API_BOLSA__}/b_e/vin/view-oferta_empleos_emprendimiento`,
        }
    },
    async mounted() {
        const ruta = useRoute();
        const usuario = await getMe();
        this.ide = ruta.params.id;
        this.urk3 += '/' + this.ide;
        this.getEmprendiemi();

    },
    methods: {
        async getEmprendiemi() {
            try {
                const response = await axios.get(this.urk3);
                //console.log(response.data.data);


                if (response.data.data) {
                    this.ruc = response.data.data[0].ruc;
                    this.idemprendimiento = response.data.data[0].id;
                    this.nombre_emprendimiento = response.data.data[0].nombre_emprendimiento;
                    this.idususuario = response.data.data[0].CIInfPer;
                    this.descripcion = response.data.data[0].descripcion;
                    this.tiempo_emprendimiento = response.data.data[0].tiempo_emprendimiento;
                    this.horarios_atencion = response.data.data[0].horarios_atencion;
                    this.direccion = response.data.data[0].direccion;
                    this.telefono_contacto = response.data.data[0].telefono_contacto;
                    this.email_contacto = response.data.data[0].email_contacto;
                    this.sitio_web = response.data.data[0].sitio_web;
                    this.redes_sociales = response.data.data[0].redes_sociales;
                    this.est = response.data.data[0].estado_empren;
                    this.updated_at = response.data.data[0].updated_at;
                    this.logo = response.data.data[0].logo;
                    this.fotografia2 = response.data.data[0].fotografia2;
                    this.fotografia = response.data.data[0].fotografia;
                    this.previewFotologo = 'data:image/png;base64,' + this.logo;
                    this.previewFoto2 = 'data:image/png;base64,' + this.fotografia2;
                    this.previewFoto = 'data:image/png;base64,' + this.fotografia;
                    if (this.est == 1) {
                        this.estado_empren = "Disponible"
                    } else if (this.est == 2) {
                        this.estado_empren = "En Revisión"
                    }
                    else {
                        this.estado_empren = "No Disponible"
                    }

                }

            } catch (error) {
                console.error('Error fetching data:', error);

            }


        },
        async eliminar(id, nombre) {
            try {
                const w = await confimar(
                    `${__API_BOLSA__}/b_e/vin/consultaredirempelim/`,
                    id,
                    'No aprobar Emprendimiento',
                    '¿Realmente desea no aprobar el emprendimiento  ' + nombre + '?',
                    () => {
                        this.botonesBloqueados = true; // ✅ Deshabilitar todos
                        this.actualizar();
                    }     // 👈 callback para refrescar la tabla al confirmar
                );
                if (w.mensaje === 'Inhabilitado con Éxito!!') {
                    this.urlinformacionpersonal += '/' + w.data.CIInfPer;
                    const response = await axios.get(this.urlinformacionpersonal);
                    const data = response.data.data[0];
                    const apellidos = data.ApellInfPer + ' ' + data.ApellMatInfPer + ' ' + data.NombInfPer;
                    const responseCorreo = await axios.post(`${__API_BOLSA__}/b_e/vin/enviar-rechazo-emprendimiento`, {

                        email: w.data.email_contacto,
                        firts_name: apellidos,
                        company_name: nombre,

                    });
                    if (responseCorreo.status === 200) {
                        console.log('Correo enviado y emprendimiento no aprobado', 'success');

                        this.actualizar();
                        this.$router.push('/emprendimientosall/' + this.ide);

                    } else {
                        // Si hubo un error al enviar el correo, mostrar mensaje de error
                        console.log('error al enviar el correo electrónico');
                        this.actualizar();
                        this.$router.push('/emprendimientosall/' + this.ide);
                    }
                }
            } catch (error) {
                console.error("Error al eliminar el emprendimiento:", error);
                this.cargando = false;
            }
        },
        actualizar() {

        },
        async habilitar(id, nombre) {
            try {
                const w = await confimarhabi(
                    `${__API_BOLSA__}/b_e/vin/consultaredirempelim2/`,
                    id,
                    'Aprobar Emprendimiento',
                    '¿Desea aprobar el emprendimiento ' + nombre + '?',
                    () => {
                        this.botonesBloqueados = true; // ✅ Deshabilitar todos
                        this.actualizar();
                    }     // 👈 callback para refrescar la tabla al confirmar
                );

                if (w.mensaje === 'Habilitado con Éxito!!') {
                    this.urlinformacionpersonal += '/' + w.data.CIInfPer;
                    const response = await axios.get(this.urlinformacionpersonal);
                    const data = response.data.data[0];
                    const apellidos = data.ApellInfPer + ' ' + data.ApellMatInfPer + ' ' + data.NombInfPer;
                    const responseCorreo = await axios.post(`${__API_BOLSA__}/b_e/vin/enviar-aprobacion-emprendimiento`, {

                        email: w.data.email_contacto,
                        firts_name: apellidos,
                        company_name: nombre,

                    });
                    if (responseCorreo.status === 200) {
                        console.log('Correo enviado y emprendimiento aprobado con éxito', 'success');

                        this.actualizar();
                        this.$router.push('/emprendimientosall/' + this.ide);

                    } else {
                        // Si hubo un error al enviar el correo, mostrar mensaje de error
                        console.log('error al enviar el correo electrónico');
                        this.actualizar();
                        this.$router.push('/emprendimientosall/' + this.ide);
                    }
                }

            } catch (error) {
                console.error("Error al aprobar el emprendimiento:", error);
                this.cargando = false;
            }
        },



    },
    mixins: [script2],
    name: 'createdofertaemprendimiento',
};
</script>