import spinalCore from "spinal-core-connectorjs"
import SpinalNode from "./Nodes/SpinalNode";

const globalType = typeof window === "undefined" ? global : window;

/**
 * Wrapper over SpinalNodePointer containing some information about the pointed element
 */
class SpinalNodePointer extends globalType.Model {
    constructor(element) {
        super();
        this.setUp(element);
    }

    setUp(element) {
        this.add_attr({
            ptr: new globalType.Ptr(),
            info: {
                pointed_id: "undefined",
                pointed_type: "undefined"
            }
        });

        if ((typeof element !== "undefined")) {
            this.setElement(element);
        }

    }

    /**
     * Set pointer to point to this element
     * @param element {*}
     */
    setElement(element) {
        if (element instanceof SpinalNode) {
            this.info.pointed_id.set(element.getId());
            this.info.pointed_type.set(element.getType());
        }
        this.ptr.set(element);
    }

    /**
     * This function returns the id of the pointed element
     * @return {Str}
     */
    getId() {
        return this.info.pointed_id;
    }


}

spinalCore.register_models([SpinalNodePointer]);
export default SpinalNodePointer
