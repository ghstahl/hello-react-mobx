import {observable, computed, reaction} from 'mobx';
import {addStore} from './store-store';
class RouterConfigStore {
    @observable routes = [{}];

    rootComponent = null;
    mainRoutes = [];
    catchAllRoute = null;
    addStore (name,store) {
        this.stores[name] = store;
    }
    
    setRootComponent(component){
        this.rootComponent = component;
    }

    setCatchAllRoute(route){
        this.catchAllRoute = route;
    }

    addRoutes(routes){
        this.mainRoutes = this.mainRoutes.concat(routes);
    }
    clearRoutes(){
        this.mainRoutes = [];
        this.catchAllRoute = null;
    }

	publishFinalRouteTable () {
        let routes = [].concat(this.mainRoutes);
        if(this.catchAllRoute){
            routes.push(this.catchAllRoute)
        }
        this.routes[0] = {
            component:this.rootComponent,
            routes:routes
        }
    }
   
}
let routerConfigStore = new RouterConfigStore();

addStore('router-config-store',routerConfigStore)
