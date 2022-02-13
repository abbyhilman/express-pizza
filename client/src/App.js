import "./App.css";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import OrderScreen from "./screens/OrderScreen";
import PageNotFound from "./screens/PageNotFound";
import AdminScreen from "./screens/AdminScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/cart" exact component={CartScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/regis" exact component={RegisterScreen} />
          <Route path="/order" exact component={OrderScreen} />
          <Route path="/admin" component={AdminScreen} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
