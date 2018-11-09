import spinalCore from "spinal-core-connectorjs"

const {
    spinalContextMenuService,
    SpinalContextApp
} = require("spinal-env-viewer-context-menu-service/index");

class SpinalContextAppTest extends SpinalContextApp {
    constructor() {
        super("testlabel", "test description", {
            icon: "add",
            icon_type: "in",
            backgroundColor: "000000",
            fontColor: "FFFFFF"
        });
    }

    isShown(option) {

        return Promise.resolve(true);
    }

    action() {
        console.log("action button1");
    }
}


class SpinalContextAppTest2 extends SpinalContextApp {
    constructor() {
        super("testlabel", "test description", {
            icon: "home",
            icon_type: "in",
            backgroundColor: "000000",
            fontColor: "FFFFFF"
        });
    }

    isShown(option) {
        return Promise.resolve(true);
    }

    action() {
        console.log("action button2");
    }
}
spinalCore.register_models([SpinalContextAppTest, SpinalContextAppTest2])
spinalContextMenuService.registerApp("DummyApp1", new SpinalContextAppTest());
spinalContextMenuService.registerApp("DummyApp2", new SpinalContextAppTest2());