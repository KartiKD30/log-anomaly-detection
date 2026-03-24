import { useState } from "react";
import "./App.css";

function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);

  const handleLogin = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/login-otp/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("OTP sent");
      setOtpStep(true);
    } else {
      alert("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/verify-otp/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      onLogin();
    } else {
      alert("Invalid OTP");
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
          Log Detection System
        </p>

        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#333'
        }}>
          {otpStep ? "Verify OTP" : "Welcome Back!"}
        </h2>

        {!otpStep ? (
          <>
            <input
              type="email"
              placeholder="📧 Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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

            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'linear-gradient(135deg, #ee2a68 0%, #ff4b7d 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 20px rgba(238, 42, 104, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="🔐 Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
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

            <button
              onClick={verifyOtp}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'linear-gradient(135deg, #ee2a68 0%, #ff4b7d 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 20px rgba(238, 42, 104, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;