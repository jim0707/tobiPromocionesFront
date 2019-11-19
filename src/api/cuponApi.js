import axios from 'axios'

const axiosCupon = axios.create({
    //PRD
    baseURL: 'https://rdleuswapprod08.azurewebsites.net',

    //lOCAL
    //baseURL: 'http://localhost:3004',
    
    //DEV
    //baseURL: 'https://cotiza-gen-backend.azurewebsites.net/',
    
    validateStatus: function(status) {
        return status >= 200 && status < 300; // default 
    }
});

class cuponAPi {

    static generarCupon(cliente){
        const request = {
            tipodocumento : cliente.tipodocumento,
            nrodocumento  : cliente.dni == '' ? (cliente.ruc == '' ? cliente.ce : cliente.ruc) : cliente.dni,
            placa         : cliente.placa,
            terminos      : cliente.terminos
        }

        return axiosCupon.post('/promocion/generarCupon',request).then((response)=> {
            //return axiosCupon.post('/data',request).then((response)=> {
            const  responseData = {
                tipo :      response.tipo,
                mensaje:    response.mensaje,
                titulo:     response.titulo,
                data:       response.data
            }

            return Promise.resolve(responseData);

        }).catch((error)=>{
            return Promise.reject(error);
        })
    }

    static enviarCorreo(cliente){
        const request = {
            id:'',
            correo:cliente.email,
            codigo:cliente.codigosAsociados
        }

            return axiosCupon.post('/promocion/enviarCorreo',request).then((response)=> {
            /*
                const  responseData = {
                tipo :      response.tipo,
                mensaje:    response.mensaje,
                titulo:     response.titulo,
                data:       response.data
            }
            */
            return Promise.resolve(response);

        }).catch((error)=>{
            return Promise.reject(error);
        })
    }

}

export default cuponAPi;