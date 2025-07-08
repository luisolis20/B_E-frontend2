<template>
    <!-- Perfil de Empresa -->
    <div class="container-fluid py-3">
        <div class="container-fluid py-3" v-if="mostrarOpciones2">
            <h1 class="mb-4">Perfil</h1>
            <h5 class="text-danger">Este es el apartado de su perfil. Aquí visualizará la información que usted tiene en el sistema SIAD de la UTLVTE. Si su información no carga pruebe ingresando al sistema 
            <a href="https://estudiante.utelvt.edu.ec/login" target="_blank" rel="noopener noreferrer">SIAD</a> para revisar su información</h5>
            <div class="formperfil" action="">
                <div class="row g-5">
                    <div class="col-md-12 col-lg-6 col-xl-7">
                        <div class="row">
                            <div class="col-md-12 col-lg-6">
                                <div class="form-item w-100">
                                    <label class="form-label my-3 text-dark">Cédula<sup>*</sup></label>
                                    <input type="text" class="form-control text-dark" v-model="CIInfPer" id="nombre" disabled>
                                </div>
                                <div class="form-item w-100">
                                    <label class="form-label my-3 text-dark">Nombres<sup>*</sup></label>
                                    <input type="text" class="form-control text-dark" v-model="NombInfPer" id="nombre" disabled>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6">
                                <div class="form-item w-100">
                                    <label class="form-label my-3 text-dark">Apellidos<sup>*</sup></label>
                                    <input type="text" class="form-control text-dark" v-model="apellidos" id="apellido" disabled>
                                </div>
                                <div class="form-item w-100">
                                    <label class="form-label my-3 text-dark">Email<sup>*</sup></label>
                                    <input type="email" class="form-control text-dark" v-model="mailPer" id="email" disabled>
                                </div>
                            </div>
                        </div>

                        <div class="form-item">
                            <label class="form-label my-3 text-dark">Direccion<sup>*</sup></label>
                            <input type="text" class="form-control text-dark" v-model="DirecDomicilioPer" id="direccion" disabled>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3 text-dark">Telefono<sup>*</sup></label>
                            <input type="tel" class="form-control text-dark" v-model="Telf1InfPer" id="telf" disabled>
                        </div>

                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-5">
                        <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                            <div class="text-center" v-if="!si_cvn">
                                <h4 class="mb-4">¡Vaya! parece que no tienes una hoja de vida. Si aún no has realizado
                                    tu hoja de vida, puedes dar ir a la página del <a href="http://vinculacionconlasociedad.utelvt.edu.ec/cvn/home" target="_blank">CVN</a>
                                    que la UTLVTE implementó <br>
                                </h4>
                            </div>
                            <div class="text-center" v-if="si_cvn">
                                <h4 class="mb-4">Parece que si tienes registrado tu hoja de vida en la página del CVN de
                                    la UTLVTE, puedes visualizarlo en el botón de abajo <br>
                                    Si deseas puedes editar tu CVN dando clic <a href="http://vinculacionconlasociedad.utelvt.edu.ec/cvn/home" target="_blank"
                                        rel="noopener noreferrer">aquí</a> </h4>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center pt-4" v-if="si_cvn">
                            <button v-on:click="visualizarCV" type="button"
                                class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Visualizar mi
                                hoja de Vida</button>
                        </div>


                    </div>

                </div>

            </div>
        </div>
        <div class="container-fluid py-3" v-if="mostrarOpciones">
            <h1 class="mb-4">Perfil</h1>
            <h5 class="text-danger">Este es el apartado de su perfil. Aquí visualizará la información de su empresa y podrá editar los datos</h5>
            <div class="formperfil" action="">
                <div class="row g-5">
                    <div class="col-md-12 col-lg-6 col-xl-7">
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <div class="form-item w-100">
                                    <label class="form-label my-3 text-dark">Nombres de Usuario<sup>*</sup></label>
                                    <input type="text" class="form-control text-dark" v-model="nombre" id="nombre" required>
                                </div>
                            </div>
                            
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3 text-dark">Email<sup>*</sup></label>
                            <input type="email" class="form-control text-dark" v-model="email" id="email" required>
                        </div>

                        <div class="form-item">
                            <label class="form-label my-3 text-dark">Password<sup>*</sup></label>
                            <input type="password" class="form-control text-dark" v-model="password" id="password" required>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3 text-dark">Rol<sup>*</sup></label>
                            <input type="text" class="form-control text-dark" v-model="rol" id="rol" disabled>
                        </div>
                        
                       

                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-5">
                        <div class="row g-4 text-center align-items-center justify-content-center pt-4 text-dark">
                            <div class="text-center">
                                <img v-if="this.imagen2" height="100" :src="this.imagen2" id="fotoimg"
                                    class="img-thumbnail" alt="">
                                <img v-else style="height: 120px;"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png"
                                    id="fotoimg" class="img-thumbnail" alt="">
                                <div class="input-group mb-3 text-dark">
                                    <input v-on:change="cargarfoto" type="file"
                                        accept="image/png, image/jpeg, image/gif, image/jpg" class="form-control text-dark">
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                            <button v-on:click="actualizar" type="button"
                                class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Actualizar
                                Perfil</button>
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
import editar from '@/assets/scripts/scriptfunciones/editar.js';
import customscript from '@/assets/scripts/custom.js';
export default {

    mixins: [editar, customscript],
};
</script>