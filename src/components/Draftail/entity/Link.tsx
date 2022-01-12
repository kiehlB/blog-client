import React from "react";
import TooltipEntity from "./tooltip/TooltipEntity";

const CUSTOM_ICON_URLS = {
  "://www.youtube.com/": "#icon-media",
  "://one.npr.org/": "#icon-media",
  "://twitter.com/": "#icon-twitter"
};

const getLinkIcon = (url, linkType) => {
  const isEmailLink = linkType === "email" || url.startsWith("mailto:");

  if (isEmailLink) {
    return "#icon-mail";
  }

  const customIcon = Object.keys(CUSTOM_ICON_URLS).find(key =>
    url.includes(key)
  );

  if (customIcon) {
    return CUSTOM_ICON_URLS[customIcon];
  }

  return "#icon-link";
};

const openTooltip = e => {
  const trigger = e.target;
  if (trigger instanceof Element) {
    let rect = trigger.getBoundingClientRect();
    this.setState({ showTooltipAt: rect });
  }
};

const closeTooltip = () => {
  this.setState({ showTooltipAt: null });
};

const Link = ({ entityKey, contentState, children, onEdit, onRemove }) => {
  const { url, linkType } = contentState.getEntity(entityKey).getData();
  const icon = getLinkIcon(url, linkType);
  const label = url.replace(/(^\w+:|^)\/\//, "").split("/")[0];

  return (
    <TooltipEntity
      entityKey={entityKey}
      contentState={contentState}
      onEdit={onEdit}
      onRemove={onRemove}
      icon={icon}
      label={label}
    >
      {children}
    </TooltipEntity>
  );
};

export default Link;
