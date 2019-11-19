import React, { Component } from 'react';
//Images
import imgLogo from '../img/logo-rimac.png'

export const Header = function(props){
    return(
        <header>
            <div className="container">
                <div className="row">
                    <div className="logo"><img src={imgLogo} alt="Logo RIMAC Seguros"/></div>
                </div>
            </div>
        </header>
    )
}