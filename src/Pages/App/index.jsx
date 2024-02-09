import { useRoutes, BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider } from "../../Context";
import Home from "../Home";
import Account from "../Account";
import Orders from "../Orders";
import NotFound from "../NotFound";
import SignIn from "../SignIn";
import Navbar from "../../Components/Navbar";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/account", element: <Account /> },
    { path: "/orders", element: <Orders /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);

  return routes;
};
const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
