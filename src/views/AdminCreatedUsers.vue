<template>
    <!-- Perfil de Empresa -->
    <div class="container-fluid py-2">
        <div class="container py-2">
            <h1 class="mb-4">Crear Usuarios</h1>
            <br>
            <p class="text-dark">Aquí solo puedes crear usuarios de tipo empresa y administrador</p>
            <form action="">
                <div class="row g-5">
                    <div class="col-md-12 col-lg-6 col-xl-12 text-dark">
                        <!-- Campo Nombre con tooltip -->
                        <div class="col-md-12 col-lg-12">
                            <div class="form-item w-100">
                                <label class="form-label my-3 text-dark">Nombre de Usuario<sup>*</sup></label>
                                <div class="input-with-icon">
                                    <input type="text" class="form-control text-dark" v-model="nombre" id="nombre"
                                       autocomplete="off" required />
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
                            <label class="form-label my-3">Email<sup>*</sup></label>
                            <div class="input-with-icon">
                                <input type="email" class="form-control text-dark" v-model="email" id="email"
                                   autocomplete="off" required />
                                <!-- Icono email -->
                                <span class="help-icon" @mouseenter="showTooltipemail = true"
                                    @mouseleave="hideOnLeave('email')" @click.stop="toggleTooltip('email')"
                                    ref="tooltipIconemail">❓</span>

                                <!-- Tooltip email -->
                                <div v-if="showTooltipemail" class="tooltip-box tooltip-box-top" ref="tooltipBoxemail"
                                    @mouseenter="hoveringTooltipemail = true" @mouseleave="hideOnLeave('email')">
                                    Ingrese el email usuario que desee.
                                    <div class="tooltip-arrow tooltip-arrow-down"></div>
                                </div>
                            </div>
                        </div>

                        <div class="form-item">
                            <label class="form-label my-3">Password<sup>*</sup></label>
                            <div class="input-with-icon">

                                <input :type="showPassword ? 'text' : 'password'" class="form-control text-dark"
                                    v-model="password" autocomplete="off" id="password" required />


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
                        <div class="form-item">
                            <label class="form-label my-3">Rol<sup>*</sup></label>
                            <div class="input-with-icon">
                                <select v-model="rol" id="rol" class="form-control text-dark">
                                    <option value="" disabled selected>Seleccione el rol del usuario</option>
                                    <option value="Administrador">Administrador
                                    </option>
                                    <option value="Empresa">Empresa
                                    </option>

                                </select>
                                <!-- Icono rol -->
                                <span class="help-icon" @mouseenter="showTooltiprol = true"
                                    @mouseleave="hideOnLeave('rol')" @click.stop="toggleTooltip('rol')"
                                    ref="tooltipIconrol">❓</span>

                                <!-- Tooltip rol -->
                                <div v-if="showTooltiprol" class="tooltip-box tooltip-box-top" ref="tooltipBoxrol"
                                    @mouseenter="hoveringTooltiprol = true" @mouseleave="hideOnLeave('rol')">
                                    Debe seleccionar el rol del usuario a crear.
                                    <div class="tooltip-arrow tooltip-arrow-down"></div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-5">

                        <div class="row g-4 text-center align-items-center justify-content-center pt-2">
                            <button v-on:click="guardar" type="button"
                                class="btn border-secondary py-3 px-2 text-uppercase w-100 text-primary">Crear
                                Usuario</button>
                        </div>


                    </div>

                </div>

            </form>
        </div>
    </div>

    <!-- Modal de Verificación de Código -->
    <div class="modal fade show d-block" tabindex="-1" aria-labelledby="modalVerificacionLabel" aria-hidden="true"
        v-if="mostrarModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <!-- Encabezado -->
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-dark" id="modalVerificacionLabel">Verificación de Correo</h1>
                </div>

                <!-- Cuerpo -->
                <div class="modal-body">
                    <form @submit.prevent="verificarCodigo">
                        <div class="mb-3">
                            <label for="codigo-verificacion" class="col-form-label text-dark">Ingrese el código enviado a su
                                correo:</label>
                            <input type="text" class="form-control text-dark" id="codigo-verificacion" v-model="codigov" required>
                        </div>
                        <p class="text-danger" v-if="intentosRestantes < 3">
                            Intentos restantes: {{ intentosRestantes }}
                        </p>
                    </form>
                </div>

                <!-- Footer -->
                <div class="modal-footer">
                    <button type="button" class="btn text-secondary" @click="cerrarModal">Cancelar</button>
                    <button type="button" class="btn text-primary" @click="verificarCodigo">Validar Código</button>
                </div>
            </div>
        </div>
    </div>

</template>
<style>
@import url('@/assets/styles/styles.css');
</style>
<script>
import script2 from '@/assets/scripts/scriptfunciones/datas.js';

export default {
    mixins: [script2],
    data() {
        return {
            // Estado del tooltip Nombre
            showTooltipNombre: false, hoveringTooltipNombre: false,
            showTooltippassword: false, hoveringTooltippassword: false,
            showTooltipemail: false, hoveringTooltipemail: false,
            showTooltiprol: false, hoveringTooltiprol: false,
            showPassword: false, // 🔹 por defecto oculto


        };
    },
    methods: {
        toggleTooltip(field) {
            if (field === "nombre") this.showTooltipNombre = !this.showTooltipNombre;
            if (field === "password") this.showTooltippassword = !this.showTooltippassword;
            if (field === "email") this.showTooltipemail = !this.showTooltipemail;
            if (field === "rol") this.showTooltiprol = !this.showTooltiprol;

        },
        hideOnLeave(field) {
            setTimeout(() => {
                if (field === "nombre" && !this.hoveringTooltipNombre) this.showTooltipNombre = false;
                if (field === "password" && !this.hoveringTooltippassword) this.showTooltippassword = false;
                if (field === "email" && !this.hoveringTooltipemail) this.showTooltipemail = false;
                if (field === "rol" && !this.hoveringTooltiprol) this.showTooltiprol = false;
            }, 200);
        },
        handleClickOutside(event) {
            const refs = [
                ["tooltipIconNombre", "tooltipBoxNombre", "showTooltipNombre"],
                ["tooltipIconpassword", "tooltipBoxpassword", "showTooltippassword"],
                ["tooltipIconemail", "tooltipBoxemail", "showTooltipemail"],
                ["tooltipIconrol", "tooltipBoxrol", "showTooltiprol"],
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