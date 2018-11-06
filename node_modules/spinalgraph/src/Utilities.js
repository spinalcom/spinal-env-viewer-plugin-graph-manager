import "spinal-core-connectorjs";

const globalType = typeof window === "undefined" ? global : window;

/**
 * Load the element pointed by the pointer
 * @param SpinalNodePointer
 * @returns {Promise<any>}
 */
function promiseLoad(SpinalNodePointer) {
    if (
        SpinalNodePointer.ptr instanceof globalType.Ptr &&
        SpinalNodePointer.ptr.data.value !== 0 &&
        typeof FileSystem._objects[SpinalNodePointer.ptr.data.value] !== "undefined"
    )
        return Promise.resolve(FileSystem._objects[SpinalNodePointer.ptr.data.value]);
    else
        return new Promise(resolve => {
            SpinalNodePointer.ptr.load(resolve);
        });
}


/**
 * Generate a random number
 * @returns {string}
 */
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

/**
 * Create a unique id based on the name
 * @param name
 * @returns {string}
 */
function guid(name) {
    return (
        name + "-" + s4() + s4() + "-" + s4() + "-" + s4() + "-" +
        s4() + "-" + s4() + s4() + s4() + "-" + Date.now().toString(16)
    );
}

export {
    promiseLoad,
    guid
}
