import React from 'react';
import axios from 'axios';
import SongsContainer from './SongsContainer';
import FormContainer from './FormContainer';
import update from 'react-addons-update'; // ObjectをImmutableに操作するためのAddon
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class MainContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songs: []
    }
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
      <div className='app-main'>
        <FormContainer handleAdd={this.handleAdd} createSong={this.createSong}/>
        <SongsContainer songData={ this.state.songs } deleteSong={this.deleteSong} updateSong={this.updateSong}/>
      </div>
    );
  }
}

export default MainContainer;