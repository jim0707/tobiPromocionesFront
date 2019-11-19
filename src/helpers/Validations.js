//Functions for validate inputs
export const verifyDNI = (value) => {
    let regex = /^[0-9]*$/;
    while(value != undefined){
        return (!regex.test(value) || value.length != 8) ? false : true;
    }    
}
export const verifyCE = (value) => {
    // while(value != undefined) {
        return (value.length != 0);
    // }    
}
export const verifyRUC = (value) => {
    let regex = /^[0-9]*$/;
    while(value != undefined){
        return (!regex.test(value) || value.length != 11 || (value.substring(0, 2) != "20" && value.substring(0, 2) != "10")) ? false : true;
    }     
}
export const verifyPlaca = (value) => {
    value = value.trim();
    return (value.length == 6);
}
export const verifyName = (value) => {
    while(value != undefined){
        return value.length != 0 ? true : false;
    }
}
export const verifyPhone = (value) => {
    let regex = /^[0-9]*$/;
    while(value != undefined){
        return (!regex.test(value) || value.length != 9 || value.charAt(0) != 9) ? false : true;
    }
}

export const verifyEmail = (value) => {
    // const regexEmail = /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    while(value != undefined){
        return (!regexEmail.test(value)) ? false : true;
    }  
}

export const onlyNumber = (e) =>{
    if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106) || e.keyCode === 9 || e.keyCode === 8){
        return true;
    }
    else{
        e.preventDefault();
        return false;
    }
};

//Funcion para obtener fecha actual
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
export const getDate = ()=>{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        
        dd = addZero(dd);
        mm = addZero(mm);
 
        return dd+'-'+mm+'-'+yyyy;
}