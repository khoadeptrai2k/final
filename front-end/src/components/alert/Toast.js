import React from 'react'

const Toast = ({msg, handleShow, bgColor}) => {

    return (
        <div className={`toast show text-light ${bgColor}`}
        style={{position:'fixed',top: '100', right: '10px', minWidth: '200px', zIndex: 50}}>
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className="mr-auto text-light">{msg.title}</strong>
                <button className="ml-2 mb-1 close text-black"
                data-dismiss="toast" style={{outline: 'none', margin:'10px'}}
                onClick={setTimeout(handleShow,2000)}   >
                    OKE SURE
                </button>
            </div>
            <div className="toast-body">
                {msg.body}
            </div>
        </div>
    )
}

export default Toast