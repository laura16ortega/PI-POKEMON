import "./App.css";
import { BrowserRouter, Route , Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import PokemonCreate from "./components/PokemonCreate/PokemonCreate";
import Detail from "./components/Detail/Detail";




function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
         <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path="/home/:id" component={Detail}/>
          <Route  path='/create' component={PokemonCreate} />
          </Switch>      
      </div>
      </BrowserRouter>
  );
}

export default App;

