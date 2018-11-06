import BaseSpinalRelation from "./BaseSpinalRelation"
import { SPINAL_RELATION_TYPE } from "./SpinalRelationFactory"
import SpinalNode from "../Nodes/SpinalNode"
import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationRef extends BaseSpinalRelation {
    constructor(name) {
        super(name);
        this.add_attr({
            children: new globalType.Lst()
        });
    }

    /**
     * This function retrieves all the id from children of the relation and return them inside an array.
     * @return {Array} containing all the children Id of the relation
     */
    getChildrenIds() {
        const res = [];
        for (let i = 0; i < this.children.length; i++) {
            res.push(this.children[i].getId());
        }
        return res;
    }

    /**
     * Return all the children of the relation
     * @return {Promise<globalType.Lst>}
     */
    getChildren() {
        // noinspection JSValidateTypes
        return Promise.resolve(this.children);
    }

    /**
     * Returns the type of the relation
     * @return {Number} Type of the relation
     */
    getType() {
        return SPINAL_RELATION_TYPE;
    }

    /**
     * Add node as child of the relation if node is a model create a node
     * @param node {SpinalNode | globalType.Model}
     */
    addChild(node) {

        if (node instanceof SpinalNode) {
            this.children.push(node);
            this.getParent().then(parent => {// noinspection JSAccessibilityCheck
                node._addParent(parent)
            });
        }
        else if (node instanceof globalType.Model) {
            const tmpNode = new SpinalNode(this.name, node);
            this.addChild(tmpNode);
        }
    }

    /**
     * Remove the child from the relation
     * @param node {SpinalNode} child of the relation
     * @return {Promise<boolean>}
     */
    async removeChild(node) {
        this.children.remove(node);
        return this.children.indexOf(node) === -1;
    }
}

spinalCore.register_models([SpinalRelationRef]);
export default SpinalRelationRef;
