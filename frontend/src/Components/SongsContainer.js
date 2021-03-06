import React from 'react';
import ViewSong from './ViewSong';
import Table from 'react-bootstrap/Table';

class SongsContainer extends React.Component {

  render() {
    return(
      <div className='songsList'>
        <Table bordered hover>
          <thead>
            <tr>
              <th>曲名</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.props.songs.map((data) => {
            return(
              <ViewSong
                data={data}
                key={data.id}
                onDelete={this.props.deleteSong}
                handleClickOpen={this.updateSong}
              />
            );
          })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default SongsContainer;
