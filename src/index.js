import './startup';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import DevTool from 'mobx-react-devtools';
import './index.css';
import {
    Root,Home,Child,GrandChild,CatchAll
} from './root';
import App from './App';

import './stores/route-config-store';

import registerServiceWorker from './registerServiceWorker';
import {getStore,addStore} from './stores/store-store';
import TodoStore from './stores/todo-store';
import ViewStore from './stores/view-store';
import TodoApp from './components/todo-app';
addStore('view-store',new ViewStore())
addStore('todo-store',new TodoStore())

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
/*
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
        },
        { path: '*',
          exact: true,
          component: CatchAll
        }
      ]
    }
  ]
*/
@observer
class AppRouterContainer extends React.Component {
  render() {
		const {routes} = this.props;
		return ( 
      <HashRouter>
        {/* kick it all off with the root route */}
        {renderRoutes(routes)}
      </HashRouter>
    )
	}
}
AppRouterContainer.propTypes = {
	routes: PropTypes.array.isRequired
}

ReactDOM.render((  
    <div>
    <DevTool />
    <AppRouterContainer routes={routeConfigStore.routes}></AppRouterContainer>
    
  </div>
)
, document.getElementById('root'));
registerServiceWorker();
