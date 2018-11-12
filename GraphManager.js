import {SpinalGraph, SpinalContext, GraphFunction} from 'spinalgraph';
import "./DummyButton.js"

function createDummyContext() {
    const Context = new SpinalContext("DummyContext", "DummyContext");
    Context.addChild(new window.Model(), "has floor")
}

export default class GraphManager {
    constructor(store) {
        this.nodes = [];

        window.spinal.spinalSystem.getModel().then((function (forgeFile) {
            if (!forgeFile.hasOwnProperty('graph')) {
                forgeFile.add_attr({
                    graph: new SpinalGraph()
                });
            }
            this.graph = forgeFile.graph;
            this.graph.getChildren(['hasContext']).then(children => {
                let promises = [];
                for (let i = 0; i < children.length; i++) {
                    promises.push(node2display(children[i], children[i]));
                }
                Promise.all(promises).then(result => {

                    this.nodes.push(...result);
                    if (this.nodes.length > 0)
                        store.dispatch("addNodes", this.nodes);
                    store.dispatch("retrieveGlobalBar", this.graph);
                });
            })
        }).bind(this))


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