<template>
    <!-- Perfil de Empresa -->
    <div class="container-fluid py-3">
        <div class="container-fluid py-3" v-if="mostrarOpciones2">
            <h1 class="mb-4">Perfil</h1>
            <h5 class="text-dark">
                Este es el apartado de su perfil. Aquí visualizará la información que usted tiene
                en el sistema SIAD de la UTLVTE. Si su información no carga pruebe ingresando al
                sistema
                <a href="https://estudiante.utelvt.edu.ec/login" target="_blank" rel="noopener noreferrer">SIAD</a>
                para revisar su información o editarla
            </h5>
            <br />
            <div class="formperfil" action="">
                <div class="row g-5">
                    <div class="col-md-12 col-lg-6 col-xl-7">
                        <div class="row">
                            <div class="col-md-12 col-lg-3">
                                <div class="text-center">
                                    <img :src="getFotoUrl(CIInfPer)" alt="Foto del estudiante"
                                         width="100%" height="300"
                                        style="border-radius: 10px; object-fit: cover"
                                        @error.once="$event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/480px-User_icon_2.svg.png'" />
                                   
                                </div>
                               
                            </div>
                            <div class="col-md-12 col-lg-6">
                                <div class="form-item w-100">
                                    <label class="form-label my-3 text-dark">Cédula<sup>*</sup></label>
                                    <input type="text" class="form-control text-dark" v-model="CIInfPer" id="nombre"
                                        disabled />
                                </div>
                                <div class="form-item w-100">
                                    <label class="form-label my-3 text-dark">Nombres<sup>*</sup></label>
                                    <input type="text" class="form-control text-dark" v-model="NombInfPer" id="nombre"
                                        disabled />
                                </div>
                                <div class="form-item w-100">
                                    <label class="form-label my-3 text-dark">Apellidos<sup>*</sup></label>
                                    <input type="text" class="form-control text-dark" v-model="apellidos" id="apellido"
                                        disabled />
                                </div>
                            </div>
                        </div>
                        <div class="form-item w-100">
                            <label class="form-label my-3 text-dark">Email<sup>*</sup></label>
                            <input type="email" class="form-control text-dark" v-model="mailPer" id="email" disabled />
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3 text-dark">Direccion<sup>*</sup></label>
                            <input type="text" class="form-control text-dark" v-model="DirecDomicilioPer" id="direccion"
                                disabled />
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3 text-dark">Telefono<sup>*</sup></label>
                            <input type="tel" class="form-control text-dark" v-model="Telf1InfPer" id="telf" disabled />
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-5">
                        <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                            <div class="text-center" v-if="no_cvn">
                                <h4 class="mb-4">
                                    ¡Vaya! parece que no tienes una hoja de vida. Si aún no has realizado tu
                                    hoja de vida, puedes dar ir a la página del
                                    <a href="http://192.168.1.19/cvn/home"
                                        target="_blank">CVN</a>
                                    que la UTLVTE implementó <br />
                                </h4>
                            </div>
                            <div class="text-center" v-if="cvcompleto">
                                <h4 class="mb-4">
                                    El sistema ha detectado que tienes tu hoja de vida completa en la plataforma CVN, puedes visualizarlo en el botón de abajo <br />
                                    También puedes editar tu CVN dando clic
                                    <a href="http://192.168.1.19/cvn/home" target="_blank"
                                        rel="noopener noreferrer">aquí</a>
                                </h4>
                            </div>
                            <div class="text-center" v-if="cvincompleto">
                                <h4 class="mb-4">
                                    El sistema ha detectado que tienes tu hoja de vida incompleta en la plataforma CVN, puedes visualizarlo en el botón de abajo <br />
                                    También puedes editar tu CVN dando clic
                                    <a href="http://192.168.1.19/cvn/home" target="_blank"
                                        rel="noopener noreferrer">aquí</a>
                                </h4>
                            </div>
                        </div>

                        <div class="row g-4 text-center align-items-center justify-content-center pt-4" v-if="cvcompleto || cvincompleto">
                            <button v-on:click="visualizarCV" type="button"
                                class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">
                                Visualizar mi hoja de Vida
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid py-3" v-if="mostrarOpciones || mostrarOpciones3">
            <h1 class="mb-4">Perfil</h1>
            <h5 class="text-danger" v-if="mostrarOpciones">
                Este es el apartado de su perfil. Aquí visualizará la información de su empresa y
                podrá editar los datos
            </h5>
            <h5 class="text-danger" v-if="mostrarOpciones3">
                Este es el apartado de su perfil. Aquí visualizará la información de su usuario.
                Solo podrá modificar datos como: nombre de usuario y clave; posterior a ellos debe
                dar clic en ACTUALIZAR PERFIL, para guardar la información. Para modificar el rol
                debe comunicarse con la dirección de vinculación con la sociedad.
            </h5>
            <div class="formperfil" action="">
                <div class="row g-5 justify-content-center">
                    <div class="col-md-12 col-lg-12 col-xl-6">
                        <!-- Campo Nombre con tooltip -->
                        <div class="col-md-12 col-lg-12">
                            <div class="form-item w-100">
                                <label class="form-label my-3 text-dark">Nombre de Usuario<sup>*</sup></label>
                                <div class="input-with-icon">
                                    <input type="text" class="form-control text-dark" v-model="nombre" id="nombre"
                                        required />
                                    <!-- Icono Nombre -->
                                    <span class="help-icon" @mouseenter="showTooltipNombre = true"
                                        @mouseleave="hideOnLeave('nombre')" @click.stop="toggleTooltip('nombre')"
                                        ref="tooltipIconNombre">❓</span>

                                    <!-- Tooltip Nombre -->
                                    <div v-if="showTooltipNombre" class="tooltip-box tooltip-box-top"
                                        ref="tooltipBoxNombre" @mouseenter="hoveringTooltipNombre = true"
                                        @mouseleave="hideOnLeave('nombre')">
                                        Ingrese el nombre usuario que desee.
                                        <div class="tooltip-arrow tooltip-arrow-down"></div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="form-item">
                            <label class="form-label my-3 text-dark">Password<sup>*</sup></label>
                            <div class="input-with-icon">

                                <input :type="showPassword ? 'text' : 'password'" class="form-control text-dark"
                                    v-model="password" id="password" required />


                                <!-- Icono password -->
                                <span class="help-icon" @mouseenter="showTooltippassword = true"
                                    @mouseleave="hideOnLeave('password')" @click.stop="toggleTooltip('password')"
                                    ref="tooltipIconpassword">❓</span>

                                <!-- Tooltip password -->
                                <div v-if="showTooltippassword" class="tooltip-box tooltip-box-top"
                                    ref="tooltipBoxpassword" @mouseenter="hoveringTooltippassword = true"
                                    @mouseleave="hideOnLeave('password')">
                                    Ingrese el password usuario que desee.
                                    <div class="tooltip-arrow tooltip-arrow-down"></div>
                                </div>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="flexCheckDefault"
                                    v-model="showPassword">
                                <label class="form-check-label text-dark" for="flexCheckDefault">
                                    Mostrar clave
                                </label>
                            </div>


                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-xl-6">
                        <div class="form-item">
                            <label class="form-label my-3 text-dark">Email<sup>*</sup></label>
                            <input type="email" class="form-control text-dark" v-model="email" id="email" required
                                disabled />
                        </div>

                        <div class="form-item">
                            <label class="form-label my-3 text-dark">Rol<sup>*</sup></label>
                            <input type="text" class="form-control text-dark" v-model="rol" id="rol" disabled />
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-xl-6">
                        <div class="row g-4 text-center align-items-center justify-content-center pt-2">
                            <button v-on:click="actualizar" type="button"
                                class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">
                                Actualizar Perfil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
@import url("@/assets/styles/styles.css");
</style>
<script>
import editar from "@/assets/scripts/scriptfunciones/editar.js";
import customscript from "@/assets/scripts/custom.js";
export default {

    mixins: [editar, customscript],
    name: 'perfilusuario',
    data() {
        return {
            // Estado del tooltip Nombre
            showTooltipNombre: false, hoveringTooltipNombre: false,
            showTooltippassword: false, hoveringTooltippassword: false,
            showPassword: false, // 🔹 por defecto oculto
            showTooltippassword: false,
            hoveringTooltippassword: false


        };
    },
    methods: {
        toggleTooltip(field) {
            if (field === "nombre") this.showTooltipNombre = !this.showTooltipNombre;
            if (field === "password") this.showTooltippassword = !this.showTooltippassword;

        },
        hideOnLeave(field) {
            setTimeout(() => {
                if (field === "nombre" && !this.hoveringTooltipNombre) this.showTooltipNombre = false;
                if (field === "password" && !this.hoveringTooltippassword) this.showTooltippassword = false;
            }, 200);
        },
        handleClickOutside(event) {
            const refs = [
                ["tooltipIconNombre", "tooltipBoxNombre", "showTooltipNombre"],
                ["tooltipIconpassword", "tooltipBoxpassword", "showTooltippassword"],
            ];
            refs.forEach(([iconRef, boxRef, state]) => {
                const icon = this.$refs[iconRef];
                const box = this.$refs[boxRef];
                if (icon && box && !icon.contains(event.target) && !box.contains(event.target)) {
                    this[state] = false;
                }
            });
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
