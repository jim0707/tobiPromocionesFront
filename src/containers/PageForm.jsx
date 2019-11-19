import React, { Component } from 'react'
import Form from './Form'
import {Slide} from '../components/Slide'
import {Modal,ModalTerminos} from '../components/Modal'
import {ContentModal} from '../helpers/ContentModal'

class PageForm extends Component {
    constructor(props){
        super(props);
        this.state={
            showModal:''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal(){
        this.setState({showModal:'open'})
    }
    closeModal(){
        console.log('close');
        this.setState({showModal:''})
    }       
    render(){
        var viewportDesktop = window.matchMedia("(min-width: 769px)");
        var viewportMobile = window.matchMedia("(max-width: 768px)");
        return (
            <div id="pageForm">
                <div className="container">
                    <div className="row">
                        <div className="col s31 m21 l13 left-content">
                            <div className="product">
                                <div className="product__img">
                                    {/*<h5 className="product__name">SOAT DIGITAL</h5>*/}
                                    <h2 className="hide-on-med-and-down product__copy">¡RIMAC te lleva al cine!</h2>
                                </div>
                            </div>
                            { viewportDesktop.matches && <Slide nav={true}/>}
                        </div>
                        <div className="col s31 m21 l12 right-content">
                            <Form openModal={this.openModal}/>
                            { viewportMobile.matches && <Slide nav={false}/>}
                        </div>
                    </div>
                </div>
                <ModalTerminos show={this.state.showModal} onHide={this.closeModal} content={<ContentModal />} title={'Términos y condiciones'}/>
            </div>
        )
    }
}
export default PageForm