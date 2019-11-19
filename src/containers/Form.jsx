import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel'
import { withRouter } from 'react-router-dom';
import { verifyDNI,verifyCE, verifyRUC } from '../helpers/Validations';
import { getGTM } from '../helpers/tagging'
import {Preloader} from '../components/Preloader'
import {generarCupon} from '../actions/cuponAction.js';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
//img
import imgCine from '../img/logo-cineplanet.png'


class Form extends Component{
    constructor(props){
        super(props);
        this.state={
            dni:'',
            ce:'',
            ruc:'',
            placa:'',
            documentType:'dni',
            validDNI:true,
            validCE:true,
            validRUC:true,
            validPlaca:true,
            terms: true,
            response:false,
            textError:'',
            showModal:'',
            showPreloader:false,
            modalText:''
        }
        this.mapCampos = this.mapCampos.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.register = this.register.bind(this);
        this.resetState = this.resetState.bind(this);
    }
    mapCampos(event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({[event.target.name]: (event.target.name == 'dni' || event.target.name == 'ruc' )? value.replace(/\D/, '') : value});
        if(event.target.type ==='select-one'){
            this.state.dni = '';
            this.state.ruc = '';
            this.state.ce = '';
        }
    }
    handleBlur = (e) => {
        e.target.value.length > 0 ? this.setState({[e.target.id+'Active']: 'active'}) : this.setState({[e.target.id+'Active']: ''});
        this.setState({
            'dni':{validDNI:verifyDNI(e.target.value)},
            'ce':{validCE: verifyCE(e.target.value)},
            'ruc':{validRUC: verifyRUC(e.target.value)},
            // 'placa':{validPlaca: verifyPlaca(e.target.value)}
        }[e.target.name])
        if((this.state.validDNI && this.state.validCE && this.state.validRUC)){
            this.setState({textError:''})
        }
    }
    
    handleFocus = (e) => {
        this.setState({[e.target.id+'Active']: 'active',})
    }
    register(){
        if((this.state.dni != '' || this.state.ce != '' || this.state.ruc != '') ){
            if(!this.state.terms) return false;
            //if((this.state.validDNI && this.state.validRUC) && this.state.validPlaca){
                
            if((this.state.documentType=='dni' && this.state.validDNI) 
                || (this.state.documentType=='ruc' && this.state.validRUC) 
                || (this.state.documentType=='ce' && this.state.validCE)){
                //if(this.state.documentType=='ruc' && !this.state.validRUC) return false;
                //this.resetState();
                //invoca  servicio
                this.setState({showPreloader:true})
                this.props.generarCupon(this.state).then((response)=>{
                    this.props.history.push({
                        pathname:'/promociones/confirmacion',
                        state:{data:response.data, 
                                dni: this.state.dni,
                                ruc:this.state.ruc,
                                // placa:this.state.placa
                            }
                    });
                    //Ejecuta tagging
                    getGTM('Canje Código Cineplanet','Generar Código','Solicitud de Código');
                    this.setState({showPreloader:false})
                }).catch(err=>{
                    console.log(err);
                    //Modal para mostrar errores de recursos, en modalText setear el error
                    this.setState({
                        showModalError:true,
                        modalText:'Ocurrio un error en el servidor al momento de registrar tus datos'
                    })
                })
                //this.resetState();
                
            } else {
                this.setState({textError:'Ingrese los datos necesarios'})
                return false;
            }
        }else {
            this.setState({textError:'Ingrese los datos necesarios'})
            return false;
        }        
    }
    resetState(){
        this.setState({
            dni:'',
            ce:'',
            ruc:'',
            placa:'',
            documentType:'dni',
            validDNI:true,
            validCE:true,
            validRUC:true,
            // validPlaca:true,
            terms: true,
            textError:''
        })
    }

    render(){
        var viewportDesktop = window.matchMedia("(min-width: 992px)");
        var viewportMobile = window.matchMedia("(max-width: 991px)");
        return (
            <div className="col s31 form">
                <form action="">
                    <h3 className="form__title">Disfruta un día de cine gracias a tu Seguro RIMAC</h3>
                    <h4  className="form__subtext">Conoce tu código de descuento</h4>
                    <div id="combo" className="col s14 input-field combo">
                        <div className="lista-solicitud form-group">
                            <select name='documentType' value={this.state.documentType} className="form-control" onChange={this.mapCampos}>
                                <option value="dni"> DNI </option>
                                <option value="ruc"> RUC </option>
                                <option value="ce"> CE </option>

                            </select>
                        </div>
                    </div>
                    {{
                        'dni':<div className="col s15 input-field">
                                <input type="text" maxLength="8" name="dni" id="dni" value={this.state.dni} onChange={this.mapCampos} onBlur={this.handleBlur} onFocus={this.handleFocus}/>
                                <label className={this.state.dniActive} htmlFor="dni">Nro. de documento</label>
                                <span className="show-error" style={{ display: (this.state.validDNI) ? 'none' : 'block' }}>Tu DNI debe tener 8 dígitos</span>                        
                            </div>,
                        'ce':<div className="col s15 input-field">
                                <input type="text" maxLength="12" name="ce" id="ce" value={this.state.ce} onChange={this.mapCampos} onBlur={this.handleBlur} onFocus={this.handleFocus}/>
                                <label className={this.state.ceActive} htmlFor="ce">Nro. de documento</label>
                                <span className="show-error" style={{ display: (this.state.validCE) ? 'none' : 'block' }}>Debe ingresar el documento</span>                        
                            </div>,
                        'ruc':<div className="col s15 input-field">
                                <input type="text" maxLength="11" name="ruc" id="ruc" value={this.state.ruc} onChange={this.mapCampos} onBlur={this.handleBlur} onFocus={this.handleFocus}/>
                                <label className={this.state.rucActive} htmlFor="ruc">Nro. de documento</label>
                                <span className="show-error" style={{ display: (this.state.validRUC) ? 'none' : 'block' }}>Número de RUC inválido</span>
                            </div>
                    }[this.state.documentType]}                    
                    {/* <div className="col s31 input-field">
                        <input type="text" maxLength="6" name="placa" id="placa" value={this.state.placa} onChange={this.mapCampos} onBlur={this.handleBlur} onFocus={this.handleFocus}/>
                        <label className={this.state.placaActive} htmlFor="placa">Ingresa tu Placa</label>
                        <span className="show-error" style={{ display: (this.state.validPlaca || this.state.placa == '') ? 'none' : 'block' }}>Ingrese una placa válida</span>
                    </div> */}
                    <div className="col s31 checkbox">
                        <input type="checkbox" id="terms" name="terms" value={this.state.terms} onChange={this.mapCampos} defaultChecked={this.state.terms}/>
                        <label>He leído y acepto los <a onClick={() => this.props.openModal()}> Términos y Condiciones</a> de esta campaña.</label>
                        <span className="show-error" style={{ display: this.state.terms ? 'none' : 'block' }}>Debe confirmar los términos y condiciones</span>
                    </div>
                    <span className="show-error">{this.state.textError}</span>
                    <div className="col s31 input-field">
                        <input type="button" name="generar" onClick={this.register} className="btn-red" value="GENERAR CÓDIGO"/>
                    </div>
                    <div className="col s31 note">
                        <p>Los códigos son de uso exclusivo en:</p>
                        <img src={imgCine} alt="SOAT Rimac te lleva al cine"/>
                    </div>
                </form>
                <Preloader show={this.state.showPreloader}/>
            </div>
        )
    }
}

/* 05/12/2018
                    <div className="col s31 input-field">
                        <input type="text" maxLength="6" name="placa" id="placa" value={this.state.placa} onChange={this.mapCampos} onBlur={this.handleBlur} onFocus={this.handleFocus}/>
                        <label className={this.state.placaActive} htmlFor="placa">Ingresa tu Placa</label>
                        <span className="show-error" style={{ display: (this.state.validPlaca || this.state.placa == '') ? 'none' : 'block' }}>Ingrese una placa válida</span>
                    </div>
*/

const mapStateToProps = (state) =>{
    return {
        state:state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        generarCupon: bindActionCreators(generarCupon, dispatch)
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Form));