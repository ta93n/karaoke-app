import React from 'react';
import ViewSong from './ViewSong';

class SongsContainer extends React.Component {
  render() {
    return(
      <div className='SongsList'>
        {this.props.songData.map((data) => {
          return(
            <ViewSong data={ data } key={ data.id } onDelete={this.props.deleteSong} onUpdate={this.props.updateSong}/>
          );
        })}
      </div>
    )
  }
}

export default SongsContainer;
