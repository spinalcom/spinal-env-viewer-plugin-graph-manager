import BaseSpinalRelation from "./BaseSpinalRelation"
import { SPINAL_RELATION_PTR_LST_TYPE } from "./SpinalRelationFactory"
import SpinalNode from "../Nodes/SpinalNode"
import { promiseLoad } from "../Utilities";
import SpinalNodePointer from "../SpinalNodePointer";
import spinalCore from "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

class SpinalRelationPtrLst extends BaseSpinalRelation {
    constructor(name) {
        super(name);
        this.add_attr({
            children: new SpinalNodePointer(new globalType.Lst())
        });

        this.children.info.add_attr("ids", []);
    }

    /**
     * This function retrieve all the id from children of the relation and return them inside an array.
     * @return {Array} containing all the children ids of the relation
     */
    getChildrenIds() {
        return this.children.ids;
    }

    /**
     * Return all the children of the relation
     * @return {Promise<globalType.Lst>}
     */
    getChildren() {
        return promiseLoad(this.children);
    }

    /**
     * Returns the type of the relation
     * @return {Number} Type of the relation
     */
    getType() {
        return SPINAL_RELATION_PTR_LST_TYPE;
    }

    /**
     * Add node as child of the relation if node is a model create a node
     * @param node {SpinalNode | globalType.Model}
     */
    addChild(node) {
        if (node instanceof SpinalNode && !this.children.info.ids.contains(node.getId())) {
            this.children.info.ids.push(node.getId());
            promiseLoad(this.children).then((children) => {
                children.push(node);
            });
            this.getParent().then(parent => {
                node._addParent(parent)
            })
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
        const childrenLst = await promiseLoad(this.children);

        childrenLst.remove(node);

        return Promise.resolve(childrenLst.indexOf(node) === -1);
    }
}

spinalCore.register_models([SpinalRelationPtrLst]);
export default SpinalRelationPtrLst;
