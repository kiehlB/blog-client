import React, { Component } from "react";
import ReactDOM from "react-dom";

class Portal extends Component {
  constructor(props) {
    super(props);

    this.onCloseEvent = this.onCloseEvent.bind(this);
  }

  componentDidMount() {
    /* @ts-ignore */
    const { onClose, closeOnClick, closeOnType, closeOnResize } = this.props;

    /* @ts-ignore */
    if (!this.portal) {
      /* @ts-ignore */
      this.portal = document.createElement("div");

      if (document.body) {
        /* @ts-ignore */
        document.body.appendChild(this.portal);
      }

      if (onClose) {
        if (closeOnClick) {
          document.addEventListener("mouseup", this.onCloseEvent);
        }

        if (closeOnType) {
          document.addEventListener("keyup", this.onCloseEvent);
        }

        if (closeOnResize) {
          window.addEventListener("resize", onClose);
        }
      }
    }

    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { children } = this.props;

    /* @ts-ignore */
    ReactDOM.render(<div>{children}</div>, this.portal);
  }

  componentWillUnmount() {
    /* @ts-ignore */
    const { onClose } = this.props;

    if (document.body) {
      /* @ts-ignore */
      document.body.removeChild(this.portal);
    }

    document.removeEventListener("mouseup", this.onCloseEvent);
    document.removeEventListener("keyup", this.onCloseEvent);
    window.removeEventListener("resize", onClose);
  }

  /* :: onCloseEvent: (e: Event) => void; */
  onCloseEvent(e) {
    /* @ts-ignore */
    const { onClose } = this.props;

    /* @ts-ignore */
    if (e.target instanceof Element && !this.portal.contains(e.target)) {
      onClose();
    }
  }

  render() {
    return null;
  }
}
/* @ts-ignore */
Portal.defaultProps = {
  children: null,
  closeOnClick: false,
  closeOnType: false,
  closeOnResize: false
};

export default Portal;
