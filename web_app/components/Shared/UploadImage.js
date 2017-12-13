import React, { Component } from 'react';
import moment from 'moment';
import ImagesStore from '../../stores/ImagesStore';

export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
    };
  }

  async onFileChange({ target }) {
    if (target.files.length > 0) {
      const file = target.files[0];
      this.setState(
        {
          fileName: file.name,
        },
        async () => {
          const url = await ImagesStore.uploadImage(
            `${moment().format('x')}.${file.type.split('/')[1]}`,
            file.type,
            file,
          );
          this.props.onFileChange(url);
        },
      );
    }
  }

  render() {
    const { fileName } = this.state;
    return (
      <div>
        <input
          type="file"
          name="file"
          id="file"
          className="inputfile"
          accept="image/*"
          onChange={ev => this.onFileChange(ev)}
        />
        <label htmlFor="file">
          <i className="fa fa-upload" /> {fileName ? fileName : 'Choose a file'}
        </label>
      </div>
    );
  }
}
