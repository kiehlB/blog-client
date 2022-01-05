import React, { Component } from 'react';
import styles from './styles.module.css';
import imageCompression from 'browser-image-compression';

export default class ImageAdd extends Component {
  // Start the popover closed
  state = {
    open: false,
    fileInputState: '',
    selectedFile: '',
  };

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  // Note: make sure whenever a click happens within the popover it is not closed
  onPopoverClick = () => {
    // @ts-ignore
    this.preventNextClose = true;
  };

  openPopover = () => {
    if (!this.state.open) {
      // @ts-ignore
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  };

  closePopover = () => {
    // @ts-ignore
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
      });
    }

    // @ts-ignore
    this.preventNextClose = false;
  };

  addImage = base64EncodedImag => {
    // @ts-ignore
    const { editorState, onChange } = this.props;
    // @ts-ignore
    onChange(this.props.modifier(editorState, base64EncodedImag));
  };

  changeUrl = evt => {
    this.setState({ fileInputState: evt.target.value });
  };

  handleFileInputChange = async e => {
    e.preventDefault();
    const file = e.target.files[0];

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      console.log(e.target.value);
      const compressedFile = await imageCompression(file, options);
      this.setState({ selectedFile: compressedFile });
    } catch (error) {
      console.log(error);
    }
    if (!this.state.selectedFile) return;
    const reader = new FileReader();
    // @ts-ignore
    reader.readAsDataURL(this.state.selectedFile);
    reader.onloadend = () => {
      this.addImage(reader.result);
    };
  };

  handleSubmitFile = e => {
    e.preventDefault();
  };

  render() {
    const popoverClassName = this.state.open
      ? styles.addImagePopover
      : styles.addImageClosedPopover;
    const buttonClassName = this.state.open
      ? styles.addImagePressedButton
      : styles.addImageButton;

    return (
      <>
        <div className={styles.addImage}>
          <button className={buttonClassName} onMouseUp={this.openPopover} type="button">
            +
          </button>
          <div className={popoverClassName} onClick={this.onPopoverClick}>
            <input
              id="fileInput"
              type="file"
              name="image"
              onChange={this.handleFileInputChange}
              value={this.state.fileInputState}
            />
          </div>
        </div>
      </>
    );
  }
}
