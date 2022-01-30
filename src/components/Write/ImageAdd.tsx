import React, { Component } from 'react';
import styles from './styles.module.css';
import imageCompression from 'browser-image-compression';
import styled from 'styled-components';

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
      const compressedFile = await imageCompression(file, options);
      this.setState({ selectedFile: compressedFile });
      console.log('done with the img1');
    } catch (error) {
      console.log(error);
    }
    if (!this.state.selectedFile) return;
    const reader = new FileReader();
    // @ts-ignore
    reader.readAsDataURL(this.state.selectedFile);
    reader.onloadend = () => {
      this.addImage(reader.result);

      console.log('done with the img2');
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
        <ButtonStyles>
          <label htmlFor="fileInput">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1.5rem"
              width="1.5rem"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
            </svg>
          </label>

          <input
            id="fileInput"
            name="image"
            type="file"
            className="p-1.5 cursor-pointer hover:bg-neutral-100 transition-all"
            onChange={this.handleFileInputChange}
            value={this.state.fileInputState}
            style={{ display: 'none' }}
          />
        </ButtonStyles>
      </>
    );
  }
}

const ButtonStyles = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: rgb(134, 142, 150);
  cursor: pointer;
`;
