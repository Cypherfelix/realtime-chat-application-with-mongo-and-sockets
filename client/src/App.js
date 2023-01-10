import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react"
import { DarkModeContext } from "./context/darkModeContext";
import { Messenger } from "./pages/messenger/Messenger";
import { AuthContext } from "./context/auth/AuthContext";
import Register from "./pages/register/Register";
function App() {
  const { darkMode } = useContext(DarkModeContext)
  const { user } = useContext(AuthContext);

  return (


    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={user ? <Home /> : <Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="orders">
              <Route index element={<List />} />
              <Route path=":orderId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="messenger">
              <Route index element={<Messenger />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
