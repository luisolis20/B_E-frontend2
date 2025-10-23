<template>
    <div class="container-fluid py-3">
        <div class="container-fluid py-3">
            <h1 class="display-5 mb-4" style="text-align: center;"> Ofertas de emprendimientos creadas </h1>
            <p class="text-dark text-center">En este apartado tendrás todos tus ofertas creadas. Para que tus ofertas estén disponibles deben ser aprobadas por
            la Dirección de Vincualción con la Sociedad de la UTLVTE. Hasta que estén aprobadas, solo podrás editarlas dando clic en el ícono: <button class="btn btn-warning"><i class="fa-solid fa-edit"></i></button> </p>
            <small class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Estas son tus Ofertas Creadas</small>
                    
           
            <div class="row gx-4 gy-3 d-flex">
                    <div class="mb-3 col-sm-2 col-md-2 col-xl-2">
                        <label for="filtroEstado" class="form-label fw-bold text-dark">Filtrar por estado de la oferta:</label>
                        <select v-model="filtroEstado" @change="filtrarOfertas" class="form-select text-dark" id="filtroEstado">
                            <option value="todas">Todas</option>
                            <option value="vigente">Oferta Vigente</option>
                            <option value="caducada">Oferta Caducada</option>
                        </select>
                    </div>
                    <div class="mb-3 col-sm-6 col-md-6 col-xl-5 align-self-center">
                        <label for="categoriaSeleccionada" class="form-label fw-bold text-dark">Filtrar por categoría:</label>
                        <select v-model="categoriaSeleccionada" @change="filtrarCaTegirias" class="form-select text-dark" id="categoriaSeleccionada">
                            <option value="Categorías / Área">Categorías / Área</option>
                            <option value="Administración y RRHH">Administración y RRHH</option>
                            <option value="Arquitectura y Producción">Arquitectura y Producción</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Comercial, Negocios y Atención al público">Comercial, Negocios y Atención al público</option>
                            <option value="Educación y Docencia">Educación y Docencia</option>
                            <option value="Hotelería, Gastronomía y Turismo">Hotelería, Gastronomía y Turismo</option>
                            <option value="Ingenierías">Ingenierías</option>
                            <option value="Logística y Abastecimiento">Logística y Abastecimiento</option>
                            <option value="Marketing, Publicidad, Comunicación y Diseño">Marketing, Publicidad, Comunicación y Diseño</option>
                            <option value="Oficios">Oficios</option>
                            <option value="Producción y Operarios">Producción y Operarios</option>
                            <option value="Salud, Medicina, Farmacia y Bioquímica">Salud, Medicina, Farmacia y Bioquímica</option>
                            <option value="Secretaría y Recepción">Secretaría y Recepción</option>
                            <option value="Seguridad y Vigilancia">Seguridad y Vigilancia</option>
                            <option value="Tecnología y Sistemas">Tecnología y Sistemas</option>
                            <option value="Textil">Textil</option>
                            <option value="Ventas">Ventas</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </div>
             
            </div>    
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Título</th>
                            <th scope="col">Jornada</th>
                            <th scope="col">Tipo de contrato</th>
                            <th scope="col">Modalidad</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Registrado/Actualizado</th>
                            <th scope="col">Finalización de la Oferta</th>
                            <th scope="col">Cant. Post</th>
                            <th scope="col">Estado de la Oferta</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                       <tr v-if="this.cargando">
                            <td colspan="7"><h3>Cargando....</h3></td>
                       </tr>
                       <tr v-else v-for="ofe,  in this.filteredofertas" :key="ofe.id">
                            
                            <td v-text="ofe.id"></td>
                            <td v-text="ofe.titulo"></td>
                            <td v-text="ofe.jornada"></td>
                            <td v-text="ofe.tipo_contrato"></td>
                            <td v-text="ofe.modalidad"></td>
                            <td v-text="ofe.categoria"></td>
                            <td>{{ formatFecha(ofe.updated_at) }}</td>
                            <td>{{ new Date(ofe.fechaFinOferta).toLocaleDateString('es-EC', {
                                timeZone:
                                    'America/Guayaquil'
                            }) }}
                                <label v-if="new Date(ofe.fechaFinOferta) <= new Date()"
                                    class="text-danger fw-bold">(Oferta Caducada)</label>
                                <label v-else class="text-success fw-bold">(Oferta Vigente)</label>
                            </td>
                           <td class="text-center">({{ ofe.total_postulados }})</td>
                            <td>
                                <button v-if="ofe.estado_ofert_empr == 1" class="btn btn-success fw-bold">
                                    Habilitado</button>
                                <button v-if="ofe.estado_ofert_empr == 0" class="btn btn-danger fw-bold">
                                    Deshabilitado</button>
                                    <label for="" class="text-info fw-bold" v-if="ofe.estado_ofert_empr == 2">En
                                    revisión</label>
                            </td>
                            <td>
                                <router-link :to="{path:'/postuladosempr/'+ofe.id}" class="btn btn-info" v-if="ofe.total_postulados > 0">
                                   Ver postulados
                                </router-link>
                                &nbsp;
                                <router-link :to="{path:'/ofertaseditemp/'+ ofe.emprendimiento_id + '/' + ofe.id}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;
                               
                            </td>
                       </tr>
                        
                    </tbody>
                </table>
                <div v-if="filteredofertas.length === 0" class="text-center">
                        <h3>No hay ofertas creadas</h3>
                </div><br>
            </div>
             <div class="d-flex justify-content-center mb-4">
                <button @click="previousPage" :disabled="currentPage === 1 || buscando" class="btn btn-primary text-white">
                    Anterior
                </button>&nbsp;
                <span class="text-dark">Página {{ currentPage }} de {{ lastPage }}</span>&nbsp;
                <button @click="nextPage" :disabled="currentPage === lastPage || buscando" class="btn btn-primary text-white">
                    Siguiente
                </button>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="d-flex justify-content-center">
                <button class="btn btn-primary text-white" @click="actualizar">Actualizar Datos</button>
            </div>
           
            
        </div>
        
        <div class="alert alert-info d-flex justify-content-around fw-bold text-dark">
            <div>Total de Ofertas: {{ totalOfertas }}</div>
            <div>Ofertas Vigentes: <span class="text-success">{{ ofertasVigentes }}</span></div>
            <div>Ofertas Caducadas: <span class="text-danger">{{ ofertasCaducadas }}</span></div>
        </div>
    </div>
<!-- Cart Page End -->
</template>
<style>
@import url('@/assets/styles/styles.css');

</style>
<script>
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    import { confimar } from '@/assets/scripts/scriptfunciones/funciones';
    import { getMe } from '@/store/auth';
    import script2 from '@/assets/scripts/custom.js';
    export default{
        data(){
            return{
                ide:0,
                idus:0,
                url21:'http://backendbolsaempleo.test/api/b_e/vin/oferta_empleos_emprendimiento',
                ofertas:[],
                filteredofertas: [],
                searchQuery: '',
                cargando:false,
                currentPage: 1,
                lastPage: 1,
                filtroEstado: 'todas',
                categoriaSeleccionada: 'Categorías / Área',
                totalOfertas: 0,
                ofertasVigentes: 0,
                ofertasCaducadas: 0,
            }
        },
        
        async mounted(){
            const ruta = useRoute();
            const usuario = await getMe();
            this.idus = ruta.params.id;
            this.url21 +=  '/'+this.idus;
            //console.log(this.url21);
            this.getOFertas();
            
        },
        
        methods:{
            async getOFertas() {
                this.cargando=true;
                try {
                    const response = await axios.get(`${this.url21}?all=true`);
                    const allData = response.data.data;

                    this.ofertas = allData;
                    this.contarOfertas();
                    this.lastPage = Math.ceil(this.ofertas.length / 10);
                    this.updateFilteredData();
                } catch (error) {
                    console.error("Error al obtener datos:", error);
                } finally {
                    this.cargando = false;
                }
            },
            contarOfertas() {
                const ahora = new Date();
                this.totalOfertas = this.ofertas.length;
                this.ofertasVigentes = this.ofertas.filter(ofe => new Date(ofe.fechaFinOferta) > ahora).length;
                this.ofertasCaducadas = this.ofertas.filter(ofe => new Date(ofe.fechaFinOferta) <= ahora).length;
            },
            updateFilteredData() {
                let filtradas = this.ofertas;

                if (this.filtroEstado === 'vigente') {
                    filtradas = filtradas.filter(ofe => new Date(ofe.fechaFinOferta) > new Date());
                } else if (this.filtroEstado === 'caducada') {
                    filtradas = filtradas.filter(ofe => new Date(ofe.fechaFinOferta) <= new Date());
                }else if(this.categoriaSeleccionada !== 'Categorías / Área') {
                    filtradas = filtradas.filter(ofe => ofe.categoria === this.categoriaSeleccionada);
                }

                // Aplicar paginación local
                const startIndex = (this.currentPage - 1) * 10;
                const endIndex = startIndex + 10;
                this.filteredofertas = filtradas.slice(startIndex, endIndex);

                // Actualizar total de páginas (si quieres que se actualice también el número de páginas)
                this.lastPage = Math.ceil(filtradas.length / 10);
            },
            filtrarOfertas() {
                this.currentPage = 1; // Reinicia a la primera página
                this.updateFilteredData();
            },
            filtrarCaTegirias() {
                this.currentPage = 1; // Reinicia a la primera página
                this.updateFilteredData();
            },
 
            actualizar() {
                this.cargando = true;
                this.filtroEstado= 'todas';
                this.categoriaSeleccionada= 'Categorías / Área';
                this.getOFertas()
            },
             nextPage() {
                if (this.currentPage < this.lastPage) {
                    this.currentPage++;
                    this.updateFilteredData();
                }
            },
            previousPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.updateFilteredData();
                }
            },
            eliminar(id,nombre){
                try {
                    confimar('http://backendbolsaempleo.test/api/b_e/vin/oferta_empleos_emprendimiento/',id,'Eliminar registro','¿Realmente desea eliminar la oferta'+nombre+'?', this.actualizar);
                    
                } catch (error) {
                    console.error("Error al eliminar:", error);
                    this.cargando = false;
                }
               

            }
        },
        mixins: [script2],
        name: 'viewofertasemprendimientos',
    }
</script>