import { useState } from "react";
import Auth from "./Auth";
import MainLayout from "./MainLayout";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {!loggedIn ? (
        <Auth onLogin={() => setLoggedIn(true)} />
      ) : (
        <MainLayout onLogout={() => setLoggedIn(false)} />
      )}
    </>
  );
}

export default App;