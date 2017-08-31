import {observable, computed, reaction} from 'mobx';
class StoreStore {
	@observable stores = {};

    addStore (name,store) {
        this.stores[name] = store;
    }
    
	removeStore (name) {
        delete this.stores[name];
    }

    getStore(name){
        return this.stores[name];
    }
}

window.p7hostGlobal.storeStore = new StoreStore();

//-------- globalStore.js ------------
export function getStoreStore() {
    return window.p7hostGlobal.storeStore;
}
export function getStore(name) {
    return getStoreStore().getStore(name)
}
export function addStore(name,store) {
    return getStoreStore().addStore(name,store)
}
export function removeStore(name) {
    return getStoreStore().removeStore(name)
}