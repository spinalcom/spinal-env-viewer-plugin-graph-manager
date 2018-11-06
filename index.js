import GraphManagerVue from "spinal-env-viewer-plugin-graph-manager-vue"
import GraphManagerCo from "./GraphManager.js"

const ClassName = "Graph Manager";
const PanelTitle = "GraphManager";
const ButtonLabel = "GraphManager";
const ButtonIcon = "done";

const GraphManager = class {
    constructor(viewer, options) {
        Autodesk.Viewing.Extension.call(this, viewer, options);
        this.viewer = viewer;
        this.panel = null;
    }

    load() {
        if (this.viewer.toolbar) {
            this.createUI();
        } else {
            this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
            this.viewer.addEventListener(
                av.TOOLBAR_CREATED_EVENT,
                this.onToolbarCreatedBinded
            );
        }

        return true;
    }

    onToolbarCreated() {
        this.viewer.removeEventListener(
            av.TOOLBAR_CREATED_EVENT,
            this.onToolbarCreatedBinded
        );
        this.onToolbarCreatedBinded = null;
        this.createUI();
    }

    unload() {
        this.viewer.toolbar.removeControl(this.subToolbar);
        return true;
    }

    // This function is to create your button on viewer, it used autodesk forge api
    createUI() {
        this.panel = new PanelClass(this.viewer, PanelTitle);
        var button1 = new Autodesk.Viewing.UI.Button(ButtonLabel);
        button1.onClick = e => {
            if (!this.panel.isVisible()) {
                this.panel.setVisible(true);
            } else {
                this.panel.setVisible(false);
            }
        };
        var icon = button1.container.firstChild;
        icon.className = "adsk-button-icon md-icon md-icon-font md-theme-default";
        icon.innerHTML = ButtonIcon;
        button1.setToolTip(ButtonLabel);
        this.subToolbar = this.viewer.toolbar.getControl("GraphManager");
        if (!this.subToolbar) {
            this.subToolbar = new Autodesk.Viewing.UI.ControlGroup("GraphManager");
            this.viewer.toolbar.addControl(this.subToolbar);
        }
        this.subToolbar.addControl(button1);
        this.initialize();
    }

    initialize() {
        var _container = document.createElement("div");
        _container.className = this.panel.container.id + "-pannelcontainer";

        _container.style.height = "calc(100% - 45px)";
        _container.style.overflow = "auto";
        this.panel.container.appendChild(_container);
        var appDiv = document.createElement("div");
        _container.appendChild(appDiv);
        new GraphManagerCo(GraphManagerVue.Store);

        GraphManagerVue.Component.$mount(appDiv);
    }
};

export default (function () {
    Autodesk.Viewing.theExtensionManager.registerExtension('GraphManager',
        GraphManager);

    window.spinal.ForgeExtentionManager.addExtention('GraphManager');
})();