import TodoApp from './components/todo-app';
import TodoStore from './stores/todo-store';
import ViewStore from './stores/view-store';

let storeStore = window.p7hostGlobal.storeStore;
let getStore = storeStore.getStore;
let addStore = storeStore.addStore;

addStore('view-store', new ViewStore())
addStore('todo-store', new TodoStore())


const plugin = {
    routes: [{
        path: '/todo',
        exact: true,
        component: TodoApp
    }]
}
let pluginStore = storeStore.getStore('plugin-store');
pluginStore.addPlugin(plugin);