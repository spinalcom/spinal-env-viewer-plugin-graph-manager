import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import Vuex from "vuex";
import {spinalContextMenuService} from "spinal-env-viewer-context-menu-service"

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(Vuex);

let store = new Vuex.Store({

    state: {
        topBarButton: [],
        sideBarButton: [],
        nodes: [],
        selectedNode: {}
    },
    getters: {},
    mutations: {
        ADD_NODES: (state, nodes) => {
            state.nodes.push(...nodes);
        },
        CHANGE_SIDE_BAR: (state, option) => {
            const buttons = [];
            for (let i = 0; i < option.buttons.length; i++) {
                if (option.buttons[i].length > 0) {
                    let button = option.buttons[i];
                    for (let j = 0; j < button.length; j++) {
                        if (typeof button[j].buttonCfg !== "undefined") {
                            let butcfg =button[j].buttonCfg;
                            butcfg.toolTip = button[j].label;
                            butcfg.action = button[j].action;
                            buttons.push({button: butcfg, badge_content: button[j].badgeCfg});
                        }
                    }
                }

            }

            state.sideBarButton = buttons;
            state.selectedNode = option.selectedNode;
        },
    },
    actions: {
        addNodes(context, nodes) {
            context.commit("ADD_NODES", nodes)
        },
        setSelectedNode(context, option) {

            const promises = [];


            if (option.selectedNode.info.hasOwnProperty("hooks"))
                for (let i = 0; i < option.selectedNode.info.hooks.length; i++) {
                    promises.push(spinalContextMenuService.getApps(option.selectedNode.info.hooks[i], option))
                }

            Promise
                .all(promises)
                .then(buttons => {
                    option.buttons = buttons;
                    context.commit("CHANGE_SIDE_BAR", option);
                })
                .catch(e => {
                    console.error(e);
                });
        }
    }
});

function badgeCfg2badgeContent(badgeCfg){

}
function buttonCfg2button(buttonCfg){

}
let component = new Vue({
    render: h => h(App),
    store
});
export default {
    Component: component,
    Store: store
}
