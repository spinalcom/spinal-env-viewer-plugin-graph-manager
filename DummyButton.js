import spinalCore from "spinal-core-connectorjs"

const {
    spinalContextMenuService,
    SpinalContextApp
} = require("spinal-env-viewer-context-menu-service/index");

class Button1TopBar extends SpinalContextApp {
    constructor() {
        super("Button 1 TopBar", "Button 1 TopBar", {
            icon: "add",
            icon_type: "in",
            backgroundColor: "#000000",
            fontColor: "#FFFFFF"
        });
    }

    isShown(option) {

        return Promise.resolve(true);
    }

    action() {
        console.log("action button1");
    }
}


class Button2 extends SpinalContextApp {
    constructor() {
        super("Button Side bar 1", "Button side Bar 1", {
            icon: "home",
            icon_type: "in",
            backgroundColor: "#000000",
            fontColor: "#FFFFFF"
        });
    }

    isShown(option) {
        return Promise.resolve(true);
    }

    action() {
        console.log("button side bar 1");
    }
}

class Button3 extends SpinalContextApp {
    constructor() {
        super("Button side bar 2", "Button side bar 2", {
            icon: "remove_red_eye",
            icon_type: "in",
            backgroundColor: "#000000",
            fontColor: "#FFFFFF"
        });
    }

    isShown(option) {
        return Promise.resolve(true);
    }

    action() {
        console.log("button side bar 2");
    }
}
spinalContextMenuService.registerApp("GraphManagerSideBar", new Button2());
spinalContextMenuService.registerApp("GraphManagerSideBar", new Button3());
spinalContextMenuService.registerApp("GraphManagerGlobalBar", new Button1TopBar());
