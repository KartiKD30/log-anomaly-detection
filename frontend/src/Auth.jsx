import { useState } from "react";
import "./App.css";   // ✅ keep
import "./Auth.css";  // ✅ add

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
    <div className="auth-page">

      <div className="auth-left">
  <div className="auth-left-content">

    <h1 className="logo">LDS</h1>

    <p className="headline">
      See system insights from your{" "}
      <span className="gradient-text">logs & anomalies</span>.
    </p>

  </div>
</div>
      
      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="auth-card">

          <h2>{otpStep ? "Verify OTP" : "Log in"}</h2>

          {!otpStep ? (
            <>
              <input
                type="email"
                placeholder="Mobile number, username or email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <button onClick={handleLogin}>
                Log in
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
              />

              <button onClick={verifyOtp}>
                Verify OTP
              </button>
            </>
          )}

        </div>
      </div>

    </div>
  );
}

export default Auth;