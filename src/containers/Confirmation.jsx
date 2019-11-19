import React, { Component } from 'react';
import {Alert} from '../components/Alert'
import {ContentAlert} from '../helpers/ContentModal'
// import {Conditions} from './../../TyC';
import { verifyEmail } from '../helpers/Validations';
import { getGTM } from '../helpers/tagging'
//Images
import imgCine from '../img/logo-cineplanet.png'
import imgConfirmation from '../img/dconfirmacion.png'

import {enviarCorreo} from '../actions/cuponAction.js';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

//export default class Confirmation extends Component {
class Confirmation extends Component {
    constructor(props){
        super(props);
        this.element = null;
        this.state = {
            response: props.location.state,
            email:'',
            validEmail:true,
            showModal:'',
            codigosAsociados:this.props.location.state.data!=null? this.props.location.state.data.codigosAsociados:[]
        }
        this.mapCampos = this.mapCampos.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.send = this.send.bind(this);
        this.closeModal = this.closeModal.bind(this);  
        this.enviarCorreo = this.enviarCorreo.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    mapCampos(event) {
        const {name, value} = event.target;
        this.setState({[name]: value, validEmail:verifyEmail(value)});
    }
    handleBlur = (e) => {
        e.target.value.length > 0 ? this.setState({[e.target.id+'Active']: 'active'}) : this.setState({[e.target.id+'Active']: ''});
     }
  
    handleFocus = (e) => {
        this.setState({[e.target.id+'Active']: 'active',})
    }

    closeModal() {
        this.setState({ showModal: ''});
    }

    send() {
        (this.state.email != '' && this.state.validEmail) ? 
            this.setState({ showModal: 'open'}):
            this.setState({validEmail:false});
    }

    goBack(){
        this.props.history.goBack();
    }

    enviarCorreo(){

        if((this.state.email != '' && this.state.validEmail)){
    
            this.props.enviarCorreo(this.state).then((response)=>{
                //this.props.history.push('/confirmacion',response.data);
                this.setState({ showModal: 'open'});
            }).catch(err=>{
                console.log(err);
                //Modal para mostrar errores de recursos, en modalText setear el error
                this.setState({
                    showModalError:true,
                    modalText:'Ocurrio un error en el servidor al momento de enviar el correo'
                })
            })
        }
    }

    render(){
        const longitudCupon = 15;
        const aux = this.props;
        this.props.location.state.data.data!=null ?
        getGTM('Canje Código Cineplanet','Generar Exitosa','Envio Satisfactorio'):
        getGTM('Canje Código Cineplanet','Error Proceso de Generación',this.props.location.state.data.titulo);
        
        return(
            <div id="confirmation">
                <div className="container">
                    <div className="row">
                        <div className="col s31 l11 left-content">
                        {this.props.location.state.data.data!=null ?
                            <div className="confirmation success">
                                <div className="confirmation__img hide-on-large-only"></div>
                                <h5 className="confirmation__name">CONFIRMACIÓN</h5>
                                <h2 className="confirmation__copy">Hola, 
                                {" "+this.props.location.state.data.data.nombreUni.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                                </h2>
                                {this.state.codigosAsociados.length == 1 ? 
                                    <p className="confirmation__text">Canjea tu entrada en Cineplanet con este código:</p> :
                                    <p className="confirmation__text">Canjea tus entradas en Cineplanet con estos código:</p>
                                }                           

                                {this.state.codigosAsociados.map((e,i) => (
                                    <div className="col s31 confirmation__code" key={i}>
                                        <p className="col s31 l9 code-text">Código {i+1}</p>
                                        {/* Completa con ceros, un cupón con menos digitos que 'longitudCupon' */
                                            longitudCupon-e.length > 0 ?
                                            // Si la diferencia es positiva... todo bien con el método '.repeat'
                                            <h4 className="col s31 l20">{'0'.repeat(longitudCupon-e.length) + e}</h4> :
                                            // Pero si es negativa habría error, then simplemente que se muestre
                                            <h4 className="col s31 l20">{'0' + e}</h4>
                                        }
                                    </div> 
                                ))}

                                {/* <h4>Envía tu código por correo electrónico</h4>
                                <div className="col s31 l24 input-field">                                
                                    <input type="email" name="email" id="email" value={this.state.email} onChange={this.mapCampos} onBlur={this.handleBlur} onFocus={this.handleFocus}/>
                                    <label className={this.state.emailActive} htmlFor="email">Correo electrónico</label>
                                    <span className="show-error" style={{ display: (this.state.validEmail) ? 'none' : 'block' }}>El correo es inválido</span>
                                </div>
                                <div className="col s31 l24 input-field">
                                    <input type="button" name="generar" onClick={this.enviarCorreo} className="btn-green" value="ENVIAR CÓDIGO"/>
                                </div> */}

                                <div className="col s31 note">
                                    <p>Los códigos son de uso exclusivo en:</p>
                                    <img src={imgCine} alt="SOAT Rimac te lleva al cine"/>
                                </div>
                            </div>:
                            <div className="confirmation no-success">
                                <h5 className="confirmation__name">LO SENTIMOS</h5>
                                <h2 className="confirmation__copy">Hola,</h2>
                                <p className="confirmation__text">Actualmente no tienes un código asociado a tu documento. Asegúrate de que hayas ingresado correctamente tu número de documento y placa.</p>
                                <div className="confirmation__document">
                                    {this.props.location.state.dni!='' && this.props.location.state.dni!=null ? <h4> ¿Este es tu número de documento?</h4> : <h4> ¿Este es tu número de ruc?</h4>}
                                    {this.props.location.state.dni!='' && this.props.location.state.dni!=null ? <h3>{this.props.location.state.dni}</h3> : <h3>{this.props.location.state.ruc}</h3>}
                                    
                                    {/* <h4>¿Esta es tu placa?</h4>
                                    <h3>{this.props.location.state.placa}</h3> */}
                                </div>
                                <div className="col s31 l20 input-field">
                                    <input type="button" name="generar" onClick={this.goBack} className="btn-red" value="NO, DESEO CAMBIARLOS"/>
                                </div>
                            </div>}
                        </div>
                        <div className="col s31 l14 right-content">
                        {this.props.location.state.data.data!=null ?
                            <div className="response successful hide-on-med-and-down">
                                <img src={imgConfirmation} alt="SOAT Digital te regala una entrada al cine"/>
                            </div>:
                            <div className="response not-successful">
                                {/* <div className="col s31 m14 response__img"></div>
                                <div className="col s31 m17 response__card">                                
                                    <h5 className="confirmation__name">TAL VEZ PUEDE INTERESARTE</h5>
                                    <h3 className="response__copy">Tu SOAT Digital desde S/69</h3>
                                    <p>Adquiérelo completamente online en menos de 5 minutos.</p>
                                    <div className="input-field">
                                        <a className="btn-red" href="https://www.rimac.com.pe/SOATDIGITAL/" target="_blank">CÓMPRALO AHORA</a>
                                    </div>
                                </div> */}<img src={imgConfirmation} alt="SOAT Digital te regala una entrada al cine"/>
                            </div>
                        }
                        </div>
                    </div>
                </div>
                <Alert show={this.state.showModal} onHide={this.closeModal} content={<ContentAlert />} title={'Felicidades Miriam'}/>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        state:state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        enviarCorreo: bindActionCreators(enviarCorreo, dispatch)
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Confirmation));