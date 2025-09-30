<template>
    <div class="container-fluid py-5">
        <div class="container py-5">
            <h1 class="display-5 mb-4" style="text-align: center;"> Todos los Usuarios</h1>
            <small
                class="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Estas son todos los Usuarios</small>

            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="row gx-4 gy-3 d-flex justify-content-center">
                <div class="col-lg-12">
                    <form class="d-none d-md-flex ms-4">
                        <input class="form-control py-3 border-1 text-dark" type="search" placeholder="Buscar"
                            v-model="searchQuery" @input="filterResults" @keypress="onlyNumbers">
                    </form>
                </div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="table-container">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Email</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Registrado</th>
                            <th scope="col">Actualizado</th>
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="contenido">
                        <tr v-if="this.cargando">
                            <td colspan="8">
                                <h3>Cargando....</h3>
                            </td>
                        </tr>
                        <tr v-else v-for="user,  in this.filteredusuarios" :key="user.id">

                            <td v-text="user.id"></td>
                            <td v-if="user.id == this.idus">Yo</td>
                            <td v-else v-text="user.name"></td>
                            <td v-text="user.email"></td>
                            <td v-text="user.role"></td>

                            <td v-text="formatFecha(user.created_at)"></td>
                            <td v-text="formatFecha(user.updated_at)"></td>
                            <td>
                                <button v-if="user.estado == 1" class="btn btn-success fw-bold">
                                    Habilitado</button>
                                <button v-if="user.estado == 0" class="btn btn-danger fw-bold">Deshabilitado</button>
                            </td>
                            <td>
                                <router-link :to="{ path: '/perfil/' + this.idus }" class="btn btn-warning"
                                    v-if="user.id == this.idus">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                <router-link :to="{ path: '/useredit/' + user.id }" class="btn btn-warning"
                                    v-if="user.role != 'Estudiante' && user.id != this.idus">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                                &nbsp;
                                <button v-if="user.role != 'Estudiante' && user.estado == 1 && user.id != this.idus"
                                    class="btn btn-danger" v-on:click="eliminar(user.id, user.name)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                                <button v-if="user.role != 'Estudiante' && user.estado == 0 && user.id != this.idus"
                                    class="btn btn-success" v-on:click="habilitar(user.id, user.name)">
                                    <i class="fas fa-redo"></i>
                                </button>


                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div v-if="filteredusuarios.length === 0" class="text-center">
                <h3>No hay ofertas disponibles</h3>
            </div>
            <div class="mt-5">
                <label class="border-0 border-bottom rounded me-5 py-3 mb-4 text-dark">Para crear usuarios</label>
                <router-link :to="{ path: '/usercreated/' + idus }"
                    class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Haz Click
                    Aquí</router-link>
            </div>


        </div>

        <div class="d-flex justify-content-center mb-4">
            <button @click="previousPage" :disabled="currentPage === 1 || buscando" class="btn btn-primary text-white">
                Anterior
            </button>&nbsp;
            <span class="text-dark">Página {{ currentPage }} de {{ lastPage }}</span>&nbsp;
            <button @click="nextPage" :disabled="currentPage === lastPage || buscando"
                class="btn btn-primary text-white">
                Siguiente
            </button>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div class="d-flex justify-content-center">
            <button class="btn btn-primary text-white" @click="actualizar">Actualizar Datos</button>
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
import { getMe } from '@/store/auth';
import { useRoute } from 'vue-router';
import { confimar, confimarhabi } from '@/assets/scripts/scriptfunciones/funciones';
export default {
    data() {
        return {
            idus: 0,
            url255: 'http://backendbolsaempleo.test/api/b_e/vin/users',
            usuariosarr: [],
            filteredusuarios: [],
            searchQuery: '',
            cargando: false,
            currentPage: 1,
            lastPage: 1,
            buscando: false,
        }
    },
    async mounted() {

        /*const ruta = useRoute();
        this.idus = ruta.params.id;*/
        const usuario = await getMe();
        if (usuario.role == 'Estudiante') {
           this.idus = usuario.CIInfPer;
        } else {
            this.idus= usuario.id;
        }
        this.getUsers();
    },

    methods: {
        async getUsers() {
            this.cargando = true;
            try {
                const response = await axios.get(`${this.url255}?all=true`);
                const allData = response.data.data;

                this.usuariosarr = allData;
                this.lastPage = Math.ceil(this.usuariosarr.length / 10);
                this.updateFilteredData();
            } catch (error) {
                console.error("Error al obtener datos:", error);
            } finally {
                this.cargando = false;
            }

        },
        updateFilteredData() {
            // Aplicar paginación local
            const startIndex = (this.currentPage - 1) * 10;
            const endIndex = startIndex + 10;
            this.filteredusuarios = this.usuariosarr.slice(startIndex, endIndex);
        },
        actualizar() {
            this.cargando = true;
            this.getUsers()
        },
        filterResults() {
            const query = this.searchQuery.trim();
            if (query) {
                this.buscando = true;
                this.filteredusuarios = this.usuariosarr.filter(inves =>
                    inves.name.includes(query)
                );
            } else {
                this.buscando = false;
                this.actualizar();
            }
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
        eliminar(id, nombre) {
            try {
                confimar('http://backendbolsaempleo.test/api/b_e/vin/users/',
                    id, 'Inhabilitar registro',
                    '¿Realmente desea inhabilitar el usuario  ' + nombre + '?',
                    this.actualizar
                );

            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
                this.cargando = false;
            }

        },
        habilitar(id, nombre) {
            try {
                confimarhabi(
                    'http://backendbolsaempleo.test/api/b_e/vin/usershabi/',
                    id,
                    'Hbailitar registro',
                    '¿Desea habilitar el usuario ' + nombre + '?',
                    this.actualizar   // 👈 callback para refrescar la tabla al confirmar
                );
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
                this.cargando = false;
            }
        },
        formatFecha(fecha) {
            if (!fecha) return '';
            // Convierte a objeto Date (JS entiende bien "YYYY-MM-DD HH:mm:ss" si es ISO)
            const normalizada = fecha.replace(' ', 'T');
            return new Date(normalizada + '-05:00').toLocaleString('es-EC', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        },

    },
    mixins: [script2],
}
</script>