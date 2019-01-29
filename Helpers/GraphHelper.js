import {SpinalGraph} from 'spinalgraph';


export function getGraph(){
  return  window.spinal.spinalSystem
        .getModel()
        .then(forgeFile => {
            if (!forgeFile.hasOwnProperty("graph")) {
                forgeFile.add_attr({
                    graph: new SpinalGraph()
                });
            }
            return forgeFile.graph;
        });
}

export function getDisplaybleNode(node){
    const displayableNode = {info: node.info};
    return node.getChildren().then(children => {
        displayableNode.children = children;
        return displayableNode;
    })
}