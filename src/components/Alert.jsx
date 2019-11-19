import React from 'react'
export const Alert = (props) => {
        return (
            <div>
                <div id="background-fix" className={props.show} onClick={props.onHide}></div>               
                <div id="alert" className={props.show}>
                    <div className="header-alert">
                        <div className="header-alert__imagen">
                            <img src={require('../img/alert-image.png')} height="auto" alt="" />
                        </div>
                        <div className="header-alert__close" onClick={props.onHide}>&times;</div>
                    </div>
                    <div className="body">
                        <h2>{props.title}</h2>
                        <div className="text">
                            {props.content}
                        </div>
                        <div className="input-field">
                            <a className="btn-green" onClick={props.onHide}>LISTO</a>
                        </div>
                    </div>
                </div>
            </div>
        )
}