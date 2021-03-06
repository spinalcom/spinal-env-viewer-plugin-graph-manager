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

import { SpinalGraphService } from "spinal-env-viewer-graph-service";

export default class GraphManager {
  constructor( store ) {
    this.nodes = {};
    this.contexts = {};

    this.bindNode = (function ( node ) {
      this.store.commit( "SET_NODE", node );
    }).bind( this );
    this.onNodeAdded = (function ( nodeId ) {
      const node = SpinalGraphService.getNode( nodeId );
      SpinalGraphService.bindNode( nodeId, this, this.bindNode );
      this.store.commit( 'ADD_NODE', node );
    }).bind( this );
    this.removeNode = (function ( nodeId ) {
      this.store.commit( 'REMOVE_NODE', nodeId );
    }).bind( this );
    this.graphChange = (function () {
      SpinalGraphService.getChildren( this.graphId, ['hasContext'] )
        .then( contexts => {
          for (let i = 0; i < contexts.length; i++) {
            const contextId = contexts[i].id.get();
            if (
              (!this.contexts.hasOwnProperty( contextId ))
              && (contexts[i].name.get().indexOf( '.' ) !== 0)
              && !(contexts[i].name.get().includes( 'BIMObjectContext' ))
            ) {
              this.contexts[contextId] = contexts[i];
              SpinalGraphService.bindNode( contextId, this, this.bindNode );
            }
          }

          this.store.commit('UPDATE_CONTEXTS', contexts);
        } );

    }).bind( this );
    this.store = store;
  
     SpinalGraphService.waitForInitialization().then(()=> {
      this.graph = SpinalGraphService.getGraph();
      this.graphId = this.graph.getId().get();
      this.init();
    });
  
    
  }

  reset() {

    if (typeof this.unbind === "function") {
      this.unbind();
    }

    if (typeof this.stopListeningOnNodeAdded === 'function') {
      this.stopListeningOnNodeAdded();
    }

    if (typeof this.stopListeningOnNodeRemove === "function") {
      this.stopListeningOnNodeRemove();
    }
  
  
    this.setNodes();
    this.init().then( () => this.store.commit( 'REFRESHED' ) );

  }

  init() {
  
    this.store.subscribe( ( mutation ) => {
        if (mutation.type === 'REFRESH') {
          this.reset();
        }
        if (
          mutation.type === 'GET_NODE'
          && typeof mutation.payload !== "undefined"
          && !this.nodes.hasOwnProperty( mutation.payload )
        ) {
        
          const nodeId = mutation.payload;
          const node = SpinalGraphService.getNode( nodeId );
          if (typeof node !== "undefined") {
            this.nodes[mutation.payload] = node;
            this.store.commit( 'ADD_NODE', node );
            SpinalGraphService.getChildren( nodeId, [] ).then(
              children => {
                this.store.commit( 'ADD_NODES', children );
              }
            );
          } else {
            SpinalGraphService.findNode( nodeId ).then( node => {
            
              this.store.commit( 'ADD_NODE', node );
              SpinalGraphService.getChildren( nodeId, [] ).then(
                children => {
                  this.store.commit( 'ADD_NODES', children );
                }
              );
            } );
          }
        }
      } );
    this.stopListeningOnNodeAdded = SpinalGraphService.listenOnNodeAdded( this, this.onNodeAdded );
    this.stopListeningOnNodeRemove = SpinalGraphService.listenOnNodeRemove( this, this.removeNode );

    this.unbind = SpinalGraphService.bindNode( this.graphId, this, this.graphChange );
    this.nodes = {};
  
    this.store.dispatch( "retrieveGlobalBar", this.graph );
    this.store.commit( "SET_GRAPH", this.graph );
    this.setNodes();
    
    return SpinalGraphService.getChildren( this.graphId, ['hasContext'] )
      .then( contexts => {
        for (let i = 0; i < contexts.length; i++) {
          const contextId = contexts[i].id.get();
          if (
            (!this.contexts.hasOwnProperty( contextId ))
            && (contexts[i].name.get().indexOf( '.' ) !== 0)
            && !(contexts[i].name.get().includes( 'BIMObjectContext' ))
          ) {
            this.contexts[contextId] = contexts[i];
            SpinalGraphService.bindNode( contextId, this, this.bindNode );
          }
        }
          this.store.commit('UPDATE_CONTEXTS', contexts);
      } )
      .catch( e => console.error( e, SpinalGraphService ) );
  }
  
  setNodes() {
    const nodes = SpinalGraphService.getNodes();
    
    for (let key in nodes) {
      if (nodes.hasOwnProperty( key )) {
        this.store.commit( 'ADD_NODE', SpinalGraphService.getInfo( nodes[key].getId().get() ) );
      }
    }
  }
}
