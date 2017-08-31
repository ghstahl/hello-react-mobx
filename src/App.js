import React, { Component } from 'react';
import {getStore,addStore} from './stores/store-store';
import {
    Root,Home,Child,GrandChild,CatchAll
} from './root';
import TodoApp from './components/todo-app';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  addTodoRoutes(){
    let routeConfigStore = getStore('router-config-store')
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
        <button onClick={() => {this.addTodoRoutes()}}>Add Todo Routes!</button>
      </div>
    );
  }
}

export default App;
