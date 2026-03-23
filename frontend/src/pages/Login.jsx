import { motion } from "framer-motion";

function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      
      <motion.div
        className="card p-4 shadow-lg"
        style={{ width: "350px" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-center mb-3">Login</h3>

        <input className="form-control mb-3" placeholder="Email" />
        <input className="form-control mb-3" type="password" placeholder="Password" />

        <button className="btn btn-primary w-100">Login</button>
      </motion.div>

    </div>
  );
}

export default Login;