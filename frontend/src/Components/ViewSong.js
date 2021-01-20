import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";


class ViewSong extends React.Component {

  handleDelete = () => {
    const result = window.confirm('削除しますか？');
    if (result) {
      this.props.onDelete(this.props.data.id);
    }
  }

  render() {
    return(
      <tr align="center">
        <td>{this.props.data.title}</td>
        <td></td>
        <td></td>
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
