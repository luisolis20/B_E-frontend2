<template>
    <div class="container-fluid py-5">
        <div class="container-fluid py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Todas las Ofertas</h1>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estas son todas las ofertas de Empleo</small>
            <div class="col-sm-6 col-md-6 col-xl-5">
                <label class="text-dark" for="">Filtrar Ofertas Por:</label><br>

            </div>
            <div class="col-sm-6 col-md-6 col-xl-5">
                <div class="input-group-icon">
                    <select v-model="categoriaSeleccionada" class="form-select form-voyage-select input-box text-dark"
                        id="inputPersonOne">
                        <option value="" selected>
                            Categorías / Área
                        </option>
                        <option value="Administración y RRHH">Administración y RRHH</option>
                        <option value="Arquitectura y Producción">Arquitectura y Producción</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Comercial, Negocios y Atención al público">Comercial, Negocios y Atención al
                            público
                        </option>
                        <option value="Educación y Docencia">Educación y Docencia</option>
                        <option value="Hotelería, Gastronomía y Turismo">Hotelería, Gastronomía y Turismo</option>
                        <option value="Ingenierías">Ingenierías</option>
                        <option value="Logística y Abastecimiento">Logística y Abastecimiento</option>
                        <option value="Marketing, Publicidad, Comunicación y Diseño">Marketing, Publicidad, Comunicación
                            y Diseño
                        </option>
                        <option value="Oficios">Oficios</option>
                        <option value="Producción y Operarios">Producción y Operarios</option>
                        <option value="Salud, Medicina, Farmacia y Bioquímica">Salud, Medicina, Farmacia y Bioquímica
                        </option>
                        <option value="Secretaría y Recepción">Secretaría y Recepción</option>
                        <option value="Seguridad y Vigilancia">Seguridad y Vigilancia</option>
                        <option value="Tecnología y Sistemas">Tecnología y Sistemas</option>
                        <option value="Textil">Textil</option>
                        <option value="Ventas">Ventas</option>
                        <option value="Otros">Otros</option>
                    </select><span class="nav-link-icon text-800 fs--1 input-box-icon"><i class="fas fa-trophy">
                        </i></span>
                </div>
            </div>
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Categorías</th>
                            <th scope="col">Modalidad</th>
                            <th scope="col">Tipo de Contrato</th>
                            <th scope="col">Jefe</th>
                            <th scope="col">Registrado</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                        <tr v-if="this.cargando">
                            <td colspan="8">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="ofe,  in ofertasFiltradas" :key="ofe.id">

                            <td v-text="ofe.id"></td>
                            <td v-text="ofe.Empresa"></td>
                            <td v-text="ofe.titulo"></td>
                            <td v-text="ofe.categoria"></td>
                            <td v-text="ofe.modalidad"></td>
                            <td v-text="ofe.tipo_contrato"></td>
                            <td v-text="ofe.Jefe"></td>
                            <td v-text="new Date(ofe.created_at).toLocaleDateString('en-US')"></td>
                            <td>
                                <router-link :to="{path:'/postularse/'+this.idus+'/'+ofe.id}" v-if="mostrarOpciones2"
                                    class="btn btn-info">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                                &nbsp;
                                <button v-if="mostrarOpciones3" class="btn btn-danger"
                                    v-on:click="eliminar(ofe.id,ofe.Empresa)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>


                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>


        </div>
    </div>
    <!-- Cart Page End -->
</template>
<style>
@import url('@/assets/styles/styles.css');

</style>
<script>
    import script2 from '@/assets/scripts/custom.js';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    import { confimar } from '@/assets/scripts/scriptfunciones/funciones';
    export default{
        data(){
            return{
                idus:0,
                url255:'http://192.168.1.15/b_e/api/vin/consultanopostofert',
                ofertas:null,
                categoriaSeleccionada: '',
                cargando:false
            }
        },
        mounted(){
            const ruta = useRoute();
            this.idus = ruta.params.id;
            this.getOFertas();
        },
        computed: {
            // Filtrar ofertas por categoría
            ofertasFiltradas() {
            if (this.categoriaSeleccionada === '') {
                // Si no hay categoría seleccionada, mostrar todas las ofertas
                return this.ofertas;
            } else {
                // Si hay una categoría seleccionada, filtrar las ofertas
                return this.ofertas.filter(oferta => oferta.categoria === this.categoriaSeleccionada);
            }
            }
        },
       
        methods:{
            getOFertas() {
                this.cargando = true;
                axios.get(this.url255, {
                    params: { user_id: this.idus } // Enviar el id del usuario al backend
                }).then(
                    res => {
                    this.ofertas = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    this.cargando = false;
                    }
                );
            },
            eliminar(id,nombre){
                confimar('http://192.168.1.15/b_e/api/vin/oferta__empleos/',id,'Eliminar registro','¿Realmente desea eliminar a '+nombre+'?');
                this.cargando = false;
                this.$router.push('/principal/'+this.idus);

            }
           
        },
        mixins: [script2],
    }
</script>