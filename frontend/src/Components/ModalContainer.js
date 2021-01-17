import React from 'react';
import Modal from 'react-modal';
import { FormGroup,FormControl } from 'react-bootstrap';
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
  constructor(props) {
    super(props);
    this.state = {
      song: ""
    }
  }

  onChangeText(e) {
    this.setState({song: e.target.value})
  }

  handleSubmit = () => {
    this.props.createSong(this.state.song)
    this.setState({song:""})
  }

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
          <FormGroup controlId="formBasicText">
            <FormControl
              type="text"
              value={this.state.song}
              placeholder="曲名"
              onChange={e => this.onChangeText(e)}
            />
          </FormGroup>
          <button type="submit" onClick={this.handleSubmit}>登録</button>
        </div>
      </Modal>
    )
  }
}

export default ModalContainer;
