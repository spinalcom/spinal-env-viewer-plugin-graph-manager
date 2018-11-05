function onToolbarCreated() {
    this.viewer.removeEventListener(
        window.av.TOOLBAR_CREATED_EVENT,
        this.onToolbarCreatedBinded
    );
    this.onToolbarCreatedBinded = null;
    createToolbar.call(this);
}

function createToolbar() {
    var button1 = new window.Autodesk.Viewing.UI.Button(this.cfg.toolbar.label);
    button1.onClick = () => {
        this.tooglePanel();
    };
    var icon = button1.container.firstChild;
    icon.className = "adsk-button-icon md-icon md-icon-font md-theme-default";
    icon.innerHTML = this.cfg.toolbar.icon;
    button1.setToolTip(this.cfg.toolbar.label);
    this.subToolbar = this.viewer.toolbar.getControl(
        this.cfg.toolbar.subToolbarName
    );
    if (!this.subToolbar) {
        this.subToolbar = new window.Autodesk.Viewing.UI.ControlGroup(
            this.cfg.toolbar.subToolbarName
        );
        this.viewer.toolbar.addControl(this.subToolbar);
    }
    this.subToolbar.addControl(button1);
}


const SpinalForgeExtention = class {
    constructor(viewer, options) {
        window.Autodesk.Viewing.Extension.call(this, viewer, options);
        this.cfg = {};
        this.cfg.toolbar = {
            icon: "done", // icon name from material
            label: "label",
            subToolbarName: "spinalcom"
        };
    }
    load() {
        // add toolbar
        if (this.viewer.toolbar) {
            createToolbar.call(this);
        } else {
            this.onToolbarCreatedBinded = onToolbarCreated.bind(this);
            this.viewer.addEventListener(
                window.av.TOOLBAR_CREATED_EVENT,
                this.onToolbarCreatedBinded
            );
        }
        // create/init panel here ?
    }
    unload() {
        this.viewer.toolbar.removeControl(this.subToolbar);
    }
    toogle() {
        this.panel.setVisible(true);
    }
};