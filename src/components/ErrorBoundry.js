import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Caught by ErrorBoundary:", error);
    console.log("Error info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Something went wrong.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary