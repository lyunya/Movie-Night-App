import React from 'react';
import { Route, Switch } from "react-router-dom";
import LoginForm from '../LoginForm/LoginForm';
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import MovieList from '../MovieList/MovieList';

class App extends React.Component {

  render(){
    return (
      <div className="App">
        <main className="App_Main">
          <Switch>
            <Route exact path={"/"} component={MovieList} />
            <Route path={"/login"} component={LoginForm} />
            <Route path="/registration" component={RegistrationForm} />
          </Switch>
        </main>
      </div>
    );
  }

}

export default App;
