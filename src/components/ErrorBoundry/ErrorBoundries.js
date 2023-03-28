import React from 'react';
import './ErrorBoundries.css';

class ErrorBoundries extends React.Component {
    state = {
        error: null,
      };
    
      static getDerivedStateFromError(error) {
        return { error: error };
      }

    componentDidCatch(error, info){
        console.error(error, info);
    }

    render(){
        if (this.state.error) {
            return (
                <div className='error-container'>
                    <h3>{this.props.fallback}</h3>
                </div>
            );
          }
        return this.props.children;
    }
}

export default ErrorBoundries;
