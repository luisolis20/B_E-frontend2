import { mostraralertas, enviarsolig, enviarsoliedit } from '@/assets/scripts/scriptfunciones/funciones';
import { useRoute } from 'vue-router';
import { getMe } from '@/store/auth';
import axios from 'axios';
import store from '@/store';

export default {
    data() {
        return {
            idus: 0,
            idususuario: 0,
            est: 0,
            botonesBloqueados: false,
            ruc: '',
            nombre_emprendimiento: '',
            descripcion: '',
            fotografia: '',
            previewFoto: '',
            previewFotologo: '',
            logo: '',
            fotografia2: '',
            previewFoto2: '',

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
            urlinformacionpersonal: "http://cvubackendv2.test/api/cvn/v1/informacionpersonal",
            // Verificación de correo
            mostrarModal: false,
            codigov: "",
            codigoVerificacion: "",
            intentosRestantes: 3,
            correoValidado: false,

        }
    },
    async mounted() {
        const ruta = useRoute();
        const usuario = await getMe();
        this.idus = ruta.params.id;
        this.idus2 = ruta.params.id;
        this.urlinformacionpersonal += '/' + store.state.idusu;
        //console.log(this.idus);
        if (store.state.idusu != this.idus) {
            this.ur3 += '/' + this.idus2;

            this.url += '/' + this.idus;
            this.getEmprendiemi();
        }
    },
    methods: {
        async getEmprendiemi() {
            try {
                const response = await axios.get(this.ur3);
                //console.log(response.data.data[0]);


                if (response.data.data) {
                    this.ruc = response.data.data[0].ruc;
                    this.nombre_emprendimiento = response.data.data[0].nombre_emprendimiento;
                    this.idususuario = response.data.data[0].CIInfPer;
                    this.descripcion = response.data.data[0].descripcion;
                    this.fotografia = response.data.data[0].fotografia;
                    this.previewFoto = 'data:image/jpeg;base64,' + response.data.data[0].fotografia;
                    this.logo = response.data.data[0].logo;
                    this.previewFotologo = 'data:image/jpeg;base64,' + response.data.data[0].logo;
                    this.fotografia2 = response.data.data[0].fotografia2;
                    this.previewFoto2 = 'data:image/jpeg;base64,' + response.data.data[0].fotografia2;

                    this.tiempo_emprendimiento = response.data.data[0].tiempo_emprendimiento;
                    this.horarios_atencion = response.data.data[0].horarios_atencion;
                    this.direccion = response.data.data[0].direccion;
                    this.telefono_contacto = response.data.data[0].telefono_contacto;
                    this.email_contacto = response.data.data[0].email_contacto;
                    this.sitio_web = response.data.data[0].sitio_web;
                    this.redes_sociales = response.data.data[0].redes_sociales;
                    this.est = response.data.data[0].estado_empren;
                    //console.log(this.est);
                    /*if (this.est == 1) {
                        this.estado_empren = "Disponible"
                    } else if (this.est == 2) {
                        this.estado_empren = "En Revisión"
                    }
                    else {
                        this.estado_empren = "No Disponible"
                    }*/

                }

            } catch (error) {
                console.error('Error al obtener la emprendimiento:', error);
                mostraralertas('Error al obtener la emprendimiento. Por favor, inténtelo de nuevo.', 'error');

            }


        },
        guardar(event) {
            try {
                event.preventDefault();
                this.botonesBloqueados = true;


                if (this.ruc == '') {
                    mostraralertas('Ingrese ruc de la empresa', 'warning', 'ruc');
                } else if (this.nombre_emprendimiento == '') {
                    mostraralertas('Ingrese nombre del emprendimiento', 'warning', 'nombre');
                } else if (this.descripcion == '') {
                    mostraralertas('Ingrese descripcion del emprendimiento', 'warning', 'descripcion');
                }
                else if (this.logo == '') {
                    mostraralertas('Ingrese logo del emprendimiento', 'warning', '');
                } else if (this.fotografia == '') {
                    mostraralertas('Ingrese fotografia del emprendimiento', 'warning', '');
                }
                else if (this.fotografia2 == '') {
                    mostraralertas('Ingrese fotografia del emprendimiento', 'warning', '');
                }

                else if (this.tiempo_emprendimiento == '') {
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
                }
                else if (!this.email_contacto.endsWith("@gmail.com")) {
                    mostraralertas('El correo de Empresa debe ser de Gmail (@gmail.com)', 'error', 'email');
                } else {
                    this.enviarCodigo();


                }
            } catch (error) {
                console.error('Error al guardar el emprendimiento:', error);
                mostraralertas('Error al guardar el emprendimiento. Por favor, inténtelo de nuevo.', 'error');
            }
        },
        async actualizar(event) {
            try {
                event.preventDefault();
                this.botonesBloqueados = true;
                if (this.ruc == '') {
                    mostraralertas('Ingrese ruc de la empresa', 'warning', 'ruc');
                } else if (this.nombre_emprendimiento == '') {
                    mostraralertas('Ingrese nombre del emprendimiento', 'warning', 'nombre');
                } else if (this.descripcion == '') {
                    mostraralertas('Ingrese descripcion del emprendimiento', 'warning', 'descripcion');

                }  else if (this.logo == '') {
                    mostraralertas('Ingrese logo del emprendimiento', 'warning', '');
                } else if (this.fotografia == '') {
                    mostraralertas('Ingrese fotografia del emprendimiento', 'warning', '');
                }
                else if (this.fotografia2 == '') {
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
                }
                else if (!this.email_contacto.endsWith("@gmail.com")) {
                    mostraralertas('El correo de Empresa debe ser de Gmail (@gmail.com)', 'error', 'email');
                } else {
                    this.enviarCodigo();
                    this.botonesBloqueados = true;
                    //window.location.reload();
                }
            } catch (error) {
                console.error('Error al actualizar el emprendimiento:', error);
                mostraralertas('Error al guardar el emprendimiento. Por favor, inténtelo de nuevo.', 'error');
            }
        },
        async enviarCodigo() {
            try {

                const response = await axios.post("http://backendbolsaempleo.test/api/b_e/vin/enviar-correo",
                    {
                        email: this.email_contacto.trim(),
                    }
                );
                this.mostrarModal = true; // Mostrar modal para ingresar el código
                this.intentosRestantes = 3; // Reiniciar intentos
                this.codigoVerificacion = response.data.data;



            } catch (error) {
                console.error(error);
                mostraralertas("Ocurrió un error al enviar el correo electrónico.", "error");
            }

        },
        // ✅ Validar el código ingresado
        verificarCodigo() {
            if (this.codigov === this.codigoVerificacion) {
                this.correoValidado = true;
                this.mostrarModal = false;
                if (store.state.idusu != this.idus) {
                    this.revisar2();
                } else {
                    this.revisar();
                }
                //this.revisar();

            } else {
                this.intentosRestantes--;
                if (this.intentosRestantes > 0) {
                    mostraralertas(`Código incorrecto. Intentos restantes: ${this.intentosRestantes}`, "warning");
                } else {
                    mostraralertas("Ha superado el número máximo de intentos.", "error");
                    this.mostrarModal = false;
                    this.$router.push('/principal/' + store.state.idusu); // 🔹 Redirige a página principal
                }
            }
        },

        // ✅ Guardar usuario en backend
        procesarGuardar() {
            var parametros = {
                ruc: this.ruc,
                nombre_emprendimiento: this.nombre_emprendimiento,
                descripcion: this.descripcion,
                fotografia: this.fotografia,
                logo: this.logo,
                fotografia2: this.fotografia2,
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
        },
        async procesarActualizar() {
            var parametros = {
                ruc: this.ruc,
                nombre_emprendimiento: this.nombre_emprendimiento,
                descripcion: this.descripcion,
                fotografia: this.fotografia,
                logo: this.logo,
                fotografia2: this.fotografia2,
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
            await enviarsoliedit('PUT', parametros, this.url, 'Emprendimiento Actualizado');
            this.$router.push('/misemprendimientos/' + store.state.idusu);
        },
        async revisar() {


            try {
                // Enviar el correo electrónico
                const response = await axios.get(this.urlinformacionpersonal);
                const data = response.data.data[0];
                const apellidos = data.ApellInfPer + ' ' + data.ApellMatInfPer + ' ' + data.NombInfPer;
                const responseCorreo = await axios.post("http://backendbolsaempleo.test/api/b_e/vin/revision-emprendimiento", {

                    email: this.email_contacto.trim(),
                    firts_name: apellidos,
                    nombreEmprendimiento: this.nombre_emprendimiento,

                });
                if (responseCorreo.status === 200) {
                    this.procesarGuardar();
                    //this.$router.push('/misemprendimientos/' + store.state.idusu);


                } else {
                    // Si hubo un error al enviar el correo, mostrar mensaje de error
                    console.log('error al enviar el correo electrónico');
                    this.$router.push('/misemprendimientos/' + store.state.idusu);
                }
            } catch (error) {
                console.error(error);
                alert("Ocurrió un error al realizar la acción.");
            }



        },
        async revisar2() {


            try {
                // Enviar el correo electrónico
                const response = await axios.get(this.urlinformacionpersonal);
                const data = response.data.data[0];
                const apellidos = data.ApellInfPer + ' ' + data.ApellMatInfPer + ' ' + data.NombInfPer;
                const responseCorreo = await axios.post("http://backendbolsaempleo.test/api/b_e/vin/revision-actualizacion-emprendimiento", {

                    email: this.email_contacto.trim(),
                    firts_name: apellidos,
                    nombreEmprendimiento: this.nombre_emprendimiento,

                });
                if (responseCorreo.status === 200) {
                    this.procesarActualizar();
                    //this.$router.push('/misemprendimientos/' + store.state.idusu);


                } else {
                    // Si hubo un error al enviar el correo, mostrar mensaje de error
                    console.log('error al enviar el correo electrónico');
                    this.$router.push('/misemprendimientos/' + store.state.idusu);
                }
            } catch (error) {
                console.error(error);
                alert("Ocurrió un error al realizar la acción.");
            }



        },
        cargarfoto(event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validar que sea imagen
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
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
                // Crear un canvas de 320x240
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = 320;
                canvas.height = 240;


                ctx.drawImage(img, 0, 0, 320, 240);


                const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

                this.previewFoto = dataUrl;
                this.fotografia = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
                this.Errorfoto = false;
            };

            img.onerror = () => {
                mostraralertas('Error al cargar la imagen.', 'error', '');
                this.$refs.fileFoto.value = "";
            };
        },
        cargarfoto2(event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validar que sea imagen
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!allowedTypes.includes(file.type)) {
                mostraralertas('Solo se permiten imágenes en formato JPG o JPEG.', 'warning', '');
                this.$refs.fileFoto.value = "";


                this.fotografia2 = '';
                this.previewFoto2 = '';
                this.Errorfoto = true;
                return;
            }

            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                // Crear un canvas de 320x240
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = 320;
                canvas.height = 240;


                ctx.drawImage(img, 0, 0, 320, 240);


                const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

                this.previewFoto2 = dataUrl;
                this.fotografia2 = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
                this.Errorfoto = false;
            };

            img.onerror = () => {
                mostraralertas('Error al cargar la imagen.', 'error', '');
                this.$refs.fileFoto.value = "";
            };
        },
        cargarfoto3(event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validar que sea imagen
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!allowedTypes.includes(file.type)) {
                mostraralertas('Solo se permiten imágenes en formato JPG o JPEG.', 'warning', '');
                this.$refs.fileFoto.value = ""; // Limpia input
                this.previewFotologo = '';
                this.logo = '';
                this.Errorfoto = true;
                return;
            }

            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                // Crear un canvas de 320x240
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = 320;
                canvas.height = 240;


                ctx.drawImage(img, 0, 0, 320, 240);


                const dataUrl = canvas.toDataURL("image/jpeg", 0.9);

                this.previewFotologo = dataUrl;
                this.logo = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
                this.Errorfoto = false;
            };

            img.onerror = () => {
                mostraralertas('Error al cargar la imagen.', 'error', '');
                this.$refs.fileFoto.value = "";
            };
        },
        cerrarModal() {

            this.mostrarModal = false;
            this.codigov = "";
            this.codigoVerificacion = "";
            this.intentosRestantes = 3;

            // Control de flujo
            this.cargando = false;
            this.correoValidado = false;

        }


    }
};
