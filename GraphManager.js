import { SpinalGraphService } from "spinal-env-viewer-graph-service";

export default class GraphManager {
  constructor( store ) {
    this.nodes = [];
    this.store = store;
    this.graph = SpinalGraphService.getGraph();
    this.graphId = SpinalGraphService.getGraph().info.id.get();
    SpinalGraphService.getChildren( this.graphId, ['hasContext'] )
      .then( children => this.getContext( store, children ) )
      .catch( e => console.error( e, SpinalGraphService ) );

    this.unbind = SpinalGraphService.bindNode( this.graphId, this, this.graphChange.bind( this ) );

    store.subscribe( ( mutation, state ) => {
        if (mutation.type === "PULL_CHILDREN") {
          store.dispatch( 'emptyPoll', mutation.payload );

          if (state.nodes.hasOwnProperty( mutation.payload )) {
            SpinalGraphService.getChildren( mutation.payload, [] ).then( children => {
              store.dispatch( 'addNodes', children );
            } )
              .catch( e => console.error( e ) );
          }
        }
        if (mutation.type === 'BIND_NODE') {
          SpinalGraphService.bindNode( mutation.payload.nodeId, this, mutation.payload.func );
        }
      }
    );

    this.stopListening = SpinalGraphService.listenOnNodeAdded( this, this.onNodeAdded.bind( this ) )
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


  graphChange() {
    SpinalGraphService.getChildren( this.graphId, ['hasContext'] ).then( children => {
      for (let i = 0; i < children.length; i++) {
        if (children[i].name.get() !== 'BIMObjectContext' && !this.nodes.includes( children[i] )) {
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
