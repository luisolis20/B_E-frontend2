import { mostraralertas, enviarsolig,enviarsoliedit } from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
import axios from 'axios';
import store from '@/store';

export default {
    data() {
        return {
            idus: 0,
            idususuario: 0,
            est: 0,

            ruc: '',
            nombre_emprendimiento: '',
            descripcion: '',
            fotografia: '',   
            previewFoto: '',  
            tiempo_emprendimiento: '',
            horarios_atencion: '',
            direccion: '',
            telefono_contacto: '',
            email_contacto: '',
            sitio_web: '',
            redes_sociales: '',
            estado_empren: '',
            url: 'http://backendbolsaempleo.test/api/b_e/vin/emprendimientos_E',
            cargando: false,
            Errorfoto: false,
            guardaremprendimiento: true,
            ur3: 'http://backendbolsaempleo.test/api/b_e/vin/consultarediremp',

        }
    },
    mounted() {
        const ruta = useRoute();
        this.idus = ruta.params.id;
        this.idus2 = ruta.params.id;
        //console.log(this.idus);
        this.url += '/' + this.idus;
        this.ur3 += '/' + this.idus2;
        this.getEmprendiemi();
    },
    methods: {
        async getEmprendiemi() {
            try {
                const response = await axios.get(this.ur3);
                //console.log(response.data.data);


                if (response.data.data) {
                    this.ruc = response.data.data[0].ruc;
                    this.nombre_emprendimiento = response.data.data[0].nombre_emprendimiento;
                    this.idususuario = response.data.data[0].CIInfPer;
                    this.descripcion = response.data.data[0].descripcion;
                    this.fotografia = response.data.data[0].fotografia;
                    this.previewFoto = 'data:image/jpeg;base64,' + response.data.data[0].fotografia;
                    console.log(this.fotografia);
                    this.tiempo_emprendimiento = response.data.data[0].tiempo_emprendimiento;
                    this.horarios_atencion = response.data.data[0].horarios_atencion;
                    this.direccion = response.data.data[0].direccion;
                    this.telefono_contacto = response.data.data[0].telefono_contacto;
                    this.email_contacto = response.data.data[0].email_contacto;
                    this.sitio_web = response.data.data[0].sitio_web;
                    this.redes_sociales = response.data.data[0].redes_sociales;
                    this.est = response.data.data[0].estado_empren;
                    console.log(this.est);
                    if(this.est==1){
                        this.estado_empren="Disponible"
                    }else if(this.est==2){
                        this.estado_empren="En Revisión"
                    }
                    else{
                        this.estado_empren="No Disponible"
                    }

                } 

            } catch (error) {

            }


        },
        guardar(event) {
            try {
                event.preventDefault();
                

                
                if (this.ruc == '') {
                    mostraralertas('Ingrese ruc de la empresa', 'warning', 'ruc');
                } else if (this.nombre_emprendimiento == '') {
                    mostraralertas('Ingrese nombre del emprendimiento', 'warning', 'nombre');
                } else if (this.descripcion == '') {
                    mostraralertas('Ingrese descripcion del emprendimiento', 'warning', 'descripcion');
                } else if (this.tiempo_emprendimiento == '') {
                    mostraralertas('Ingrese tiempo del emprendimiento', 'warning', 'tiempo');
                } else if (this.horarios_atencion == '') {
                    mostraralertas('Seleccione horario de atencion del emprendimiento', 'warning', 'horario');
                } else if (this.direccion == '') {
                    mostraralertas('Ingrese direccion del emprendimiento', 'warning', 'direccion');
                } else if (this.telefono_contacto == '') {
                    mostraralertas('Ingrese telefono de contacto del emprendimiento', 'warning', 'telefono');
                } else if (this.email_contacto == '') {
                    mostraralertas('Ingrese email de contacto del emprendimiento', 'warning', 'email');
                } else if (this.sitio_web == '') {
                    mostraralertas('Ingrese sitio web del emprendimiento', 'warning', 'sitio');
                } else if (this.redes_sociales == '') {
                    mostraralertas('Ingrese redes sociales del emprendimiento', 'warning', 'redes');
                } else {
                    var parametros = {
                        ruc: this.ruc,
                        nombre_emprendimiento: this.nombre_emprendimiento,
                        descripcion: this.descripcion,
                        fotografia: this.fotografia,
                        tiempo_emprendimiento: this.tiempo_emprendimiento,
                        horarios_atencion: this.horarios_atencion,
                        direccion: this.direccion,
                        telefono_contacto: this.telefono_contacto,
                        email_contacto: this.email_contacto,
                        sitio_web: this.sitio_web,
                        redes_sociales: this.redes_sociales,
                        estado_empren: 2,
                        CIInfPer: this.idus
                    };
                    enviarsolig('POST', parametros, 'http://backendbolsaempleo.test/api/b_e/vin/emprendimientos_E', 'Emprendimiento Creado');
                    this.$router.push('/misemprendimientos/' + this.idus);
                }
            } catch (error) {
                console.error('Error al guardar el emprendimiento:', error);
                mostraralertas('Error al guardar el emprendimiento. Por favor, inténtelo de nuevo.', 'error');
            }
        },
        async actualizar(event) {
            try {
                event.preventDefault();
                if(this.estado_empren=="Disponible"){
                    this.est=1;
                }else{
                    this.est=0;
                }
                if (this.ruc == '') {
                    mostraralertas('Ingrese ruc de la empresa', 'warning', 'ruc');
                } else if (this.nombre_emprendimiento == '') {
                    mostraralertas('Ingrese nombre del emprendimiento', 'warning', 'nombre');
                } else if (this.descripcion == '') {
                    mostraralertas('Ingrese descripcion del emprendimiento', 'warning', 'descripcion');
                } else if (this.fotografia == '') {
                    mostraralertas('Ingrese fotografia del emprendimiento', 'warning', '');
                } else if (this.tiempo_emprendimiento == '') {
                    mostraralertas('Ingrese tiempo del emprendimiento', 'warning', 'tiempo');
                } else if (this.horarios_atencion == '') {
                    mostraralertas('Seleccione horario de atencion del emprendimiento', 'warning', 'horario');
                } else if (this.direccion == '') {
                    mostraralertas('Ingrese direccion del emprendimiento', 'warning', 'direccion');
                } else if (this.telefono_contacto == '') {
                    mostraralertas('Ingrese telefono de contacto del emprendimiento', 'warning', 'telefono');
                } else if (this.email_contacto == '') {
                    mostraralertas('Ingrese email de contacto del emprendimiento', 'warning', 'email');
                } else if (this.sitio_web == '') {
                    mostraralertas('Ingrese sitio web del emprendimiento', 'warning', 'sitio');
                } else if (this.redes_sociales == '') {
                    mostraralertas('Ingrese redes sociales del emprendimiento', 'warning', 'redes');
                } else {
                    var parametros = {
                        ruc: this.ruc,
                        nombre_emprendimiento: this.nombre_emprendimiento,
                        descripcion: this.descripcion,
                        fotografia: this.fotografia,
                        tiempo_emprendimiento: this.tiempo_emprendimiento,
                        horarios_atencion: this.horarios_atencion,
                        direccion: this.direccion,
                        telefono_contacto: this.telefono_contacto,
                        email_contacto: this.email_contacto,
                        sitio_web: this.sitio_web,
                        redes_sociales: this.redes_sociales,
                        estado_empren: 2,
                        CIInfPer: this.idususuario
                    };
                    await enviarsoliedit('PUT',parametros,this.url,'Emprendimiento Actualizado');
                    this.$router.push('/misemprendimientos/'+store.state.idusu);
                    //window.location.reload();
                }
            } catch (error) {
                console.error('Error al actualizar el emprendimiento:', error);
                mostraralertas('Error al guardar el emprendimiento. Por favor, inténtelo de nuevo.', 'error');
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
