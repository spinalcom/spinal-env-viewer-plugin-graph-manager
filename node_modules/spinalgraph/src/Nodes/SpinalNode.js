import spinalCore from "spinal-core-connectorjs";
import { promiseLoad, guid } from "../Utilities";
import SpinalNodePointer from "../SpinalNodePointer"

const globalType = typeof window === "undefined" ? global : window;

import {
    SPINAL_RELATION_TYPE,
    SPINAL_RELATION_LST_PTR_TYPE,
    SPINAL_RELATION_PTR_LST_TYPE,
    SpinalRelationFactory
} from "../Relations/SpinalRelationFactory"
import SpinalMap from "../SpinalMap"

class SpinalNode extends globalType.Model {
    /**
     *
     * @param type of the spinalNode default SpinalNode
     * @param element optional element pointed by the node by default setElement to a new empty new Model
     */
    constructor(type = "SpinalNode", element = new globalType.Model) {
        super();
        this.add_attr({
            info: {
                id: guid(this.constructor.name),
                type: type,
            },
            //contain a list of SpinalRelationRef {relationName: Lst}
            relationListTypeSpinalRelation: new SpinalMap(),
            //contain a list of SpinalRelationLstPtr {relationName: Lst}
            relationListTypeSpinalRelationLstPtr: new SpinalMap(),

            //contain a list of SpinalRelationPtrLst {relationName: Lst}
            relationListTypeSpinalRelationPtrLst: new SpinalMap(),

            //SpinalMap<String, Pointer>
            parents: new SpinalMap(),
            //
            element: new SpinalNodePointer(element),
            _relationTypesLst: [
                SPINAL_RELATION_TYPE,
                SPINAL_RELATION_LST_PTR_TYPE,
                SPINAL_RELATION_PTR_LST_TYPE
            ]
        });
    }

    /**
     * Shortcut to info.id
     * @return {Str}
     */
    getId() {
        return this.info.id;
    }

    /**
     * Return the element
     * @return a promise where the parameter of the resolve method is the element.
     */
    getElement() {
        return promiseLoad(this.element);
    }

    /**
     * Shortcut to info.type
     * @return {Str} type of the node.
     */
    getType() {
        return this.info.type;
    }

    /**
     * Verify if the node contain the relation name @param relationName
     * @param relationName {string} name of the relation.
     * @param relationType {int} relation type
     * @return {Boolean} return true is the relation is contain in the node false otherwise.
     */
    hasRelation(relationName, relationType) {
        return this._getRelationListType(relationType).has(relationName);
    }

    /**
     * Verify if the node contain all the relation name contain @param relationName
     * @param relationNames {array} Array containing all the relation name
     * @param relationType {int} relation type
     * @return {Boolean} return true if the node contain all the relations contain in relationNames false otherwise.
     */
    hasRelations(relationNames, relationType) {
        let res = true;

        for (let i = 0; i < relationNames.length && res; i++) {
            res = this.hasRelation(relationNames[i], relationType)
        }

        return res;
    }

    /**
     * Add the @param as child of the relation
     * @param child {SpinalNode | Model} element to add as child
     * @param relationName {string} name of the relation
     * @param relationType {int} type of the relation
     * @return {Str}
     */
    addChild(child, relationName, relationType) {

        if (child instanceof SpinalNode) {
            return this._addToRelation(child, relationName, relationType);
        }
        else if (child instanceof globalType.Model) {
            return this._createNodeAndAddChildToRelation(child, relationName, relationType);
        }

        throw new Error("Cannot add a child witch is not an instance of SpinalNode or Model.");
    }

    /**
     * Remove the node from the relation children.
     * @param {SpinalNode} node
     * @param {String} relationName
     * @param {Number} relationType
     */
    removeChild(node, relationName, relationType) {
        if (this._getRelationListType(relationType).has(relationName)) {
            let rel = this._getRelationListType(relationType).getElement(relationName);
            return rel.removeChild(node);
        }

        return false;
    }

    /**
     * Remove the node from the graph i.e remove the node from all the parent relation and remove all the children relation
     * this operation might also delete all the sub-graph under this node.
     * After this operation the node can be deleted without fear.
     */
    removeFromGraph() {
        this._removeFromParents();
        this._removeFromChildren();
    }

    /**
     * Return all children for the relation name no matter the type of relation
     * @param relationNames {Array} containing the relation name of the desired children
     * @return {Promise<Array | never | void>} containing all children for the relation name. The array might be empty
     */
    getChildren(relationNames) {
        if (relationNames.length > 0) {
            const promises = [];
            for (let i = 0; i < this._relationTypesLst.length; i++) {
                const relationMap = this._getRelationListType(this._relationTypesLst[i].get());
                for (let j = 0; j < relationNames.length; j++) {
                    if (relationMap.has(relationNames[j])) {
                        const relation = relationMap.getElement(relationNames[j]);
                        if (typeof relation.getChildren === 'function')
                            promises.push(relation.getChildren());
                        else
                            //TODO implement SpinalError
                            console.error(relation);
                    }
                }
            }
            return Promise.all(promises).then(childrenLst => {
                const res = [];

                for (let i = 0; i < childrenLst.length; i++) {
                    for (let j = 0; j < childrenLst[i].length; j++) {
                        res.push(childrenLst[i][j]);
                    }
                }

                return res;
            });
        }
        else {
            return Promise.resolve(this._getAllChildren());
        }
    }

    /**
     * Return all parents for the relation name no matter the type of relation
     * @param relationNames {Array} containing the relation name of the desired parents
     * @return {Array} containing all parents for the relation name. The array might be empty
     */
    getParent(relationNames) {
        const parents = [];

        this.parents.forEach(parent => {
            promiseLoad(parent).then(relation => {
                parents.push(relation.getParent());
            });
        });

        return parents;
    }

    /**
     * This function transforms the relation type lst into an array.
     * @return {Array}
     * @private
     */
    _getRelationTypeArray() {
        const res = [];

        for (let i = 0; i < this._relationTypesLst.length; i++) {
            res.push(this._relationTypesLst[i]);
        }

        return res;
    }

    /**
     * Return the relation list corresponding to the relation type
     * @param relationType Type of the relation
     * @return {SpinalMap} Return the relation list corresponding to the relation type
     * @private
     */
    _getRelationListType(relationType) {
        switch (relationType) {
            case SPINAL_RELATION_TYPE:
                return this.relationListTypeSpinalRelation;

            case SPINAL_RELATION_LST_PTR_TYPE:
                return this.relationListTypeSpinalRelationLstPtr;

            case SPINAL_RELATION_PTR_LST_TYPE:
                return this.relationListTypeSpinalRelationPtrLst;

            default:
                throw new Error("Unknown relation type: ".concat(relationType.toString()));
        }

    }

    /**
     * Add a node as child.
     * If this node doesn't have a relation name relationName with the type relationType this method will create it.
     * @param node {SpinalNode} to add as child.
     * @param relationName {String} name of the relation
     * @param relationType {int} type of the relation
     * @return {Str} id of the relation where the node was added as child
     * @private
     */
    _addToRelation(node, relationName, relationType) {
        const addToRelation = (spinalNode) => {
            const relationLst = spinalNode._getRelationListType(relationType);
            const relation = relationLst.getElement(relationName);
            console.log(relation.addChild);
            relation.addChild(node);
            node._addAsParent(this._getRelationListType(relationType).getElement(relationName));
            return this._getRelationListType(relationType).getElement(relationName).id;
        };

        if (this.hasRelation(relationName, relationType)) {
            addToRelation(this)
        }
        else {
            this._createRelation(relationName, relationType);
            addToRelation(this);
        }
    }

    /**
     * Remove the node from all parent relation the property parents
     * @private
     */
    _removeFromParents() {
        function removeFromParent(parent) {
            parent.removeChild(this);
        }

        const removeFromParentBinded = removeFromParent.bind(this);
        this.parents.forEach((parent) => {
            for (let i = 0; i < parent.length; i++) {
                promiseLoad(parent[i]).then(removeFromParentBinded);
            }
        });
    }

    /**
     * Add the relation as parent of the node.
     * If the node doesn't contain a parents named liked relation Name create a parent and push the relation.
     * @param relation
     * @private
     */
    _addAsParent(relation) {
        const relationName = relation.getName();
        if (this.parents.has(relationName)) {
            this.parents.getElement(relationName).push(new SpinalNodePointer(relation));
        }
        else {
            const list = new globalType.Lst();
            list.push(new SpinalNodePointer(relation));
            this.parents.setElement(relationName, list);
        }
    }

    /**
     * Add the node as parent
     * @param node {SpinalNode}
     * @private
     */
    _addParent(node) {
        if (typeof this.parent !== "undefined" && node instanceof SpinalNode)
            this.parent.push(new SpinalNodePointer());
    }

    /**
     * Create a node which points to the element and add it to the corresponding relation
     * @param {*} element
     * @param {String} relationName
     * @param {Number} relationType
     * @private
     */
    _createNodeAndAddChildToRelation(element, relationName, relationType) {
        const node = new SpinalNode(element);
        return this._addToRelation(node, relationName, relationType);
    }


    /**
     * Create a new relation for this node
     * @param {String} relationName
     * @param {Number} relationType
     * @private
     */
    _createRelation(relationName, relationType) {
        const relation = SpinalRelationFactory.getNewRelation(relationName, relationType);
        //setElement the node as parent of the relation
        relation.setParent(this);

        this._getRelationListType(relationType).setElement(relationName, relation)
    }

    /**
     * Remove all children relation from the graph.
     * This operation might also delete all the sub-graph under this node.
     * @private
     */
    _removeFromChildren() {
        this.relationListTypeSpinalRelation.forEach(relation => {
            relation.removeFromGraph();
        });
        this.relationListTypeSpinalRelationLstPtr.forEach(relation => {
            relation.removeFromGraph();
        });
        this.relationListTypeSpinalRelationPtrLst.forEach(relation => {
            relation.removeFromGraph();
        });
    }


    async  _childrenToList(relation) {
        const lst = [];
        let childrenLst = await relation.getChildren();
        for (let i = 0; i < childrenLst.length; i++) {
            lst.push(childrenLst[i]);
        }
        return lst;
    }

    /**
     * Return all children
     * @return {Array}
     * @private
     */
    async _getAllChildren() {
        let res = [];

        try {

            for (let i = 0; i < this._relationTypesLst.length; i++) {
                let type = this._relationTypesLst[i].get();
                let childrenRelationMap = this._getRelationListType(type);
                let keys = childrenRelationMap.keys();
                for (let j = 0; j < keys.length; j++) {
                    let children = await this._childrenToList(childrenRelationMap[keys[j]]);
                    res.push(...children);
                }
            }
        }

        catch (e) {
            console.error(e);
        }

        return res;
    }
}

spinalCore.register_models([SpinalNode]);
export default SpinalNode;
