"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTMessageStore = void 0;
const PSTObject_class_1 = require("./PSTObject.class");
class PSTMessageStore extends PSTObject_class_1.PSTObject {
    /**
     * Creates an instance of PSTMessageStore.
     * Not much use other than to get the "name" of the PST file.
     * @param {PSTFile} pstFile
     * @param {DescriptorIndexNode} descriptorIndexNode
     * @memberof PSTMessageStore
     */
    constructor(pstFile, descriptorIndexNode) {
        super(pstFile, descriptorIndexNode);
    }
}
exports.PSTMessageStore = PSTMessageStore;
