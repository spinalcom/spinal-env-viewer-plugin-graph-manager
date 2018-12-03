import {SpinalGraph} from 'spinalgraph';

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
                for (let i = 0; i < children.length; i++) {
                    if (children[i].info.name.get() !== 'BIMObjectContext'){
                        this.nodes.push(children[i])
                        console.log(children[i].info.name.get(),children[i].info.name.get() === 'BIMObjectContext')
                    }
                }
                console.log(this.nodes)
                if (this.nodes.length > 0)
                    store.dispatch("addContexts", this.nodes);
                store.dispatch("retrieveGlobalBar", this.graph);
                store.dispatch("setGraph", this.graph);
                this.graph.bind(this.graphChange.bind(this));

            })
        }).bind(this));

        store.subscribe((mutation, state) => {
            if (mutation.type === "PULL_CHILDREN") {
                store.dispatch('emptyPoll', mutation.payload);

                if (state.nodes.hasOwnProperty(mutation.payload))
                    state.nodes[mutation.payload].getChildren([])
                        .then(children => {
                            store.dispatch('addNodes', children);
                        })
                        .catch(e => console.error(e));
            }
        })
    }

    graphChange() {
        this.graph.getChildren(['hasContext']).then(children => {
            for (let i = 0; i < children.length; i++) {
                if (children[i].info.name.get() !== 'BIMObjectContext' && !this.nodes.includes(children[i])){
                    this.nodes.push(children[i])
                    console.log(children[i].info.name.get(),children[i].info.name.get() === 'BIMObjectContext')
                }
            }

            if (this.nodes.length > 0)
                this.store.dispatch("addContexts", this.nodes);
            this.store.dispatch("retrieveGlobalBar", this.graph);
            this.store.dispatch("setGraph", this.graph)
        })
    }
}
