"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptorIndexNode = void 0;
const PSTFile_class_1 = require("./PSTFile.class");
const PSTUtil_class_1 = require("./PSTUtil.class");
// DescriptorIndexNode is a leaf item from the Descriptor index b-tree
// It is like a pointer to an element in the PST file, everything has one...
class DescriptorIndexNode {
    get descriptorIdentifier() {
        return this._descriptorIdentifier;
    }
    get parentDescriptorIndexIdentifier() {
        return this._parentDescriptorIndexIdentifier;
    }
    get localDescriptorsOffsetIndexIdentifier() {
        return this._localDescriptorsOffsetIndexIdentifier;
    }
    get dataOffsetIndexIdentifier() {
        return this._dataOffsetIndexIdentifier;
    }
    /**
     * Creates an instance of DescriptorIndexNode, a component of the internal descriptor b-tree.
     * @param {Buffer} buffer
     * @param {number} pstFileType
     * @memberof DescriptorIndexNode
     */
    constructor(buffer, pstFileType) {
        this.itemType = 0;
        if (pstFileType == PSTFile_class_1.PSTFile.PST_TYPE_ANSI) {
            this._descriptorIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer, 0, 4).toNumber();
            this._dataOffsetIndexIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer, 4, 8);
            this._localDescriptorsOffsetIndexIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer, 8, 12);
            this._parentDescriptorIndexIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer, 12, 16).toNumber();
        }
        else {
            this._descriptorIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer, 0, 4).toNumber();
            this._dataOffsetIndexIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer, 8, 16);
            this._localDescriptorsOffsetIndexIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer, 16, 24);
            this._parentDescriptorIndexIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer, 24, 28).toNumber();
            this.itemType = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer, 28, 32).toNumber();
        }
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof DescriptorIndexNode
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toJSON() {
        return this;
    }
}
exports.DescriptorIndexNode = DescriptorIndexNode;
