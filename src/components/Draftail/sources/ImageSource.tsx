import React, { Component } from "react";

import { AtomicBlockUtils, EditorState } from "draft-js";

import Modal from "../components/Modal";

class ImageSource extends Component {
  constructor(props) {
    super(props);

    /* @ts-ignore */
    const { entity } = this.props;
    const state = {
      src: ""
    };

    if (entity) {
      const data = entity.getData();
      state.src = data.src;
    }

    this.state = state;
  }

  /* :: onConfirm: (e: Event) => void; */
  onConfirm = e => {
    const {
      /* @ts-ignore */
      editorState,
      /* @ts-ignore */
      entity,
      /* @ts-ignore */
      entityKey,
      /* @ts-ignore */
      entityType,
      /* @ts-ignore */
      onComplete
    } = this.props;
    /* @ts-ignore */
    const { src } = this.state;
    const content = editorState.getCurrentContent();
    let nextState;

    e.preventDefault();

    if (entity && entityKey) {
      const nextContent = content.mergeEntityData(entityKey, { src });
      nextState = EditorState.push(editorState, nextContent, "apply-entity");
    } else {
      const contentWithEntity = content.createEntity(
        // Fixed in https://github.com/facebook/draft-js/commit/6ba124cf663b78c41afd6c361a67bd29724fa617, to be released.
        // $FlowFixMe
        entityType.type,
        "MUTABLE",
        {
          alt: "",
          src
        }
      );
      nextState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        contentWithEntity.getLastCreatedEntityKey(),
        " "
      );
    }

    onComplete(nextState);
  };

  /* :: onRequestClose: (e: SyntheticEvent<>) => void; */
  onRequestClose = e => {
    /* @ts-ignore */
    const { onClose } = this.props;
    e.preventDefault();

    onClose();
  };

  /* :: onAfterOpen: () => void; */
  onAfterOpen = () => {
    /* @ts-ignore */
    const input = this.inputRef;

    if (input) {
      input.focus();
      input.select();
    }
  };

  /* :: onChangeSource: (e: Event) => void; */
  onChangeSource = e => {
    if (e.target instanceof HTMLInputElement) {
      const src = e.target.value;
      this.setState({ src });
    }
  };

  render() {
    /* @ts-ignore */
    const { src } = this.state;
    return (
      <Modal
        onRequestClose={this.onRequestClose}
        onAfterOpen={this.onAfterOpen}
        isOpen
        contentLabel="Image chooser"
      >
        <form className="ImageSource" onSubmit={this.onConfirm}>
          <label className="form-field">
            <span className="form-field__label">Image src</span>
            <input
              ref={inputRef => {
                /* @ts-ignore */
                this.inputRef = inputRef;
              }}
              type="text"
              onChange={this.onChangeSource}
              value={src}
              placeholder="/media/image.png"
            />
          </label>

          <button type="submit" className="Tooltip__button">
            Save
          </button>
        </form>
      </Modal>
    );
  }
}

export default ImageSource;
