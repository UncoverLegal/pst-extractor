"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTTableBC = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const long_1 = __importDefault(require("long"));
const PSTTable_class_1 = require("./PSTTable.class");
const PSTTableItem_class_1 = require("./PSTTableItem.class");
const PSTUtil_class_1 = require("./PSTUtil.class");
class PSTTableBC extends PSTTable_class_1.PSTTable {
    /**
     * Creates an instance of PSTTableBC ("Property Context").
     * @param {PSTNodeInputStream} pstNodeInputStream
     * @memberof PSTTableBC
     */
    constructor(pstNodeInputStream) {
        super(pstNodeInputStream, new Map());
        this.items = new Map();
        this.isDescNotYetInitiated = false;
        if (this.tableTypeByte != 188) {
            throw new Error('PSTTableBC::constructor unable to create PSTTableBC, table does not appear to be a bc!');
        }
        // go through each of the entries
        const keyTableInfoNodeInfo = this.getNodeInfo(this.hidRoot);
        if (!keyTableInfoNodeInfo) {
            throw new Error('PSTTableBC::constructor keyTableInfoNodeInfo is null');
        }
        const keyTableInfo = Buffer.alloc(keyTableInfoNodeInfo.length());
        keyTableInfoNodeInfo.pstNodeInputStream.seek(long_1.default.fromValue(keyTableInfoNodeInfo.startOffset));
        keyTableInfoNodeInfo.pstNodeInputStream.readCompletely(keyTableInfo);
        this.numberOfKeys = Math.trunc(keyTableInfo.length / (this.sizeOfItemKey + this.sizeOfItemValue));
        if (this.numberOfKeys == 0) {
            // debugger
        }
        // Read the key table
        let offset = 0;
        for (let x = 0; x < this.numberOfKeys; x++) {
            const item = new PSTTableItem_class_1.PSTTableItem();
            item.itemIndex = x;
            item.entryType = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(keyTableInfo, offset + 0, offset + 2);
            item.entryValueType = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(keyTableInfo, offset + 2, offset + 4).toNumber();
            item.entryValueReference = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(keyTableInfo, offset + 4, offset + 8).toNumber();
            // Data is in entryValueReference for all types <= 4 bytes long
            switch (item.entryValueType) {
                case 0x0002: // 16bit integer
                    item.entryValueReference &= 0xffff;
                case 0x0003: // 32bit integer
                case 0x000a: // 32bit error code
                case 0x0001: // Place-holder
                case 0x0004: // 32bit floating
                    item.isExternalValueReference = true;
                    break;
                case 0x000b: // Boolean - a single byte
                    item.entryValueReference &= 0xff;
                    item.isExternalValueReference = true;
                    break;
                case 0x000d:
                default:
                    // Is it in the local heap?
                    item.isExternalValueReference = true; // Assume not
                    const nodeInfoNodeInfo = this.getNodeInfo(item.entryValueReference);
                    if (nodeInfoNodeInfo == null) {
                        // It's an external reference that we don't deal with here.
                    }
                    else {
                        // Make a copy of the data
                        const nodeInfo = Buffer.alloc(nodeInfoNodeInfo.length());
                        nodeInfoNodeInfo.pstNodeInputStream.seek(long_1.default.fromValue(nodeInfoNodeInfo.startOffset));
                        nodeInfoNodeInfo.pstNodeInputStream.readCompletely(nodeInfo);
                        item.data = nodeInfo; // should be new array, so just use it
                        item.isExternalValueReference = false;
                    }
                    break;
            }
            offset = offset + 8;
            this.items.set(item.entryType.toNumber(), item);
        }
        this.releaseRawData();
    }
    /**
     * Get the items parsed out of this table.
     * @returns {Map<number, PSTTableItem>}
     * @memberof PSTTableBC
     */
    getItems() {
        return this.items;
    }
    /**
     * JSON stringify the items list.
     * @returns {string}
     * @memberof PSTTable7C
     */
    itemsJSON() {
        let s = '';
        this.items.forEach((item) => {
            s = s + JSON.stringify(item);
        });
        return s;
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTTable7C
     */
    toJSON() {
        return this;
    }
}
exports.PSTTableBC = PSTTableBC;
