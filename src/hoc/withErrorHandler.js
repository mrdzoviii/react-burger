import React, { Component } from "react";

import Modal from "../components/ui/modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqIntercetor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.respIntercetor = axios.interceptors.response.use(null, error => {
        this.setState({ error: error });
        return error;
      });
    }

    componentWillUnmount() {
      console.log("Will unmount");
      axios.interceptors.request.eject(this.reqIntercetor);
      axios.interceptors.response.eject(this.respIntercetor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}></WrappedComponent>
        </>
      );
    }
  };
};

export default withErrorHandler;
