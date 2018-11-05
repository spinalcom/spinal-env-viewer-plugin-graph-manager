import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import Vuex from "vuex";

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(Vuex);
const dummyData = {
    topBarButton: [
        {
            button: {
                icon: "home", toolTip: "", func: () => {
                }
            }, badge_content: ""
        }
    ],
    sidBarButton: [
        {
            button: {
                icon: "remove_red_eye", toolTip: "", func: () => {
                }
            }, badge_content: ""
        },
        {
            button: {
                icon: "bookmark", toolTip: "", func: () => {
                }
            }, badge_content: ""
        }
    ],
    nodes: [
        {
            info: {name: "node 1", color: "#f44"},
            children: [{info: {name: "node 2", color: "#f44"}, children: []}]
        },
        {
            info: {name: "node 3", color: "#c0ff15"},
            children: [{info: {name: "node 4", color: "#c0ff15"}, children: []}]
        }]
};
let store = new Vuex.Store({

    state: dummyData,
    mutations: {}
});
let component =  new Vue({
    render: h => h(App),
    store
});
export default {
    Component: component,
    Store: store
}
