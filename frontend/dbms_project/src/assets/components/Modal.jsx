
import React, { useState } from "react";
import clost_btn  from '../images/Vector.svg';
import "../styles/modal.css";

export default function Modal({children,title}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
      Add Record
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>{title}</h2>
            
             {children}
            
            <button className="close-modal" onClick={toggleModal}>
              <img  src={clost_btn} alt="close" />
            </button>
          </div>
        </div>
      )}
          </>
  );
}
