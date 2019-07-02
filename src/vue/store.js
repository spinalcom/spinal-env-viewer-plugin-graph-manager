/*
 * Copyright 2019 SpinalCom - www.spinalcom.com
 *
 *  This file is part of SpinalCore.
 *
 *  Please read all of the following terms and conditions
 *  of the Free Software license Agreement ("Agreement")
 *  carefully.
 *
 *  This Agreement is a legally binding contract between
 *  the Licensee (as defined below) and SpinalCom that
 *  sets forth the terms and conditions that govern your
 *  use of the Program. By installing and/or using the
 *  Program, you agree to abide by all the terms and
 *  conditions stated or referenced herein.
 *
 *  If you do not agree to abide by these terms and
 *  conditions, do not demonstrate your acceptance and do
 *  not install or use the Program.
 *  You should have received a copy of the license along
 *  with this file. If not, see
 *  <http://resources.spinalcom.com/licenses.pdf>.
 */

import Vue from 'vue';
import VueMaterial from 'vue-material';
import Vuex from "vuex";
import { spinalContextMenuService } from "spinal-env-viewer-context-menu-service";
import {
  OPTION_CONTEXT_INFO,
  OPTION_SELECTED_NODE_INFO
} from './constantes.js';
import { SpinalGraphService } from "spinal-env-viewer-graph-service";

Vue.config.productionTip = false;

Vue.use( VueMaterial );
Vue.use( Vuex );

function initialState() {
  return {
    topBarButton: [],
    sideBarButton: [],
    contextsId: [],
    searchId: [],
    nodes: {},
    activeNodesId: [],
    sync: [],
    selectedNode: {},
    refreshed: false,
    childrenMapping: new Map()
  };

}

function refreshState() {
  return {
    activeNodesId: [],
    sync: [],
    selectedNode: {},
    refreshed: true,
  };
}

let store = new Vuex.Store( {
    
    state: initialState(),
    
    mutations: {
      ADD_CONTEXT: ( state, context ) => {
        const contextId = context.id.get();
        if (state.contextId.includes( contextId )) {
          state.contextId.push( contextId );
          if (!state.nodes.hasOwnProperty( contextId )) {
            state.nodes[contextId] = context;
          }
        }
      },
      ADD_CONTEXTS: ( state, contexts ) => {
        for (let i = 0; i < contexts.length; i++) {
          const contextId = contexts[i].id.get();
          
          if (!state.contextsId.includes( contextId )) {
            state.contextsId.push( contextId );
          }
          if (!state.nodes.hasOwnProperty( contextId )) {
            state.nodes[contextId] = contexts[i];
          }
        }
      },
      ADD_NODE: ( state, node ) => {
        if (typeof node !== "undefined" && !state.nodes.hasOwnProperty( node.id.get() )) {
          state.nodes[node.id.get()] = node;
        }
      },
      ADD_NODES: ( state, nodes ) => {
        for (let i = 0; i < nodes.length; i++) {
          const nodeId = nodes[i].id.get();
          if (typeof nodes[i] !== "undefined" && !state.nodes.hasOwnProperty( nodeId )) {
            state.nodes[nodeId] = nodes[i];
          }
        }
      },
      
      GET_NODE: ( state ) => {
        state.sync.splice( 0 );
        //cf GraphManager
      },
      
      SET_SIDE_BAR: ( state, buttons ) => {
        
        const res = [];
        for (let i = 0; i < buttons.length; i++) {
          const button = buttons[i];
          if (button.hasOwnProperty( "buttonCfg" )) {
            const butCfg = button.buttonCfg;
            butCfg.toolTip = button.label;
            butCfg.action = button.action;
            res.push( { button: butCfg, badge_content: button.badgeCfg } );
          }
        }
        
        state.sideBarButton = res;
      },
      SET_ACTIVE_NODE: ( state, activeNode ) => {
        state.activeNodesId = [activeNode];
      },
      SET_SELECTED_NODE: ( state, option ) => {
        state.selectedNode = option;
        state.selectedNode.graph = state.graph;
      },
      SET_GLOBAL_BAR: ( state, bts ) => {
        const buttons = [];
        for (let i = 0; i < bts.length; i++) {
          let button = bts[i];
          if (button.hasOwnProperty( 'buttonCfg' )) {
            let butcfg = button.buttonCfg;
            butcfg.toolTip = button.label;
            butcfg.action = button.action;
            buttons.push( {
              button: butcfg,
              badge_content: button.badgeCfg
            } );
          }
        }
        state.topBarButton = buttons;
      },
      SET_CHILDREN: ( state, payload ) => {
        if (payload.hasOwnProperty( 'parentId' ) && payload.hasOwnProperty( 'children' )) {
          state.childrenMapping.set( payload.parentId, payload.children );
        }
      },
      SET_GRAPH: ( state, graph ) => {
        state.graph = graph;
      },
      SET_NODE: ( state, node ) => {
        if (typeof node !== "undefined") {
          if (state.nodes.hasOwnProperty( node.id.get() )) {
            for (const key in node) {
              if (node.hasOwnProperty( key )) {
                state.nodes[node.id.get()][key] = node[key];
              }
            }
          } else {
            state.nodes[node.id.get()] = node;
          }
        }
        
      },
      SEARCH_TEXT: ( state, text ) => {
        while (state.searchId.length > 0) {
          state.searchId.splice( 0 );
        }
        
        for (const key in state.nodes) {
          if (state.nodes.hasOwnProperty(key)) {
            const node = state.nodes[key];
            if ( node.hasOwnProperty( 'name' )
              && node.name.get()
                .toLowerCase()
                .includes(text.toLowerCase() )) {
              state.searchId.push( key );
            }
          }
        }
      },
      
      REMOVE_NODE: ( state, id ) => {
        if (state.nodes.hasOwnProperty( id )) {
          delete state.nodes[id];
        }
      },
      REFRESHED: ( state ) => {
        state.refreshed = true;
      },
      REFRESH: ( state ) => {
        const s = refreshState();
        
        for (let key in s) {
          if (s.hasOwnProperty( key )) {
            state[key] = s[key];
        }
      }
        state.refreshed = false;
      }
    },
    
    actions: {
      getNode( context, event ) {
        SpinalGraphService.findNode( event ).then(
          node => context.commit( 'ADD_NODE', node )
        ).catch( e => console.error( e ) );
      },
      onNodeSelected( context, event ) {
        const option = {};
        option[OPTION_SELECTED_NODE_INFO] = context.state.nodes[event.nodeId];
        option[OPTION_CONTEXT_INFO] = context.state.nodes[event.contextId];
        context.commit( "SET_ACTIVE_NODE", event.nodeId );
        spinalContextMenuService
          .getApps( "GraphManagerSideBar", option )
          .then( buttons => {
            context.commit( "SET_SIDE_BAR", buttons );
            context.commit( "SET_SELECTED_NODE", option );
          } )
          .catch( e => {
            console.error( e );
          } );
      },
      retrieveGlobalBar( context, option ) {
        spinalContextMenuService.getApps( "GraphManagerTopBar", option )
          .then( buttons => {
            context.commit( "SET_GLOBAL_BAR", buttons );
          } )
          .catch( e => {
            console.error( e );
          } );
      },
      pullChildren( context, id ) {
        SpinalGraphService.getChildren( id, [] ).then(
          ( children ) => {
            for (let i = 0; i < children.length; i++) {
              for (let j = 0; j < children[i]['childrenIds'].length; j++) {
                context.dispatch( 'pullChildren', children[i]['childrenIds'][j] );
              }
            }
            context.commit( 'ADD_NODES', children );
          }
        );
      }
      
    },
    
    getters: {
      arrayNode: ( state ) => {
        return Array.from( state.nodes );
      },
      getNodeById: ( state ) => ( id ) => {
        return state.nodes[id];
      },
      getChildrenId: ( state ) => ( id ) => {
        return state.nodes[id].childrenIds;
      },
      hasChildInContext: ( state ) => ( id, contextsId ) => {
        return SpinalGraphService.hasChildInContext( id, contextsId );
      },
      
    }
    
  } )
;


export default store;