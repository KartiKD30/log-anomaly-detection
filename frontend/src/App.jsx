import { useState } from "react";
import Auth from "./Auth";
import MainLayout from "./MainLayout";
import { ThemeProvider } from "./ThemeContext";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ThemeProvider>
      {!loggedIn ? (
        <Auth onLogin={() => setLoggedIn(true)} />
      ) : (
        <MainLayout onLogout={() => setLoggedIn(false)} />
      )}
    </ThemeProvider>
  );
}

export default App;