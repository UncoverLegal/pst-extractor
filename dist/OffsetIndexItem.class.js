"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetIndexItem = void 0;
const PSTFile_class_1 = require("./PSTFile.class");
const PSTUtil_class_1 = require("./PSTUtil.class");
class OffsetIndexItem {
    get indexIdentifier() {
        return this._indexIdentifier;
    }
    get fileOffset() {
        return this._fileOffset;
    }
    get size() {
        return this._size;
    }
    /**
     * Creates an instance of OffsetIndexItem, part of the node table.
     * @param {Buffer} data
     * @param {number} pstFileType
     * @memberof OffsetIndexItem
     */
    constructor(data, pstFileType) {
        if (pstFileType == PSTFile_class_1.PSTFile.PST_TYPE_ANSI) {
            this._indexIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, 0, 4);
            this._fileOffset = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, 4, 8);
            this._size = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, 8, 10).toNumber();
            this.cRef = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, 10, 12);
        }
        else {
            this._indexIdentifier = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, 0, 8);
            this._fileOffset = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, 8, 16);
            this._size = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, 16, 18).toNumber();
            this.cRef = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, 16, 18);
        }
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof OffsetIndexItem
     */
    toJSON() {
        return this;
    }
}
exports.OffsetIndexItem = OffsetIndexItem;
