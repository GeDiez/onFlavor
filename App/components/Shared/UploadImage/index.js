import React, { Component } from 'react';
import './index.css';

class InputFile extends Component {
  state = {
    fileName: '',
  };
  render() {
    const { text, url } = this.props;
    return (
      <form
        className="form-file"
        action={url}
        method="post"
        encType="multipart/form-data"
      >
        <input
          id="input-file"
          type="file"
          hidden
          onChange={e => {
            const fileName = e.target.value.split('\\');
            this.setState({ fileName: fileName[2] });
          }}
        />
        <label htmlFor="input-file" className="label-file">
          <span>{this.state.fileName || text}</span>
        </label>
        <input type="submit" value="upload image" />
      </form>
    );
  }
}

export default InputFile;
