
import {mostraralertas, enviarsoli} from '@/assets/scripts/scriptfunciones/funciones'
import axios from 'axios'
export default {
   data(){
        return{
            mostrarModal: false,
            codigov: "",
            codigoVerificacion: "",
            correoValidado: true,
            mostrarbtn: false,
            nombre:'',
            apellido:'',
            email:'',
            password:'',
            rol:'',
            link:'',
            telf:'',
            direccion:'',
            imagen:'',
            url:'http://backendbolsaempleo.test/api/b_e/vin/users',
            showPassword: false,
            cargando: false,
        }
    },
    methods:{
        validarCorreo() {
            const expresionRegularCorreoEstudiante = /^[^\s@]+@utelvt\.edu\.ec$/;
            return this.rol.trim().toLowerCase() === 'estudiante'
              ? expresionRegularCorreoEstudiante.test(this.email.trim())
              : true;
          },
        guardar(event){
            event.preventDefault();
            var mifoto = document.getElementById('fotoimg');
            this.imagen = mifoto.src;
            if(this.nombre.trim()==''){
                mostraralertas('Ingrese Nombre de Usuario','warning','nombre');
            }
            else if(this.apellido.trim()==''){
                mostraralertas('Ingrese Apellido de Usuario','warning','apellido');
            }
            else if (this.email.trim() === '' || !this.validarCorreo()) {
                mostraralertas('Ingrese un correo electrónico válido para estudiantes', 'warning', 'email');
            }
            //else if(this.link.trim  ()==''){
              //  mostraralertas('Ingrese curriculum de Usuario','warning','link');
            //}
            else if(this.telf.trim()==''){
                mostraralertas('Ingrese Telf de Usuario','warning','telf');
            }
            else if(this.direccion.trim()==''){
                mostraralertas('Ingrese Direccion de Usuario','warning','direccion');
            }
            else{
                var parametros = {
                    firts_name:this.nombre.trim(),
                    last_name:this.apellido.trim(),
                    email:this.email.trim(),
                    password:this.password.trim(),
                    rol:this.rol.trim(),
                    link:this.link.trim(),
                    telefono:this.telf.trim(),
                    direccion:this.direccion.trim(),
                    imagen:this.imagen.trim()
                }
                enviarsoli('POST',parametros,this.url,'Guardado');
            }
        },
        cargarfoto(event){
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function(){
                var mifoto = document.getElementById('fotoimg');
                mifoto.src = reader.result;
                this.imagen = mifoto.src;
            }
        },
        abrirModal() {
          this.mostrarModal = true;
        },
        cerrarModal() {
          this.mostrarModal = false;
        },
        async enviarCodigo() {
          try {
            
            /*var parametros = {
                email: this.email.trim(),
              };
            enviarsolig("POST", parametros, "http://bolsaempleobackend.test/api/vin/enviar-correo", "Codigo de Verificacion Enviado al Correo");
            */
            const response = await axios.post("http://backendbolsaempleo.test/api/b_e/vin/enviar-correo",
              {
                email: this.email.trim(),
              }
            );
            console.log(response);
            
            this.codigoVerificacion = response.data.data;
            console.log(this.codigoVerificacion);
            this.abrirModal();
          } catch (error) {
            console.error(error);
            alert("Ocurrió un error al enviar el correo electrónico.");
          }
          
        },
        verificarCodigo() {
          // Verificar si el código ingresado por el usuario es correcto
          if (this.codigov === this.codigoVerificacion) {
    
            this.cerrarModal();  
            this.mostrarbtn= true,
            this.correoValidado = false;
          } else {
            alert("Código incorrecto. Inténtalo nuevamente.");
          }
        },

    }
};