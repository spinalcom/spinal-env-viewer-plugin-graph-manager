import spinalCore from "spinal-core-connectorjs";
import { promiseLoad, guid } from "../Utilities";
import SpinalNode from "../Nodes/SpinalNode";
import SpinalNodePointer from "../SpinalNodePointer"

const globalType = typeof window === "undefined" ? global : window;

class BaseSpinalRelation extends globalType.Model {
    constructor(name) {
        super();
        this.add_attr({
            id: guid(name),
            name: name,
            parent: new SpinalNodePointer()
        })
    }

    /**
     * Return the parent of the relation.
     * @return {Promise} return a promise where the resolve function parameter is the parent
     */
    getParent() {
        return promiseLoad(this.parent);
    }

    /**
     * setElement the parent of the relation. If a parent was already setElement the parent relation is removed.
     * @param parent {SpinalNode}
     */
    setParent(parent) {
        if (typeof parent !== "undefined" && parent instanceof SpinalNode)
            this.parent.setElement(parent);
    }

    /**
     * Returns the name of the relation
     * @return {Str} Name of the relation
     */
    getName() {
        return this.name;
    }

    /**
     * Returns the type of the relation
     * @return {Number} Type of the relation
     */
    getType() {
        return -1;
    }

    /**
     * Return all the children of the relation
     * @return {Promise<globalType.Lst>}
     */
    getChildren() {
        // noinspection JSValidateTypes
        return Promise.resolve();
    }

    /**
     * Add node as child of the relation if node is a model create a node.
     * @param node {SpinalNode | globalType.Model}
     */
    addChild(node) {

    }

    /**
     * This function retrieves all the id from children of the relation and return them inside an array.
     * @return {Array} containing all the children Id of the relation
     */
    getChildrenIds() {

    }

    /**
     * Remove the child from the relation
     * @param node {SpinalNode} child of the relation
     * @return {Promise<boolean>}
     */
    async removeChild(node) {

    }

    /**
     * Removes all children from the relation
     */
    removeChildren() {
        this.getChildren()
            .then( children => {
                for (let i = 0; i < children.length; i++) {
                    this.removeChild(children[i]).then(

                    )
                }
        })
            .catch(e => {
                console.error("cannot remove child ", e);
            });
    }

    /**
     * Removes the relation from the graph
     */
    removeFromGraph() {
        this._removeFromParent();
        this.removeChildren();
    }

    /**
     * Removes the relation from the parent
     * @private
     */
    _removeFromParent() {
        this.getParent().then((parentNode) => {
            let relationMap = parentNode._getRelationListType(this.getType());

            relationMap.delete(this.name.get());
        });
    }
}

spinalCore.register_models([BaseSpinalRelation]);
export default BaseSpinalRelation;
