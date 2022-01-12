// @flow
import React from "react";
import TooltipEntity from "./tooltip/TooltipEntity";
import FontIcon from "../components/FontIcon";

export const DOCUMENT_ICON = <FontIcon icon="document" />;

const Document = ({ entityKey, contentState, children, onEdit, onRemove }) => {
  const { url, id } = contentState.getEntity(entityKey).getData();
  // Supports documents defined based on a URL, and id.
  const label = url ? url.replace(/(^\w+:|^)\/\//, "").split("/")[0] : id;

  return (
    <TooltipEntity
      entityKey={entityKey}
      contentState={contentState}
      onEdit={onEdit}
      onRemove={onRemove}
      icon={DOCUMENT_ICON}
      label={label}
    >
      {children}
    </TooltipEntity>
  );
};

export default Document;
