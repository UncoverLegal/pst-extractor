"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTTableItem = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const long_1 = __importDefault(require("long"));
const PSTUtil_class_1 = require("./PSTUtil.class");
// Generic table item
// Provides some basic string functions
class PSTTableItem {
    constructor() {
        this._itemIndex = 0;
        this._entryType = long_1.default.ZERO;
        this._isExternalValueReference = false;
        this._entryValueReference = 0;
        this._entryValueType = 0;
        this._data = Buffer.alloc(0);
    }
    set itemIndex(val) {
        this._itemIndex = val;
    }
    get itemIndex() {
        return this._itemIndex;
    }
    set entryType(val) {
        this._entryType = val;
    }
    get entryType() {
        return this._entryType;
    }
    set isExternalValueReference(val) {
        this._isExternalValueReference = val;
    }
    get isExternalValueReference() {
        return this._isExternalValueReference;
    }
    set entryValueReference(val) {
        this._entryValueReference = val;
    }
    get entryValueReference() {
        return this._entryValueReference;
    }
    set entryValueType(val) {
        this._entryValueType = val;
    }
    get entryValueType() {
        return this._entryValueType;
    }
    set data(val) {
        this._data = val;
    }
    get data() {
        return this._data;
    }
    /**
     * Creates an instance of PSTTableItem.
     * @memberof PSTTableItem
     */
    /**
     * Get long value from table item.
     * @returns
     * @memberof PSTTableItem
     */
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getLongValue() {
        if (this.data.length > 0) {
            return PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(this.data);
        }
        return -1;
    }
    /**
     * Get string value of data.
     * @param {number} [stringType]
     * @returns {string}
     * @memberof PSTTableItem
     */
    getStringValue(stringType) {
        if (!stringType) {
            stringType = this.entryValueType;
        }
        if (stringType === PSTTableItem.VALUE_TYPE_PT_UNICODE) {
            // little-endian unicode string
            try {
                if (this.isExternalValueReference) {
                    return 'External string reference!';
                }
                return this.data.toString('utf16le').replace(/\0/g, '');
            }
            catch (err) {
                console.error('Error decoding string: ' +
                    this.data.toString('utf16le').replace(/\0/g, '') +
                    '\n' +
                    err);
                return '';
            }
        }
        if (stringType == PSTTableItem.VALUE_TYPE_PT_STRING8) {
            return this.data.toString();
        }
        return 'hex string';
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTTableItem
     */
    toJSON() {
        const clone = Object.assign({
            itemIndex: this.itemIndex,
            entryType: this.entryType,
            isExternalValueReference: this.isExternalValueReference,
            entryValueReference: this.entryValueReference,
            entryValueType: this.entryValueType,
            data: this.data,
        }, this);
        return clone;
    }
}
exports.PSTTableItem = PSTTableItem;
PSTTableItem.VALUE_TYPE_PT_UNICODE = 0x1f;
PSTTableItem.VALUE_TYPE_PT_STRING8 = 0x1e;
PSTTableItem.VALUE_TYPE_PT_BIN = 0x102;
