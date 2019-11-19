import React from 'react'
export const Modal = (props) => {
        return (
            <div>
                <div id="background-fix" className={props.show} onClick={props.onHide}></div>               
                <div id="modal" className={props.show}>
                    <div className="header">
                        <h4 className="header__title">{props.title}</h4>
                        <div className="header__close" onClick={props.onHide}>&times;</div>
                    </div>
                    <div className="body">
                        {props.content}
                    </div>
                </div>
            </div>
        )
}

export const ModalTerminos = (props) => {
    return (
        <div>
            {/* <div id="background-fix" className={props.show} onClick={props.onHide}></div>*/}            
            <div id="modal" className={props.show}>
                <div className="modal__container">
                    <div className="modal__header">
                        <h4 className="header__title">{props.title}</h4>
                        <span className="close" onClick={props.onHide}>&times;</span>
                    </div>
                    <div className="modal__body">{props.content}</div>
                </div>
            </div>
        </div>
    )
}