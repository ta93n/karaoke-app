import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";


class ViewSong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateText: '',
    }
  }

  handleDelete = () => {
    let result = window.confirm('削除しますか？');
    if (result) {
      this.props.onDelete(this.props.data.id)
    } else {
      console.log('キャンセルがクリックされました');
    }
  }

  handleUpdate = () => {
    this.props.onUpdate(this.props.data.id, this.state.updateText)
  }

  handleInput = (e) => {
    this.setState({updateText: e.target.value})
  }

  render() {
    return(
      <tr align="center">
        <td>{this.props.data.title}</td>
        <td><input type="text" value={this.state.updateText} onChange={e => this.handleInput(e)} /></td>
        <td><button type="submit" onClick={this.handleUpdate}>更新！</button></td>
        <td>
          <span className="editButton">
            <FontAwesomeIcon icon={faEdit} />
          </span>
          <span className="deleteButton" onClick={this.handleDelete}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </td>
      </tr>
    );
  }
}

export default ViewSong;
