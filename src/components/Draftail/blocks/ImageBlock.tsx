import React, { Component } from "react";
import MediaBlock from "./MediaBlock";
import { DraftUtils } from "draft-js";
/**
 * Editor block to preview and edit images.
 */
class ImageBlock extends Component {
  constructor(props) {
    super(props);

    this.changeAlt = this.changeAlt.bind(this);
  }

  /* :: changeAlt: (e: Event) => void; */
  changeAlt(e) {
    /* @ts-ignore */
    const { block, blockProps } = this.props;
    const { editorState, onChange } = blockProps;

    if (e.currentTarget instanceof HTMLInputElement) {
      const data = {
        alt: e.currentTarget.value
      };

      onChange(DraftUtils.updateBlockEntity(editorState, block, data));
    }
  }

  render() {
    /* @ts-ignore */
    const { blockProps } = this.props;
    const { entity, onEditEntity, onRemoveEntity } = blockProps;
    const { src, alt } = entity.getData();

    return (
      <MediaBlock
        {...this.props}
        /* @ts-ignore */
        src={src.toString()}
        label={alt || ""}
        isLoading={false}
      >
        <label className="ImageBlock__field">
          <p>Alt text</p>
          <input type="text" value={alt || ""} onChange={this.changeAlt} />
        </label>
        <button
          type="button"
          className="Tooltip__button"
          onClick={onEditEntity}
        >
          Edit
        </button>

        <button
          type="button"
          className="Tooltip__button"
          onClick={onRemoveEntity}
        >
          Remove
        </button>
      </MediaBlock>
    );
  }
}

export default ImageBlock;
