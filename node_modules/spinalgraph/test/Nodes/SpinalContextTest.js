const SpinalGraphLib = require("../../build/index");
const spinalCore = require('spinal-core-connectorjs');
const connection = require("../config");
const globalType = typeof window === "undefined" ? global : window;
const assert = require("assert");


const ELEMENT_NAME = "Test Element";
const CONTEXT_TYPE = "Test type";
const CONTEXT_NAME = "Test Context";

describe("How to create a context", function () {
    it('should create a context with a name and a element', function (done) {

        //We just initialize a new graph without any element and a default type.
        const spinalGraph = new SpinalGraphLib.SpinalGraph();

        //We create a basic model which will be our element for our future context.
        const element = new globalType.Model();

        //We are giving a name to our element in order to recognize it.
        element.add_attr({
            name: ELEMENT_NAME
        });
        //We are creating a new spinal context with a type and an element.
        const spinalContext = new SpinalGraphLib.SpinalContext(CONTEXT_TYPE, CONTEXT_NAME, element);

        //We are adding the context to the graph.
        spinalGraph.addContext(spinalContext);

        //let get back our context.
        const childContextPromise = spinalGraph.getContext(CONTEXT_NAME);
        childContextPromise.then(context => {

            assert.equal(context.info.hasOwnProperty("name"), true);
            assert.equal(context.info.name, CONTEXT_NAME);

            const childElementPromise = context.getElement();

            childElementPromise.then(el => {
                assert.equal(el.name, ELEMENT_NAME);
                done();
            })
        });
    });
});