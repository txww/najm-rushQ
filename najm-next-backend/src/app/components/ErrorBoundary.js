'use client';

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black">
          <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl max-w-md">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              حدث خطأ غير متوقع
            </h1>
            <p className="text-gray-300 mb-6">
              عذراً، حدث خطأ في تحميل الصفحة. يرجى المحاولة مرة أخرى.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[var(--brand-gold,#C28A17)] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#C28A17]/90 transition"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
