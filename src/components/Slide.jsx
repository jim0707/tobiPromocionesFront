import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel'

export const Slide = function(props){
    return(
        <div className="col s31 benefits">
            <h5 className="benefits__title">¿CÓMO USAR TU CÓDIGO?</h5>
            <div className="benefits__content">
            <OwlCarousel className="owl-theme" nav={props.nav} items={1} loop={true} center={true} autoplay={true} autoplayTimeout={3000}>
                    <div className="benefits__item">
                        <h4>Ingresa a Cineplanet</h4>
                        <p>Ingresa a <a href="www.cineplanet.com.pe">www.cineplanet.com.pe</a> o al APP, escoge tu película y haz clic en “Comprar”.</p>
                    </div>                                        
                    <div className="benefits__item">
                        <h4>Selecciona</h4>
                        <p>Tu ciudad, sede, fecha, horario y el asiento de tu preferencia.</p>
                    </div>
                    <div className="benefits__item">
                        <h4>Inicia sesión</h4>
                        <p>Ingresa a tu cuenta o haz clic en “Ingresar como invitado”</p>
                    </div>
                    <div className="benefits__item">
                        <h4>Canjea tu entrada</h4>
                        <p>Ingresa el código de tu entrada gratis en “Boletos corporativos.”</p>
                    </div>
                    <div className="benefits__item">
                        <h4>Confirmación</h4>
                        <p> ¡Listo! Te llegará un correo de confirmación; sólo debes mostrarlo en la entrada de tu sala del cine.</p>
                    </div>
                </OwlCarousel>
            </div>
        </div>
    )
}