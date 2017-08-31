import './startup';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import DevTool from 'mobx-react-devtools';
import './index.css';
import {
    Root,Home,Child,GrandChild
} from './root';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {getStore,addStore} from './stores/store-store';
import TodoStore from './stores/todo-store';
import ViewStore from './stores/view-store';
import TodoApp from './components/todo-app';
addStore('view-store',new ViewStore())
addStore('todo-store',new TodoStore())


const routes = [
    { component: Root,
      routes: [
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
      ]
    }
  ]

ReactDOM.render((  
    <div>
    <DevTool />
    <HashRouter>
        {/* kick it all off with the root route */}
        {renderRoutes(routes,{ viewStore: getStore('view-store'),todoStore: getStore('todo-store') })}
  </HashRouter>
  </div>
)
, document.getElementById('root'));
registerServiceWorker();
