import React from 'react';
import { FormGroup,FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class CreateContainer extends React.Component {
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
      <div>
        <h2>曲を登録する</h2>
        <div className="Form">
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
      </div>
    )
  }
}

export default CreateContainer;
