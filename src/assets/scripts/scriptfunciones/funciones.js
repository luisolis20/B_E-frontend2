import Swal from 'sweetalert2';
import axios from 'axios';

export function mostraralertas(titulo,icono,foco=''){
    if(foco!=''){
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title:titulo,
        icon:icono,
        customClass:{confirmButton:'btn btn-secondary', popup:'animated zoonIn'},
        buttonsStyling:false
    });
}
export function mostraralertas2(titulo,icono){
    
    Swal.fire({
        title:titulo,
        icon:icono,
        customClass:{confirmButton:'btn btn-secondary', popup:'animated zoonIn'},
        buttonsStyling:false
    });
}
export function confimar(urlconslash, id, titulo, mensaje, actualizarTabla) {
    var url = urlconslash + id;   // 👈 Se construye la URL con el ID

    const swalwithboostrapbutton = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success me-3',
            cancelButton: 'btn btn-danger'
        },
    });

    swalwithboostrapbutton.fire({
        title: titulo,
        text: mensaje,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Inhabilitar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((res) => {
        if (res.isConfirmed) {
            axios.delete(url)   // 👈 Ya NO mandamos { data: { id } }
                .then((response) => {
                    mostraralertas(response.data.mensaje ?? 'Eliminado con éxito', 'success');
                    if (typeof actualizarTabla === "function") {
                        actualizarTabla(); // 🔄 refrescar tabla
                    }
                })
                .catch(() => {
                    mostraralertas('Error al eliminar', 'error');
                });
        } else {
            mostraralertas('Operación cancelada', 'info');
        }
    });
}
export function confimarhabi(urlconslash, id, titulo, mensaje, actualizarTabla) {
    var url = urlconslash + id;   // 👈 Se construye la URL con el ID

    const swalwithboostrapbutton = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success me-3',
            cancelButton: 'btn btn-danger'
        },
    });

    swalwithboostrapbutton.fire({
        title: titulo,
        text: mensaje,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Habilitar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar'
    }).then((res) => {
        if (res.isConfirmed) {
            axios.delete(url)   // 👈 Ya NO mandamos { data: { id } }
                .then((response) => {
                    mostraralertas(response.data.mensaje ?? 'Habilitado con éxito', 'success');
                    if (typeof actualizarTabla === "function") {
                        actualizarTabla(); // 🔄 refrescar tabla
                    }
                })
                .catch(() => {
                    mostraralertas('Error al eliminar', 'error');
                });
        } else {
            mostraralertas('Operación cancelada', 'info');
        }
    });
}


export function guardarcambios(metodo,parametros,urlid,titulo){
    
    Swal.fire({
        title: titulo,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            enviarsoliedit(metodo,parametros,urlid,'!Cambios reaizados!');
            //Swal.fire("!Cambios reaizados!", "", "success");

        } else if (result.isDenied) {
            Swal.fire("Los cambios no se guardaron", "", "info");
        }
    });
   
}
export function enviarsoli(metodo,parametros,url,mensaje){
    axios({
        method:metodo,
        url:url,
        data:parametros
    }).then(function(res){
        var estado = res.status;
        if(estado==200){
            mostraralertas(mensaje,'success');
            
        }else{
            mostraralertas('No se pudo recuperar la respuesta','error');
        }
    }).catch(function(error){
        mostraralertas('Servidor no Disponible','error');
    });
}
export function enviarsolig(metodo,parametros,url,mensaje){
    axios({
        method:metodo,
        url:url,
        data:parametros
    }).then(function(res){
        var estado = res.status;
        if(estado==200){
            mostraralertas(mensaje,'success');
            window.location.reload();
               
        }else{
            mostraralertas('No se pudo recuperar la respuesta','error');
        }
    }).catch(function(error){
        mostraralertas('Servidor no Disponible','error');
    });
}
export function enviarsolig23(metodo, parametros, url, mensaje) {
    return axios({
        method: metodo,
        url: url,
        data: parametros
    }).then(function (res) {
        var estado = res.status;
        if (estado == 200) {
            mostraralertas(mensaje, 'success');
            
            return res.data; // 👈 aquí ya solo retornas los datos
        } else {
            mostraralertas('No se pudo recuperar la respuesta', 'error');
        }
    }).catch(function (error) {
        mostraralertas('Servidor no Disponible', 'error');
        throw error; // 👈 importante para poder manejar en catch
    });
}
export async function enviarsoliedit(metodo, parametros, url, mensaje) {
    try {
        var response = await axios({
            method: metodo,
            url: url,
            data: parametros
        });
        if (response.data) {
            //console.log(mensaje + ': ' + response.data.mensaje);
            mostraralertas(mensaje, 'success');
            

        } else {
            mostraralertas('No se pudo recuperar la respuesta', 'error');
            return null;
        }
    } catch (error) {
        //console.error('Error:', error.response.data);
        mostraralertas('Servidor no Disponible', 'error');
        throw error;
    }
}