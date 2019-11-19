import React from 'react'
import imgPreloader from '../img/preloader.gif'
export const Preloader = (props) => {
        return (
            <div className ="preloader-container" style={{display: props.show ? 'block':'none'}}>
                <div className ="loader" >
                    <img src={imgPreloader} alt="Preloader" />
                    <p>Cargando...</p>
                </div>
            </div>
        )
}