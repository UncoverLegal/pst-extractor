"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTDescriptorItem = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const long_1 = __importDefault(require("long"));
const PSTUtil_class_1 = require("./PSTUtil.class");
const PSTFile_class_1 = require("./PSTFile.class");
class PSTDescriptorItem {
    get subNodeOffsetIndexIdentifier() {
        return this._subNodeOffsetIndexIdentifier;
    }
    get descriptorIdentifier() {
        return this._descriptorIdentifier;
    }
    get offsetIndexIdentifier() {
        return this._offsetIndexIdentifier;
    }
    /**
     * Creates an instance of PSTDescriptorItem.
     * @param {Buffer} data
     * @param {number} offset
     * @param {PSTFile} pstFile
     * @memberof PSTDescriptorItem
     */
    constructor(data, offset, pstFile) {
        this.dataBlockData = null;
        this.dataBlockOffsets = [];
        this._pstFile = pstFile;
        if (pstFile.pstFileType == PSTFile_class_1.PSTFile.PST_TYPE_ANSI) {
            this._descriptorIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, offset, offset + 4).toNumber();
            this._offsetIndexIdentifier =
                PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, offset + 4, offset + 8).toNumber() & 0xfffffffe;
            this._subNodeOffsetIndexIdentifier =
                PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, offset + 8, offset + 12).toNumber() & 0xfffffffe;
        }
        else {
            this._descriptorIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, offset, offset + 4).toNumber();
            this._offsetIndexIdentifier =
                PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, offset + 8, offset + 16).toNumber() & 0xfffffffe;
            this._subNodeOffsetIndexIdentifier =
                PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, offset + 16, offset + 24).toNumber() & 0xfffffffe;
        }
    }
    /**
     * Get a node input stream from the offset index and read into a buffer.
     * @returns {Buffer}
     * @memberof PSTDescriptorItem
     */
    getData() {
        if (this.dataBlockData != null) {
            return this.dataBlockData;
        }
        const pstNodeInputStream = this._pstFile.readLeaf(long_1.default.fromValue(this.offsetIndexIdentifier));
        const out = Buffer.alloc(pstNodeInputStream.length.toNumber());
        pstNodeInputStream.readCompletely(out);
        this.dataBlockData = out;
        return this.dataBlockData;
    }
    /**
     * Get block offsets within current file.
     * @returns {number[]}
     * @memberof PSTDescriptorItem
     */
    getBlockOffsets() {
        debugger;
        if (this.dataBlockOffsets != null) {
            return this.dataBlockOffsets;
        }
        const offsets = this._pstFile
            .readLeaf(long_1.default.fromNumber(this.offsetIndexIdentifier))
            .getBlockOffsets();
        const offsetsOut = [];
        for (let x = 0; x < offsets.length; x++) {
            offsetsOut[x] = offsets[x].toNumber();
        }
        return offsetsOut;
    }
    /**
     * Get the size of this this leaf of the b-tree.
     * @readonly
     * @type {number}
     * @memberof PSTDescriptorItem
     */
    get dataSize() {
        return this._pstFile.getLeafSize(long_1.default.fromNumber(this.offsetIndexIdentifier));
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTDescriptorItem
     */
    toJSON() {
        return this;
    }
}
exports.PSTDescriptorItem = PSTDescriptorItem;
