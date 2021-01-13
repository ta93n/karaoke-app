import React from 'react';
import axios from 'axios';
import SongsContainer from './SongsContainer';
import FormContainer from './FormContainer';
import update from 'react-addons-update'; // ObjectをImmutableに操作するためのAddon
import Modal from 'react-modal'; // Modalコンポーネント
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

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
    backgroundColor: "paleturquoise",
    borderRadius: "1rem",
    padding: "1.5rem"
  }
};

class MainContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songs: [],
      isModalOpen: false
    }
  }

  handleClickOpen() {
    this.setState({isModalOpen: true});
  }

  handleClickClose() {
    this.setState({isModalOpen: false});
  }

  createSong = (song) => {
    // POST通信
    axios.post('http://localhost:3001/songs',{song: song})

    // thenで成功した場合の処理をかける
    .then((response) => {
      const newData = update(this.state.songs, {$push:[response.data]});
      this.setState({songs: newData});
    })

    // catchでエラー時の挙動を定義する
    .catch((data) => {
      console.log(data);
    })
  }

  deleteSong = (id) => {
    // DELETE通信
    axios.delete(`http://localhost:3001/songs/${id}`)

    // thenで成功した場合の処理をかける
    .then((response) => {
      const songIndex = this.state.songs.findIndex(x => x.id === id); // findIndex: 配列の中から特定の要素のインデックスを返す
      const deletedSongs = update(this.state.songs, {$splice: [[songIndex, 1]]}); // songIndex番目の要素を１つ削除する
      this.setState({songs: deletedSongs});
      console.log('set');
    })

    // catchでエラー時の挙動を定義する
    .catch((data) =>{
      console.log(data);
    })
  }

  updateSong = (id, song) => {
    // PATCH通信
    axios.patch(`http://localhost:3001/songs/${id}`,{song: song})

    // thenで成功した場合の処理をかける
    .then((response) => {
      const songIndex = this.state.songs.findIndex(x => x.id === id);
      const songs = update(this.state.songs, {
        [songIndex]: {$set: response.data} // $setでsongIndex番目の要素をresponse.dataに置き換える
      });
      this.setState({songs: songs});
    })

    // catchでエラー時の挙動を定義する
    .catch((data) =>{
      console.log(data);
    })
  }

  componentDidMount() { // axios(アクシオス HTTP通信を行うことができるJavascriptライブラリ) を使ってRailsAPIと通信を行い、結果はresultsに格納される
    // GET通信
    axios.get('http://localhost:3001/songs')

    // thenで成功した場合の処理をかける
    .then((results) => {
      console.log(results);
      this.setState({songs: results.data});
    })

    // catchでエラー時の挙動を定義する
    .catch((data) => {
      console.log(data);
    })
  }



  render() {

    return (
      <section>
        <div className="sidebar">
          <div className="sidebar-top">
          </div>
          <div className="menu">
            <div className="add-song-button">
              <button onClick={() => {this.handleClickOpen()}}>曲を登録する</button>
            </div>
            <nav>
              <li>保存した曲一覧</li>
              <li>設定</li>
            </nav>
          </div>
        </div>
        <main>
          <div className="main-top">
          </div>
          <FormContainer handleAdd={this.handleAdd} createSong={this.createSong}/>
          <SongsContainer songData={this.state.songs} deleteSong={this.deleteSong} updateSong={this.updateSong}/>
        </main>
        <Modal
          isOpen={this.state.isModalOpen}
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
          <button onClick={() => {this.handleClickClose()}}>Close Modal</button>
        </Modal>
      </section>
    );
  }
}

export default MainContainer;
