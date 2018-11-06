const lib = require("../../build/index");
const spinalCore = require('spinal-core-connectorjs');
const connection = require("../config");
const globalType = typeof window === "undefined" ? global : window;
const spinalRelationFactory = new lib.SpinalRelationFactory();
const assert = require("assert");
const DEFAULT_SPINAL_RELATION_NAME = "DEFAULT NAME";

describe("How to use the SpinalRelationLstPtr", function () {

    describe("How to create a SpinalRelationLstPtr", function () {
        it('should instantiate a new SpinalRelationLstPtr', function () {
            const spinalRelationLstPtr = new lib.SpinalRelationLstPtr(DEFAULT_SPINAL_RELATION_NAME);
            assert.equal(spinalRelationLstPtr instanceof lib.SpinalRelationLstPtr, true);
            assert.equal(spinalRelationLstPtr.name, DEFAULT_SPINAL_RELATION_NAME);
        });
    });

    describe("How to add a child to a relation", function () {
        it('should add a node to the relation as child', function (done) {
            const spinalRelationLstPtr = new lib.SpinalRelationLstPtr(DEFAULT_SPINAL_RELATION_NAME);
            const spinalNode = new lib.SpinalNode();
            spinalRelationLstPtr.addChild(spinalNode);
            spinalRelationLstPtr.getChildren().then((children) => {
                assert.equal(children.length, 1);
                assert.equal(children[0], spinalNode);
                done()
            })
        });
    });
});

describe("How behave the three different type of spinalRelation ", function () {
    it('should behave exactly the same way', function (done) {
        //let reference all the type of relation to be able to iterate over them
        const relationType = [lib.SPINAL_RELATION_TYPE, lib.SPINAL_RELATION_LST_PTR_TYPE, lib.SPINAL_RELATION_PTR_LST_TYPE];
        const spinalNode = new lib.SpinalNode();
        //All the type of relation return a promise contain a Lst in the resolve function
        const promiseRelations = [];
        relationType.forEach(type => {
            //Here we're are using the RelationFactory to simply the process
            const relation = lib.SpinalRelationFactory.getNewRelation(DEFAULT_SPINAL_RELATION_NAME, type);
            relation.addChild(spinalNode);
            promiseRelations.push(relation.getChildren());
        });
        Promise.all(promiseRelations).then((lists) => {
            //We have three type of relation and we add one child to each relation so promise all should return lst of children
            assert.equal(lists.length, 3);
            //each Lst should only have one child
            lists.forEach(lst => {
                assert.equal(lst.length, 1);
                assert.equal(lst[0], spinalNode);
            });
            done();
        })

    });
});