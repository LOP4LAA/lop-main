import React, { Component, ReactNode } from "react"
import { Button } from "../../components/core/Button/Button"
import ComputerReader from "../../assets/svg/ComputerReader"
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <main className="page-background">
          <div className="content-container ">
            <div className="error-boundary-container h-full flex flex-col items-center justify-center">
              <ComputerReader />
              <h1 className="font-custom text-[40px]">Something went wrong.</h1>
              <p className="text-primary open-sans capitalize">
                I am the Gate Keeper of all errors👮 (Error Boundary🛡️)
              </p>
              <Button className="mt-6" theme="primary" size="44" onClick={this.handleReset}>
                Try Again
              </Button>
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
