import { motion } from "framer-motion";
import "./Login.css";

function Login() {
  return (
    <div className="login-wrapper">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-header">
          <h3 className="login-title">Login</h3>
        </div>

        <input className="login-input" placeholder="Email" />
        <input className="login-input" type="password" placeholder="Password" />

        <button className="login-button">Login</button>
      </motion.div>
    </div>
  );
}

export default Login;