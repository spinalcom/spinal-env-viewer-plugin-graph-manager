import { SpinalGraphService } from "spinal-env-viewer-graph-service";

export default class GraphManager {
  constructor( store ) {
    this.nodes = [];
    this.store = store;
    this.graph = SpinalGraphService.getGraph();
    this.graphId = SpinalGraphService.getGraph().info.id.get();
    this.store.subscribe( ( mutation, state ) => {
      if (mutation.type === "PULL_CHILDREN") {
        this.store.dispatch( 'emptyPoll', mutation.payload );

        if (state.nodes.hasOwnProperty( mutation.payload )) {
          SpinalGraphService
            .getChildren( mutation.payload, [] )
            .then( children => { this.store.dispatch( 'addNodes', children ); } )
            .catch( e => console.error( e ) );
        }
      }
      if (mutation.type === 'BIND_NODE') {
        SpinalGraphService.bindNode( mutation.payload.nodeId, this, mutation.payload.func );
      }

      if (mutation.type === 'RESET') {
        this.reset();
      }
    } );
    this.init();
  }

  reset() {

    if (typeof this.unbind === "function") {
      this.unbind();
    }

    if (typeof this.stopListening === 'function') {
      this.stopListening();
    }

    this.unbind = SpinalGraphService.bindNode( this.graphId, this, this.graphChange.bind( this ) );
    this.stopListening = SpinalGraphService.listenOnNodeAdded( this, this.onNodeAdded.bind( this ) );
    const nodes = SpinalGraphService.getNodes();
    console.log( nodes );
    for (let key in nodes) {
      if (nodes.hasOwnProperty( key )) {
        this.store.commit( 'ADD_NODE', SpinalGraphService.getInfo( nodes[key].getId().get() ) );
      }
    }
    SpinalGraphService.getChildren( this.graphId, ['hasContext'] )
      .then( children => {
        this.getContext( this.store, children );
        this.store.commit( 'SET_RESET', true );

      } )
      .catch( e => console.error( e, SpinalGraphService ) );

  }

  init() {

    this.unbind = SpinalGraphService.bindNode( this.graphId, this, this.graphChange.bind( this ) );
    this.stopListening = SpinalGraphService.listenOnNodeAdded( this, this.onNodeAdded.bind( this ) );

    SpinalGraphService.getChildren( this.graphId, ['hasContext'] )
      .then( children => this.getContext( this.store, children ) )
      .catch( e => console.error( e, SpinalGraphService ) );
  }

  getContext( store, children ) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].name.get() !== 'BIMObjectContext') {
        this.nodes.push( children[i] );
      }
    }

    store.dispatch( "retrieveGlobalBar", this.graph );
    store.dispatch( "setGraph", this.graph );
  }

  bindNode( id, ) {
    SpinalGraphService.getChildren( id, [] ).then( children => {
      for (let i = 0; i < children.length; i++) {
        if (!this.nodes.includes( children[i] )) {

          SpinalGraphService.bindNode( children[i].id.get(), this, this.bindNode.bind( this, children[i].id.get() ) );
          this.nodes.push( children[i] );
        }
      }

      if (this.nodes.length > 0) {
        this.store.dispatch( "addNodes", this.nodes );
      }
    } );
  }

  graphChange() {
    SpinalGraphService.getChildren( this.graphId, ['hasContext'] ).then( children => {
      for (let i = 0; i < children.length; i++) {
        if (children[i].name.get() !== 'BIMObjectContext' && !this.nodes.includes( children[i] )) {
          SpinalGraphService.bindNode( children[i].id.get(), this, this.bindNode.bind( this, children[i].id.get() ) );
          this.nodes.push( children[i] );
        }
      }

      if (this.nodes.length > 0) {
        this.store.dispatch( "addContexts", this.nodes );
      }
      this.store.dispatch( "retrieveGlobalBar", this.graph );
      this.store.dispatch( "setGraph", this.graph );
    } );
  }

  onNodeAdded( nodeId ) {
    this.store.dispatch( 'addNodes', SpinalGraphService.getRealNode( nodeId ) );
  }
}
