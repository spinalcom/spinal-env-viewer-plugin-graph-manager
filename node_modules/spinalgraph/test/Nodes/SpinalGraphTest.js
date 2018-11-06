const lib = require("../../build/index");
const spinalCore = require('spinal-core-connectorjs');
const connection = require("../config");
const globalType = typeof window === "undefined" ? global : window;
const assert = require("assert");


const DEFAULT_SPINAL_NODE_TYPE = "SpinalNode";
const CUSTOM_SPINAL_NODE_TYPE = "SpinalNodeTest";
const DEFAULT_RELATION_NAME = "hasContext";
const DEFAULT_ELEMENT_NAME = "Default Name";
const CUSTOM_RELATION_NAME1 = "custom relation";
const CUSTOM_RELATION_NAME2 = "custom relation 2";
const DEFAULT_NODE = new lib.SpinalNode(CUSTOM_SPINAL_NODE_TYPE);
const DEFAULT_ELEMENT = new globalType.Model();
DEFAULT_ELEMENT.add_attr({ name: DEFAULT_ELEMENT_NAME });


describe("SpinalGraph", function () {
    describe("how to create a graph and its default configuration", function () {
        it("should create and setup a new graph", function () {
            //Create a new graph
            const graph = new lib.SpinalGraph();
            //check if the newly created graph is an instance of SpinalGraph.
            assert.equal(graph instanceof lib.SpinalGraph, true);
            //check if the newly created graph is an instance of SpinalNode.
            assert.equal(graph instanceof lib.SpinalNode, true);
            //check if the relationListTypeSpinalRelationLstPtr has at least one relation.
            assert.equal(graph.relationListTypeSpinalRelation.hasKey(), true);
            //check if the relationListTypeSpinalRelationLstPtr has the default relation.
            assert.equal(graph.relationListTypeSpinalRelation.has(DEFAULT_RELATION_NAME), true)
        })
    });
    describe("how to add a context to a graph", function () {
        it('should add a context to a graph', function (done) {
            //Create a new graph
            const graph = new lib.SpinalGraph();
            //Create a new Context
            const context = new lib.SpinalContext("context type", "context name");
            //add the context as child of the graph
            graph.addContext(context);
            graph.getContext("context name")
                .then(child => {
                    assert.equal(child, context);
                    done();
                })
                .catch(e => {
                    console.error(e);
                    done(e);
                });
            /*
            graph.getChildren([DEFAULT_RELATION_NAME]).then(children => {
                console.log(children);
                assert.equal(children.length, 1, "it should have exactly one");
                assert.equal(children[0], context);
                done()
            }).catch(e => {
                console.log(e);
                done()
            });*/
        });
    })
});

