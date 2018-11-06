const lib = require("../../build/index");
const spinalCore = require('spinal-core-connectorjs');
const connection = require("../config");
const globalType = typeof window === "undefined" ? global : window;

const assert = require("assert");

const DEFAULT_SPINAL_NODE_TYPE = "SpinalNode";
const CUSTOM_SPINAL_NODE_TYPE = "SpinalNodeTest";
const DEFAULT_RELATION_NAME = "has child";
const DEFAULT_ELEMENT_NAME = "Default Name";
const CUSTOM_RELATION_NAME1 = "custom relation";
const CUSTOM_RELATION_NAME2 = "custom relation 2";
const DEFAULT_ELEMENT = new globalType.Model();
DEFAULT_ELEMENT.add_attr({ name: DEFAULT_ELEMENT_NAME });
const DEFAULT_NODE = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE);
describe("Sanity checlk", function () {
    it('should return true', function () {
        assert.equal(0, 0);
    });

});
describe("SpinalNode", function () {

    describe("How to use the basic functions of a spinal node", function () {

        describe("How to create new spinal node.", function () {
            it('should create a new spinal node.', function () {
                const node = new lib.SpinalNode();

                assert.equal(
                    node.getType(),
                    DEFAULT_SPINAL_NODE_TYPE,
                    "The default value for the type of a spinal node is SpinalNode."
                );

            });

            it('should create spinal a new spinal node, with a specific type.', function () {
                const node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE);

                assert.equal(
                    node.getType(),
                    CUSTOM_SPINAL_NODE_TYPE,
                    "By setting the first argument of the construct the type should be setElement."
                );

            });

            it('should create a new node with custom type as type and a element', function (done) {
                const node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE, new lib.SpinalNode());
                assert.equal(
                    node.getType(),
                    CUSTOM_SPINAL_NODE_TYPE,
                    "By setting the first argument of the construct the type should be setElement.");
                node.getElement().then(
                    elt => {
                        assert.notEqual(
                            elt instanceof lib.SpinalNode,
                            false,
                            "By setting the second argument of the construct the element should be setElement."
                        );
                        done();
                    }
                )
            });
        });

        describe("How to use hasRelation", function () {

            it('should return true', function () {

                //Create a new node
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                //Add a child to the node with the default relation name
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                //Ask the node if it has a relation name $DEFAULT_RELATION_NAME
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);

            });

            it('should return false', function () {

                //Create a new node
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                //Add a child to the node with the default relation name
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                //Ask the node if it has a relation name $CUSTOM_RELATION_NAME1
                assert.equal(node.hasRelation(CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE), false);

            })

        });

        describe("How to use hasRelations", function () {

            it("should return true", function () {

                //Create a new node
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                //Add a child to the node with the default relation name
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                //Add a child to the node with the custom relation name
                node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE);
                //Ask the node if it has a relation name $DEFAULT_RELATION and CUSTOM_RELATION_NAME!
                assert.equal(node.hasRelations([DEFAULT_RELATION_NAME, CUSTOM_RELATION_NAME1], lib.SPINAL_RELATION_TYPE), true);

            });

            it("should return false", function () {
                //Create a new node
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                //Add a child to the node with the default relation name
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                //Add a child to the node with the custom relation name
                node.addChild(DEFAULT_NODE, CUSTOM_RELATION_NAME1, lib.SPINAL_RELATION_TYPE);
                //Has relations should return false because one of the relation name is not a relation of the node
                assert.equal(node.hasRelations([CUSTOM_RELATION_NAME2, CUSTOM_RELATION_NAME1], lib.SPINAL_RELATION_TYPE), false);
            })
        });

        describe("How to removeChild", function () {
            it('should return true', function (done) {
                //Create a node
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                //Add a child to the node with the default relation name
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);

                //remove the child previously added. Should return true
                node.removeChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE).then(res => {
                    assert.equal(res, true);
                    done();
                })
            });
        });

        describe("How to getElement the type of a spinal node", function () {
            it('should return the type CUSTOM_SPINAL_NODE_TYPE', function () {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE);
                assert.equal(
                    node.getType(),
                    CUSTOM_SPINAL_NODE_TYPE,
                    "By setting the first argument of the construct the type should be setElement."
                );
            });
        });

        describe("How to getElement the element of a spinal node", function () {
            it('should return the DEFAULT_ELEMENT', function (done) {
                let node = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE, DEFAULT_ELEMENT);
                node.getElement().then(elt => {
                    assert.equal(
                        elt,
                        DEFAULT_ELEMENT,
                        "By setting the second argument of the construct the element should be setElement."
                    );
                    done()
                })
            });
        });

    });

    describe("How to use a Spinal Node with SpinalRelationRef", function () {

        describe("How to add child with a SpinalRelationRef", function () {
            it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', function (done) {
                let node = new lib.SpinalNode();
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_TYPE), true);

                //check if the node contain the children
                const childrenPromise = node.getChildren([DEFAULT_RELATION_NAME]);

                childrenPromise.then(children => {

                    assert.equal(children.length, 1);
                    assert.equal(children[0], DEFAULT_NODE);

                    done();
                });
            });
        });


    });

    describe("How to use a Spinal Node with SpinalRelationPtrList", function () {

        describe("How to add child", function () {
            it('should add a child to the node with a relation type SPINAL_RELATION_TYPE', function (done) {
                let node = new lib.SpinalNode();
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_PTR_LST_TYPE), true);

                //check if the node contain the children
                const childrenPromise = node.getChildren([DEFAULT_RELATION_NAME]);

                childrenPromise.then(children => {

                    assert.equal(children.length, 1);
                    assert.equal(children[0], DEFAULT_NODE);

                    done();
                });

            });
        });
    });

    describe("How to use a Spinal Node with SpinalRelationLstPtr", function () {

        describe("How to add child", function () {
            it('should add a child to the node with a relation type SPINAL_RELATION_LST_PTR_TYPE', function (done) {


                let node = new lib.SpinalNode();
                node.addChild(DEFAULT_NODE, DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE);
                assert.equal(typeof node !== "undefined", true);
                assert.equal(node.hasRelation(DEFAULT_RELATION_NAME, lib.SPINAL_RELATION_LST_PTR_TYPE), true);

                //check if the node contain the children
                const childrenPromise = node.getChildren([DEFAULT_RELATION_NAME]);

                childrenPromise.then(children => {

                    assert.equal(children.length, 1);
                    assert.equal(children[0], DEFAULT_NODE);

                    done();
                });

            });
        });

    });

});

