import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'katex/dist/katex.min.css'
import App from './App.jsx'

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CRITICAL_REACT_RENDER_CRASH:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: 'sans-serif', background: '#FFF5F5', minHeight: '100vh', color: '#C53030' }}>
          <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Application Render Error</h1>
          <p style={{ marginTop: 10, fontSize: 14 }}>{this.state.error?.toString()}</p>
          <pre style={{ marginTop: 20, padding: 15, background: '#FFF', border: '1px solid #FEB2B2', borderRadius: 8, fontSize: 12, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.stack}
          </pre>
          <pre style={{ marginTop: 10, padding: 15, background: '#FFF', border: '1px solid #FEB2B2', borderRadius: 8, fontSize: 12, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo?.componentStack}
          </pre>
          <button 
            onClick={() => { localStorage.clear(); sessionStorage.clear(); window.location.reload(); }}
            style={{ marginTop: 20, padding: '10px 20px', background: '#E53E3E', color: '#FFF', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}
          >
            Clear Local Storage &amp; Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </StrictMode>,
)
