"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTObject = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const long_1 = __importDefault(require("long"));
const OutlookProperties_1 = require("./OutlookProperties");
const PSTNodeInputStream_class_1 = require("./PSTNodeInputStream.class");
const PSTTableBC_class_1 = require("./PSTTableBC.class");
const PSTUtil_class_1 = require("./PSTUtil.class");
class PSTObject {
    /**
     * Creates an instance of PSTObject, the root class of most PST Items.
     * @memberof PSTObject
     */
    constructor(pstFile, descriptorIndexNode, pstTableItems) {
        this.descriptorIndexNode = null;
        this.localDescriptorItems = null;
        this.pstTableBC = null;
        this.pstTableItems = null;
        this.pstFile = pstFile;
        if (descriptorIndexNode) {
            this.loadDescriptor(descriptorIndexNode);
        }
        if (pstTableItems) {
            this.pstTableItems = pstTableItems;
        }
    }
    /**
     * Load a descriptor from the PST.
     * @protected
     * @param {PSTFile} pstFile
     * @param {DescriptorIndexNode} descriptorIndexNode
     * @memberof PSTObject
     */
    loadDescriptor(descriptorIndexNode) {
        this.descriptorIndexNode = descriptorIndexNode;
        // get the table items for this descriptor
        const offsetIndexItem = this.pstFile.getOffsetIndexNode(descriptorIndexNode.dataOffsetIndexIdentifier);
        const pstNodeInputStream = new PSTNodeInputStream_class_1.PSTNodeInputStream(this.pstFile, offsetIndexItem);
        this.pstTableBC = new PSTTableBC_class_1.PSTTableBC(pstNodeInputStream);
        this.pstTableItems = this.pstTableBC.getItems();
        if (descriptorIndexNode.localDescriptorsOffsetIndexIdentifier.notEquals(long_1.default.ZERO)) {
            this.localDescriptorItems = this.pstFile.getPSTDescriptorItems(descriptorIndexNode.localDescriptorsOffsetIndexIdentifier);
        }
    }
    /**
     * Get table items.
     * @protected
     * @param {PSTFile} theFile
     * @param {DescriptorIndexNode} folderIndexNode
     * @param {PSTTableBC} pstTableBC
     * @param {Map<number, PSTDescriptorItem>} localDescriptorItems
     * @memberof PSTObject
     */
    prePopulate(folderIndexNode, pstTableBC, localDescriptorItems) {
        this.descriptorIndexNode = folderIndexNode;
        this.pstTableItems = pstTableBC.getItems();
        this.pstTableBC = pstTableBC;
        this.localDescriptorItems = localDescriptorItems
            ? localDescriptorItems
            : null;
    }
    /**
     * Get the descriptor identifier for this item which can be used for loading objects
     * through detectAndLoadPSTObject(PSTFile theFile, long descriptorIndex)
     * @readonly
     * @type {long}
     * @memberof PSTObject
     */
    get descriptorNodeId() {
        // Prevent null pointer exceptions for embedded messages
        if (this.descriptorIndexNode != null) {
            return long_1.default.fromNumber(this.descriptorIndexNode.descriptorIdentifier);
        }
        else {
            return long_1.default.ZERO;
        }
    }
    /**
     * Get the node type for the descriptor id.
     * @param {number} [descriptorIdentifier]
     * @returns {number}
     * @memberof PSTObject
     */
    getNodeType(descriptorIdentifier) {
        if (descriptorIdentifier) {
            return descriptorIdentifier & 0x1f;
        }
        else if (this.descriptorIndexNode) {
            return this.descriptorIndexNode.descriptorIdentifier & 0x1f;
        }
        else {
            return -1;
        }
    }
    /**
     * Get a number.
     * @protected
     * @param {number} identifier
     * @param {number} [defaultValue]
     * @returns {number}
     * @memberof PSTObject
     */
    getIntItem(identifier, defaultValue) {
        if (!defaultValue) {
            defaultValue = 0;
        }
        if (this.pstTableItems && this.pstTableItems.has(identifier)) {
            const item = this.pstTableItems.get(identifier);
            if (item) {
                return item.entryValueReference;
            }
        }
        return defaultValue;
    }
    /**
     * Get a boolean.
     * @protected
     * @param {number} identifier
     * @param {boolean} [defaultValue]
     * @returns {boolean}
     * @memberof PSTObject
     */
    getBooleanItem(identifier, defaultValue) {
        if (defaultValue === undefined) {
            defaultValue = false;
        }
        if (this.pstTableItems && this.pstTableItems.has(identifier)) {
            const item = this.pstTableItems.get(identifier);
            if (item) {
                return item.entryValueReference != 0;
            }
        }
        return defaultValue;
    }
    /**
     * Get a double.
     * @protected
     * @param {number} identifier
     * @param {number} [defaultValue]
     * @returns {number}
     * @memberof PSTObject
     */
    getDoubleItem(identifier, defaultValue) {
        if (defaultValue === undefined) {
            defaultValue = 0;
        }
        if (this.pstTableItems && this.pstTableItems.has(identifier)) {
            const item = this.pstTableItems.get(identifier);
            if (item) {
                const longVersion = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(item.data);
                // interpret {low, high} signed 32 bit integers as double
                return new Float64Array(new Int32Array([longVersion.low, longVersion.high]).buffer)[0];
            }
        }
        return defaultValue;
    }
    /**
     * Get a long.
     * @protected
     * @param {number} identifier
     * @param {long} [defaultValue]
     * @returns {long}
     * @memberof PSTObject
     */
    getLongItem(identifier, defaultValue) {
        if (defaultValue === undefined) {
            defaultValue = long_1.default.ZERO;
        }
        if (this.pstTableItems && this.pstTableItems.has(identifier)) {
            const item = this.pstTableItems.get(identifier);
            if (item && item.entryValueType == 0x0003) {
                // we are really just an int
                return long_1.default.fromNumber(item.entryValueReference);
            }
            else if (item && item.entryValueType == 0x0014) {
                // we are a long
                if (item.data != null && item.data.length == 8) {
                    return PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(item.data, 0, 8);
                }
                else {
                    console.error('PSTObject::getLongItem Invalid data length for long id ' +
                        identifier);
                    // Return the default value for now...
                }
            }
        }
        return defaultValue;
    }
    /**
     * Get a string.
     * @protected
     * @param {number} identifier
     * @param {number} [stringType]
     * @param {string} [codepage]
     * @returns {string}
     * @memberof PSTObject
     */
    getStringItem(identifier, stringType, codepage) {
        if (!stringType) {
            stringType = 0;
        }
        const item = this.pstTableItems
            ? this.pstTableItems.get(identifier)
            : undefined;
        if (item) {
            if (!codepage) {
                codepage = this.stringCodepage;
            }
            // get the string type from the item if not explicitly set
            if (!stringType) {
                stringType = item.entryValueType;
            }
            // see if there is a descriptor entry
            if (!item.isExternalValueReference) {
                return PSTUtil_class_1.PSTUtil.createJavascriptString(item.data, stringType, codepage);
            }
            if (this.localDescriptorItems != null &&
                this.localDescriptorItems.has(item.entryValueReference)) {
                // we have a hit!
                const descItem = this.localDescriptorItems.get(item.entryValueReference);
                try {
                    const data = descItem ? descItem.getData() : null;
                    if (data == null) {
                        return '';
                    }
                    return PSTUtil_class_1.PSTUtil.createJavascriptString(data, stringType, codepage);
                }
                catch (err) {
                    console.error('PSTObject::getStringItem error decoding string\n' + err);
                    return '';
                }
            }
        }
        return '';
    }
    /**
     * Get a codepage.
     * @readonly
     * @type {string}
     * @memberof PSTObject
     */
    get stringCodepage() {
        // try and get the codepage
        let cpItem = this.pstTableItems ? this.pstTableItems.get(0x3ffd) : null; // PidTagMessageCodepage
        if (cpItem == null) {
            cpItem = this.pstTableItems ? this.pstTableItems.get(0x3fde) : null; // PidTagInternetCodepage
        }
        if (cpItem != null) {
            return PSTUtil_class_1.PSTUtil.getInternetCodePageCharset(cpItem.entryValueReference);
        }
        return '';
    }
    /**
     * Get a date.
     * @param {number} identifier
     * @returns {Date}
     * @memberof PSTObject
     */
    getDateItem(identifier) {
        if (this.pstTableItems && this.pstTableItems.has(identifier)) {
            const item = this.pstTableItems.get(identifier);
            if (item && item.data.length == 0) {
                return new Date(0);
            }
            if (item) {
                const hi = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(item.data, 4, 8);
                const low = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(item.data, 0, 4);
                return PSTUtil_class_1.PSTUtil.filetimeToDate(hi, low);
            }
        }
        return null;
    }
    /**
     * Get a blob.
     * @protected
     * @param {number} identifier
     * @returns {Buffer}
     * @memberof PSTObject
     */
    getBinaryItem(identifier) {
        if (this.pstTableItems && this.pstTableItems.has(identifier)) {
            const item = this.pstTableItems.get(identifier);
            if (item && item.entryValueType == 0x0102) {
                if (!item.isExternalValueReference) {
                    return item.data;
                }
                if (this.localDescriptorItems != null &&
                    this.localDescriptorItems.has(item.entryValueReference)) {
                    // we have a hit!
                    const descItem = this.localDescriptorItems.get(item.entryValueReference);
                    try {
                        return descItem ? descItem.getData() : null;
                    }
                    catch (err) {
                        console.error('PSTObject::Exception reading binary item\n' + err);
                        throw err;
                    }
                }
            }
        }
        return null;
    }
    /**
     * Get the display name of this object.
     * https://msdn.microsoft.com/en-us/library/office/cc842383.aspx
     * @readonly
     * @type {string}
     * @memberof PSTObject
     */
    get displayName() {
        return this.getStringItem(OutlookProperties_1.OutlookProperties.PR_DISPLAY_NAME);
    }
    /**
     * JSON the object.
     * @returns {string}
     * @memberof PSTObject
     */
    toJSON() {
        return this;
    }
}
exports.PSTObject = PSTObject;
