import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider} from "react-redux";
import { Container, Switch } from "@material-ui/core";
import Employee from "./Components/Employee/Employee";
import Phone from "./Components/phone/Phone";
import {ToastProvider} from "react-toast-notifications"
import { BrowserRouter, Route, Switch as Sw } from "react-router-dom";
import Layout from "./Components/Layout/index"
import ProjectList from "./Components/Project/ProjectList"
import ProjectView from './Components/Project/ProjectView';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ToastProvider autoDismiss={true} placement="bottom-left">
        <Container maxWidth="lg">
          <Layout />
          <Sw>
            <Route path="/employee">
              <Employee />
            </Route>
            <Route path="/phone">
              <Phone />
            </Route>
            <Route exact path="/project">
              <ProjectList />
            </Route>
            <Route path="/project/:id">
              <ProjectView />
            </Route>
            <Route>
              <h1>
                Not found
              </h1>
            </Route>
          </Sw>
        </Container>
        </ToastProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
