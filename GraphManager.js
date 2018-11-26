import {SpinalGraph, SpinalContext, GraphFunction} from 'spinalgraph';


export default class GraphManager {
    constructor(store) {
        this.nodes = [];
        this.store = store;

        window.spinal.spinalSystem.getModel().then((function (forgeFile) {
            if (!forgeFile.hasOwnProperty('graph')) {
                forgeFile.add_attr({
                    graph: new SpinalGraph()
                });
            }
            this.graph = forgeFile.graph;

            this.graph.getChildren(['hasContext']).then(children => {

                this.nodes.push(...children);
                if (this.nodes.length > 0)
                    store.dispatch("addContexts", this.nodes);
                store.dispatch("retrieveGlobalBar", this.graph);
                store.dispatch("setGraph", this.graph)
            })
        }).bind(this));

        this.graph.bind(this.graphChange.bind(this));
        store.subscribe((mutation, state) => {
            if (mutation.type === "PULL_CHILDREN") {
                if (state.nodes.hasOwnProperty(mutation.payload))
                    state.nodes[mutation.payload].getChildren([])
                        .then(children => {
                            store.dispatch('addNodes', children);
                            store.dispatch('emptyPoll', mutation.payload)
                        })
                        .catch(e => console.error(e));
            }
        })
    }

      graphChange() {
          this.graph.getChildren(['hasContext']).then(children => {

              this.nodes.push(...children);
              if (this.nodes.length > 0)
                  this.store.dispatch("addContexts", this.nodes);
              this.store.dispatch("retrieveGlobalBar", this.graph);
              this.store.dispatch("setGraph", this.graph)
          })
      }

}

async function transformNode(result, context, node, set) {

    if (set.has(node))
        return;

    result['info'] = {};
    result['children'] = [];
    result['context'] = {
        context: context,
        selectedNode: node
    };

    if (node.info.hasOwnProperty("name"))
        result['info']['name'] = node.info.name.get();
    if (node.info.hasOwnProperty("color"))
        result['info']['color'] = node.info.color.get();

    let children = await node.getChildren([]);
    for (let i = 0; i < children.length; i++) {
        result['children'].push({});
        result['children'][i] = await transformNode(result['children'][i], context, children[i], set)
    }

    return result;
}


function node2display(context, node) {
    const set = new Set();

    return transformNode({}, context, node, set)
}