import React, { Component } from 'react';

import {
    Root,Home,Child,GrandChild,CatchAll
} from './root';

import TodoApp from './components/todo-app';
import logo from './logo.svg';
import dynamicJsCssLoader from './utils/dynamic-jscss-loader';
import './App.css';
let storeStore = window.p7hostGlobal.storeStore;

class App extends Component {
  noTodoRoutes(){
    let routeConfigStore = storeStore.getStore('router-config-store')
    routeConfigStore.clearRoutes();
    routeConfigStore.setCatchAllRoute({ path: '*',
              exact: true,
              component: CatchAll
            });
    routeConfigStore.addRoutes([
            { path: '/',
              exact: true,
              component: App
            },
            { path: '/child/:id',
              component: Child,
              routes: [
                { path: '/child/:id/grand-child',
                  component: GrandChild
                }
              ]
            }
          ]);
    routeConfigStore.setRootComponent(Root);
    routeConfigStore.publishFinalRouteTable();
	}
  withTodoRoutes(){
    let routeConfigStore = storeStore.getStore('router-config-store')
    routeConfigStore.clearRoutes();
    routeConfigStore.setCatchAllRoute({ path: '*',
              exact: true,
              component: CatchAll
            });
    routeConfigStore.addRoutes([
            { path: '/',
              exact: true,
              component: App
            },
            { path: '/todo',
              exact: true,
              component: TodoApp
            },
            { path: '/child/:id',
              component: Child,
              routes: [
                { path: '/child/:id/grand-child',
                  component: GrandChild
                }
              ]
            }
          ]);
    routeConfigStore.setRootComponent(Root);
    routeConfigStore.publishFinalRouteTable();
  }

  loadTodoPlugin(){
    dynamicJsCssLoader.loadExternalJsCss({
      key: 'todo-component',
     jsBundle: {
        path: 'dist/bundle.js'
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => {this.withTodoRoutes()}}>With Todo Routes!</button>
        <button onClick={() => {this.noTodoRoutes()}}>No Todo Routes!</button>
        <button onClick={() => {this.loadTodoPlugin()}}>Load Todo Plugin!</button>
      </div>
    );
  }
}

export default App;
