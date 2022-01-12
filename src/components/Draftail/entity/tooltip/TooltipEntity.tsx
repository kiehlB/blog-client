import React, { Component } from "react";
import Icon from "../../components/Icon";
import Tooltip from "../../components/Tooltip";
import Portal from "../../components/Portal";

class TooltipEntity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltipAt: null
    };
  }

  /* :: openTooltip: (e: Event) => void; */
  openTooltip = e => {
    const trigger = e.target;

    if (trigger instanceof Element) {
      this.setState({ showTooltipAt: trigger.getBoundingClientRect() });
    }
  };

  /* :: closeTooltip: () => void; */
  closeToolti = () => {
    this.setState({ showTooltipAt: null });
  };

  render() {
    const {
      entityKey,
      contentState,
      children,
      onEdit,
      onRemove,
      icon,
      label
    } = this.props;
    const { showTooltipAt } = this.state;
    const { url } = contentState.getEntity(entityKey).getData();

    // Contrary to what JSX A11Y says, this should be a button but it shouldn't be focusable.
    /* eslint-disable @thibaudcolas/cookbook/jsx-a11y/interactive-supports-focus, @thibaudcolas/cookbook/jsx-a11y/anchor-is-valid */
    return (
      <a role="button" onMouseUp={this.openTooltip} className="TooltipEntity">
        <Icon icon={icon} className="TooltipEntity__icon" />
        <span className="TooltipEntity__text">{children}</span>
        {showTooltipAt && (
          <Portal
            onClose={this.closeTooltip}
            closeOnClick
            closeOnType
            closeOnResize
          >
            <Tooltip target={showTooltipAt} direction="top">
              <a
                href={url}
                title={url}
                target="_blank"
                rel="noopener noreferrer"
                className="Tooltip__link"
              >
                {label}
              </a>

              <button
                type="button"
                className="Tooltip__button"
                onClick={onEdit.bind(null, entityKey)}
              >
                Edit
              </button>

              <button
                type="button"
                className="Tooltip__button"
                onClick={onRemove.bind(null, entityKey)}
              >
                Remove
              </button>
            </Tooltip>
          </Portal>
        )}
      </a>
    );
  }
}

export default TooltipEntity;
