import React, { Component } from 'react';
import styles from './styles.module.css';
import imageCompression from 'browser-image-compression';
import styled from 'styled-components';
import { Spinner } from 'evergreen-ui';
import { Pane, Badge, Text } from 'evergreen-ui';

export default class ImageAdd extends Component {
  // Start the popover closed
  state = {
    open: false,
    fileInputState: '',
    selectedFile: '',
    waitForImg: 0,
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
    this.setState({ waitForImg: 2 });
  };

  changeUrl = evt => {
    this.setState({ fileInputState: evt.target.value });
  };

  handleFileInputChange = async e => {
    e.preventDefault();
    const file = e.target.files[0];
    this.setState({ waitForImg: 1 });

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

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

  WaitingFotImg = readyForFile => {
    if (readyForFile == 0) {
      return (
        <>
          <div></div>
        </>
      );
    } else if (readyForFile == 1) {
      return (
        <>
          <Spinner size={16} />
        </>
      );
    } else if (readyForFile == 2) {
      return (
        <>
          <Pane flexBasis={120}>
            <Badge color="green">Success</Badge>
          </Pane>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <ButtonStyles>
          <div className="flex">
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
            <div className="ml-2">{this.WaitingFotImg(this.state.waitForImg)}</div>
          </div>
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
