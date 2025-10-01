import { mostraralertas, enviarsolig, enviarsoliedit } from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
import { getMe } from '@/store/auth';
import store from '@/store';
import axios from 'axios';
export default {
    data() {
        return {
            idus: 0,
            ruc: '',
            empresacorta: '',
            fotografia: '',
            previewFoto: '',
            pais: 'Ecuador',
            tipo: '',
            ciudad: '',
            telefono: '',
            emailempre: '',
            urlempre: '',
            titulorepre: '',
            nombrerepre: '',
            cargorepre: '',
            actividad: '',
            tipo_empre: '',
            fechafin: '',
            empresaproce: '',
            direccion: '',
            mision: '',
            vision: '',
            lugar: '',
            url: 'http://backendbolsaempleo.test/api/b_e/vin/empresasEM',
            ur3: 'http://backendbolsaempleo.test/api/b_e/vin/empresas',

            cargando: false,
            Errorfoto: false,
        }
    },
    async mounted() {
        const ruta = useRoute();
        const usuario = await getMe();
        this.idus = ruta.params.id;
        // this.url += '/' + this.idus;
        if (store.state.idusu != this.idus) {
            this.ur3 += '/' + this.idus;

            this.url += '/' + this.idus;
            this.getEmpresa();
        }

    },
    methods: {

        async getEmpresa() {
            try {
                const response = await axios.get(this.url);
                //console.log(response.data.data);
                if (response.data.data) {
                    this.ruc = response.data.data.ruc;
                    this.empresaproce = response.data.data.empresa;
                    this.empresacorta = response.data.data.empresacorta;
                    this.lugar = response.data.data.lugar;
                    this.direccion = response.data.data.direccion;
                    this.telefono = response.data.data.telefono;
                    this.emailempre = response.data.data.email;
                    this.urlempre = response.data.data.url;
                    this.tipo = response.data.data.tipo;
                    this.titulorepre = response.data.data.titulo;
                    this.nombrerepre = response.data.data.representante;
                    this.cargorepre = response.data.data.cargo;
                    this.actividad = response.data.data.actividad;
                    //Convertir fecha 2026-01-14 00:00:00 a dd/mm/aaaa
                    this.fechafin = response.data.data.fechafin.split(' ')[0]; // "2026-01-14"

                    //console.log(this.fechafin);
                    this.tipo_empre = response.data.data.tipoinstitucion;
                    this.pais = response.data.data.pais;
                    this.vision = response.data.data.vision;
                    this.mision = response.data.data.mision;
                    this.ciudad = response.data.data.ciudad;
                    this.fotografia = response.data.data.imagen;
                    this.previewFoto = 'data:image/jpeg;base64,' + response.data.data.imagen;
                }

            } catch (error) {
                console.error('Error al obtener la empresa:', error);
                mostraralertas('Error al obtener la empresa. Por favor, inténtelo de nuevo.', 'error');

            }


        },
        async guardar(event) {
            event.preventDefault();
            try {
                if (this.ruc == '') {
                    mostraralertas('Ingrese ruc de la empresa', 'warning', 'ruc');
                }
                else if (this.empresacorta == '') {
                    mostraralertas('Ingrese nombre de la empresa', 'warning', 'nombre');
                }
                else if (this.pais == '') {
                    mostraralertas('Ingrese pais de la empresa', 'warning', 'pais');
                }
                else if (this.tipo == '') {
                    mostraralertas('Seleccione tipo de la empresa', 'warning', 'tipo');
                }
                else if (this.ciudad == '') {
                    mostraralertas('Seleccione ciudad de la empresa', 'warning', 'ciudad');
                }
                else if (this.telefono == '') {
                    mostraralertas('Ingrese telefono de la empresa', 'warning', 'telefono');
                }
                else if (this.emailempre == '') {
                    mostraralertas('Ingrese email de la empresa', 'warning', 'emailempre');
                }
                else if (this.urlempre == '') {
                    mostraralertas('Ingrese url de la empresa', 'warning', 'urlempre');
                }
                else if (this.titulorepre == '') {
                    mostraralertas('Ingrese titulo de la empresa', 'warning', 'titulorepre');
                }
                else if (this.nombrerepre == '') {
                    mostraralertas('Ingrese nombre de la empresa', 'warning', 'nombrerepre');
                }
                else if (this.cargorepre == '') {
                    mostraralertas('Ingrese cargo de la empresa', 'warning', 'cargorepre');
                }
                else if (this.actividad == '') {
                    mostraralertas('Seleccione actividad de la empresa', 'warning', 'actividad');
                }
                else if (this.tipo_empre == '') {
                    mostraralertas('Seleccione tipo de la empresa', 'warning', 'tipo_empre');
                }
                else if (this.fechafin == '') {
                    mostraralertas('Seleccione fecha de la empresa', 'warning', 'fechafin');
                }
                else if (this.direccion == '') {
                    mostraralertas('Ingrese direccion de la empresa', 'warning', 'direccion');
                }
                else if (this.mision == '') {
                    mostraralertas('Ingrese mision de la empresa', 'warning', 'mision');
                }
                else if (this.vision == '') {
                    mostraralertas('Ingrese vision de la empresa', 'warning', 'vision');
                }
                else if (this.lugar == '') {
                    mostraralertas('Ingrese lugar de la empresa', 'warning', 'lugar');
                }

                else {
                    var parametros = {
                        ruc: this.ruc,
                        empresa: this.empresaproce,
                        empresacorta: this.empresacorta,
                        lugar: this.lugar,
                        direccion: this.direccion,
                        telefono: this.telefono,
                        email: this.emailempre,
                        url: this.urlempre,
                        tipo: this.tipo,
                        titulo: this.titulorepre,
                        representante: this.nombrerepre,
                        cargo: this.cargorepre,
                        actividad: this.actividad,
                        fechafin: this.fechafin,
                        tipoinstitucion: this.tipo_empre,
                        pais: this.pais,
                        vision: this.vision,
                        mision: this.mision,
                        ciudad: this.ciudad,
                        imagen: this.fotografia,
                        estado_empr: 1,
                        usuario_id: this.idus


                    }
                    enviarsolig('POST', parametros, 'http://backendbolsaempleo.test/api/b_e/vin/empresas', 'Empresa Creada');
                    this.$router.push('/empresas/' + this.idus);
                }

            } catch (error) {
                console.error('Error al guardar el empresa:', error);
                mostraralertas('Error al guardar el empresa. Por favor, inténtelo de nuevo.', 'error');
            }

        },
        async actualizar(event) {   
            try {
                event.preventDefault();
                if (this.ruc == '') {
                    mostraralertas('Ingrese ruc de la empresa', 'warning', 'ruc');
                } else if (this.empresacorta == '') {
                    mostraralertas('Ingrese nombre de la empresa', 'warning', 'nombre');
                } else if (this.pais == '') {
                    mostraralertas('Ingrese pais de la empresa', 'warning', 'pais');
                } else if (this.tipo == '') {
                    mostraralertas('Seleccione tipo de la empresa', 'warning', 'tipo');
                } else if (this.ciudad == '') {
                    mostraralertas('Seleccione ciudad de la empresa', 'warning', 'ciudad');
                } else if (this.telefono == '') {
                    mostraralertas('Ingrese telefono de la empresa', 'warning', 'telefono');
                } else if (this.emailempre == '') {
                    mostraralertas('Ingrese email de la empresa', 'warning', 'emailempre');
                } else if (this.urlempre == '') {
                    mostraralertas('Ingrese url de la empresa', 'warning', 'urlempre');
                } else if (this.titulorepre == '') {
                    mostraralertas('Ingrese titulo de la empresa', 'warning', 'titulorepre');
                } else if (this.nombrerepre == '') {
                    mostraralertas('Ingrese nombre de la empresa', 'warning', 'nombrerepre');
                } else if (this.cargorepre == '') {
                    mostraralertas('Ingrese cargo de la empresa', 'warning', 'cargorepre');
                } else if (this.actividad == '') {
                    mostraralertas('Seleccione actividad de la empresa', 'warning', 'actividad');
                } else if (this.tipo_empre == '') {
                    mostraralertas('Seleccione tipo de la empresa', 'warning', 'tipo_empre');
                }   else if (this.fechafin == '') {
                    mostraralertas('Seleccione fecha de la empresa', 'warning', 'fechafin');
                } else if (this.direccion == '') {
                    mostraralertas('Ingrese direccion de la empresa', 'warning', 'direccion');
                } else if (this.mision == '') {
                    mostraralertas('Ingrese mision de la empresa', 'warning', 'mision');
                } else if (this.vision == '') {
                    mostraralertas('Ingrese vision de la empresa', 'warning', 'vision');
                } else if (this.lugar == '') {
                    mostraralertas('Ingrese lugar de la empresa', 'warning', 'lugar');
                } else {
                    var parametros = {
                        ruc: this.ruc,
                        empresa: this.empresaproce,
                        empresacorta: this.empresacorta,
                        lugar: this.lugar,
                        direccion: this.direccion,
                        telefono: this.telefono,
                        email: this.emailempre,
                        url: this.urlempre,
                        tipo: this.tipo,
                        titulo: this.titulorepre,
                        representante: this.nombrerepre,
                        cargo: this.cargorepre,
                        actividad: this.actividad,
                        fechafin: this.fechafin,
                        tipoinstitucion: this.tipo_empre,
                        pais: this.pais,
                        vision: this.vision,
                        mision: this.mision,
                        ciudad: this.ciudad,
                        imagen: this.fotografia,
                        estado_empr: 1,
                        usuario_id: store.state.idusu
                    };

                    await enviarsoliedit('PUT', parametros, this.ur3, 'Empresa Actualizada');
                    this.$router.push('/empresas/' + store.state.idusu);
                }
            } catch (error) {
                console.error('Error al actualizar la empresa:', error);
                mostraralertas('Error al actualizar la empresa. Por favor, inténtelo de nuevo.', 'error');
            }
        },
        cargarfoto(event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validar extensión y tipo MIME
            const allowedTypes = ["image/jpeg", "image/jpg"];
            if (!allowedTypes.includes(file.type)) {
                mostraralertas('Solo se permiten imágenes en formato JPG o JPEG.', 'warning', '');
                this.$refs.fileFoto.value = ""; // Limpia input
                this.previewFoto = '';
                this.fotografia = '';
                this.Errorfoto = true;
                return;
            }

            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                if (img.width !== 320 || img.height !== 240) {
                    mostraralertas('La imagen debe ser exactamente de 320x240 píxeles.', 'warning', '');
                    this.$refs.fileFoto.value = ""; // Limpia input
                    this.previewFoto = '';
                    this.fotografia = '';
                    this.Errorfoto = true;
                    return;
                }

                const reader = new FileReader();
                this.Errorfoto = false;
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.previewFoto = reader.result; // Imagen para mostrar
                    this.fotografia = reader.result.replace(/^data:image\/(jpeg|jpg);base64,/, ""); // Base64 limpio
                };
            };
        }


    }
};