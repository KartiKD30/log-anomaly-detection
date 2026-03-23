import { useState } from "react";
import "./App.css";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && otp) {
      onLogin();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ee2a68 0%, #ff4b7d 100%)',
      padding: '20px'
    }}>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'white',
        borderRadius: '20px',
        padding: '40px 30px',
        boxShadow: '0 20px 60px rgba(238, 42, 104, 0.3)',
        textAlign: 'center'
      }}>

        {/* LOGO */}
        <div style={{
          fontSize: '60px',
          marginBottom: '20px'
        }}>
          🔍
        </div>

        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '10px',
          color: '#333'
        }}>
          LDS
        </h1>

        <p style={{
          color: '#999',
          marginBottom: '30px',
          fontSize: '14px'
        }}>
          Log Anomaly Detection System
        </p>

        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#333'
        }}>
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* EMAIL INPUT */}
          <input
            type="email"
            placeholder="📧 Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: '16px',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'inherit',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ee2a68';
              e.target.style.boxShadow = '0 0 0 3px rgba(238, 42, 104, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
          />

          {/* OTP INPUT */}
          <input
            type="text"
            placeholder="🔐 Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              marginBottom: '24px',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              fontSize: '14px',
              fontFamily: 'inherit',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#ee2a68';
              e.target.style.boxShadow = '0 0 0 3px rgba(238, 42, 104, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px 20px',
              background: 'linear-gradient(135deg, #ee2a68, #ff4b7d)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: email && otp ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              marginBottom: '20px',
              opacity: email && otp ? 1 : 0.6
            }}
            onMouseEnter={(e) => {
              if (email && otp) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 24px rgba(238, 42, 104, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            disabled={!email || !otp}
          >
            {isLogin ? '🚀 Login' : '✨ Register'}
          </button>
        </form>

        {/* TOGGLE AUTH */}
        <p style={{
          color: '#999',
          fontSize: '14px',
          margin: '20px 0 0 0'
        }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: '#ee2a68',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.target.style.textDecoration = 'none';
            }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>

        {/* DEMO CREDENTIALS */}
        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #f0f0f0',
          fontSize: '12px',
          color: '#999'
        }}>
          <p style={{ margin: '0 0 8px 0' }}>Demo Credentials:</p>
          <p style={{ margin: '0 0 4px 0' }}>Email: demo@example.com</p>
          <p style={{ margin: 0 }}>OTP: 123456</p>
        </div>

      </div>
    </div>
  );
}

export default Auth;