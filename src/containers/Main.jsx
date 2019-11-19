import React, {Component} from 'react';
import {Switch, Route,Redirect,BrowserRouter} from 'react-router-dom'
import {Header} from './../components/Header'
import PageForm from './PageForm'
import Confirmation from './Confirmation'
import './../css/style.css';


class Main extends Component {
   render() {
      return (
            <div>
            <Header/>
            <BrowserRouter>                  
            <Switch>
                  <Route exact path='/promociones' component={PageForm}/>
                  <Route path='/promociones/confirmacion' render={(props) => {
                        if (props.history.action == 'PUSH')
                              return <Confirmation {...props}/>
                        else
                              return <Redirect from='/promociones/confirmacion' to='/promociones'/>
                  }} />
            </Switch>
            </BrowserRouter>
         </div>

      
      );
   }
}
export default Main

/*
<div>
            <Header/>
            <BrowserRouter>                  
            <Switch>
                  <Route exact path='/promociones' 
                        render={(props) => {
                              return <Redirect from='/promociones' to='/promociones/soatdigital'/>
                        }} 
                  />

                  <Route path='/promociones/soatdigital' component={PageForm}/>
                  <Route path='/promociones/soatdigital/confirmacion' render={(props) => {
                        if (props.history.action == 'PUSH')
                              return <Confirmation {...props}/>
                        else
                              return <Redirect from='/promociones/soatdigital/confirmacion' to='/promociones/soatdigital'/>
                  }} />
            </Switch>
            </BrowserRouter>
         </div>*/