import cuponApi from '../api/cuponApi.js'

export function generarCupon(cliente) {
    return function (dispatch) {
        return cuponApi.generarCupon(cliente).then(data => {
         
            return data;
         
        }).catch(error => {
            throw (error);
        });
    }
}

export function enviarCorreo(cliente) {
    return function (dispatch) {
        return cuponApi.enviarCorreo(cliente).then(data => {
         
            return data;
         
        }).catch(error => {
            throw (error);
        });
    }
}