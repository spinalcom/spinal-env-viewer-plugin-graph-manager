import BaseSpinalRelation from "./BaseSpinalRelation"
import { SPINAL_RELATION_LST_PTR_TYPE } from "./SpinalRelationFactory"
import SpinalNode from "../Nodes/SpinalNode"
import { promiseLoad } from "../Utilities";
import SpinalNodePointer from "../SpinalNodePointer";
import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationLstPtr extends BaseSpinalRelation {
    constructor(name) {
        super(name);
        this.add_attr({
            children: new globalType.Lst()
        });
    }

    /**
     * This function retrieve all the id from children of the relation and return them inside an array.
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
    async getChildren() {
        const promiseList = [];
        for (let i = 0; i < this.children.length; i++) {
            let ptr = this.children[i];
            promiseList.push(promiseLoad(ptr));
        }
        const children = new globalType.Lst();
        await Promise.all(promiseList).then(values => {
            for (let i = 0; i < values.length; i++) {

                children.push(values[i]);
            }
        });
        return Promise.resolve(children)
    }

    /**
     * Returns the type of the relation
     * @return {Number} Type of the relation
     */
    getType() {
        return SPINAL_RELATION_LST_PTR_TYPE;
    }

    /**
     * Adds node as child of the relation. If the node is a model, creates a node.
     * @param node {SpinalNode | globalType.Model}
     */
    addChild(node) {
        if (node instanceof SpinalNode) {
            this.children.push(new SpinalNodePointer(node));
            this.getParent().then(parent => {
                if (typeof parent !== "undefined" && parent instanceof SpinalNode)
                    node._addParent(parent)
            })
        }
        else if (node instanceof globalType.Model) {
            const tmpNode = new SpinalNode(this.name, node);
            this.addChild(tmpNode);
        }
    }

    /**
     * Removes a child from the relation.
     * @param {SpinalNode | Model} node Node to be removed 
     * @return {Boolean} true if the child has been successfully removed, false otherwise
     */
    async removeChild(node) {
        for (let i = 0; i < this.children.length; i++) {

            if (this.children[i].info.pointed_id === node.id) {
                let ptr = this.children[i];
                this.children.remove(ptr);
            }
        }
        return this.children.indexOf(node) === -1;
    }
}

spinalCore.register_models([SpinalRelationLstPtr]);
export default SpinalRelationLstPtr;
