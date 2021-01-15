import React from 'react';
import {FormGroup,FormControl} from 'react-bootstrap';

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      song: ''
    }
  }

  onChangetext(e) {
    this.setState({song: e.target.value})
  }

  handleSubmit = () => {
    this.props.createSong(this.state.song)
    this.setState({song:''})
  }

  render(){
    return(
      <div>
      <form>
        <FormGroup controlId="formBasicText">
          <FormControl
            type="text"
            value={this.state.song}
            placeholder="曲名"
            onChange={ e => this.onChangetext(e)}
          />
        </FormGroup>
      </form>
      <button type="submit" onClick={this.handleSubmit}>登録</button>
      </div>
    )
  }
}

export default FormContainer;
