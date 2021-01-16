import React from 'react';
import Modal from 'react-modal'; // Modalコンポーネント
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement('#root');

const modalStyle = {
  // Modal外側のスタイリング
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)"
  },
  // Modal内側のスタイリング
  content: {
    position: "absolute",
    top: "5rem",
    left: "5rem",
    right: "5rem",
    bottom: "5rem",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    padding: "1.5rem"
  }
};

class ModalContainer extends React.Component {
  render() {
    return(
      <Modal
        isOpen={this.props.isModalOpen}
        style={modalStyle}
        /* onRequestClose={() => {this.handleClickClose()}} ←外側クリックでモーダル閉じる */
        // アニメーションをスタイリングするクラス名を追加
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before"
        }}
        className={{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before"
        }}
        closeTimeoutMS={500}
      >
        <div className="modal-close">
          <button onClick={() => {this.props.handleClickClose()}}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="modal-header">
          <h2>曲を登録する</h2>
        </div>
        <div className="modal-form">
        </div>
      </Modal>
    )
  }
}

export default ModalContainer;
