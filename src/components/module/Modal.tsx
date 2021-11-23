import React from 'react'
import styled from "styled-components";
import { ModalType } from '../../declarations/modal'

const Modal: React.FC<ModalType> = ({ setShow }) => {
  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <Overlay onClick={() => closeModal()} />
      <Main>Modal</Main>
    </>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.64);
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Main = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: #fff;
  transform: translate(-50%, -50%);
`;