"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTFile = void 0;
const fs = __importStar(require("fs"));
const long_1 = __importDefault(require("long"));
const DescriptorIndexNode_class_1 = require("./DescriptorIndexNode.class");
const OffsetIndexItem_class_1 = require("./OffsetIndexItem.class");
const PSTDescriptorItem_class_1 = require("./PSTDescriptorItem.class");
const PSTFolder_class_1 = require("./PSTFolder.class");
const PSTMessageStore_class_1 = require("./PSTMessageStore.class");
const PSTNodeInputStream_class_1 = require("./PSTNodeInputStream.class");
const PSTTableBC_class_1 = require("./PSTTableBC.class");
const PSTUtil_class_1 = require("./PSTUtil.class");
const NodeMap_class_1 = require("./NodeMap.class");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uuidparse = require('uuid-parse');
class PSTFile {
    get encryptionType() {
        return this._encryptionType;
    }
    get pstFileType() {
        return this._pstFileType;
    }
    get pstFilename() {
        return this._pstFilename;
    }
    constructor(arg) {
        this.guidMap = new Map([
            ['00020329-0000-0000-C000-000000000046', 0],
            ['00062008-0000-0000-C000-000000000046', 1],
            ['00062004-0000-0000-C000-000000000046', 2],
            ['00020386-0000-0000-C000-000000000046', 3],
            ['00062002-0000-0000-C000-000000000046', 4],
            ['6ED8DA90-450B-101B-98DA-00AA003F1305', 5],
            ['0006200A-0000-0000-C000-000000000046', 6],
            ['41F28F13-83F4-4114-A584-EEDB5A6B0BFF', 7],
            ['0006200E-0000-0000-C000-000000000046', 8],
            ['00062041-0000-0000-C000-000000000046', 9],
            ['00062003-0000-0000-C000-000000000046', 10],
            ['4442858E-A9E3-4E80-B900-317A210CC15B', 11],
            ['00020328-0000-0000-C000-000000000046', 12],
            ['71035549-0739-4DCB-9163-00F0580DBBDF', 13],
            ['00062040-0000-0000-C000-000000000046', 14],
        ]);
        // the type of encryption the files uses
        this._encryptionType = 0;
        // type of file (e.g. ANSI)
        this._pstFileType = 0;
        this._pstFilename = '';
        // b-tree
        this.childrenDescriptorTree = null;
        // in-memory file buffer (instead of filesystem)
        this.pstBuffer = Buffer.alloc(0);
        // position in file
        this.position = 0;
        if (arg instanceof Buffer) {
            // use an in-memory buffer of PST
            this.pstBuffer = arg;
            this.pstFD = -1;
        }
        else {
            // use PST in filesystem
            this._pstFilename = arg;
            this.pstFD = fs.openSync(this._pstFilename, 'r');
        }
        // confirm first 4 bytes are !BDN
        const buffer = Buffer.alloc(514);
        this.readSync(buffer, 514, 0);
        const key = '!BDN';
        if (buffer[0] != key.charCodeAt(0) ||
            buffer[1] != key.charCodeAt(1) ||
            buffer[2] != key.charCodeAt(2) ||
            buffer[3] != key.charCodeAt(3)) {
            throw new Error('PSTFile::open Invalid file header (expected: "!BDN"): ' + buffer);
        }
        // make sure we are using a supported version of a PST...
        if (buffer[10] === PSTFile.PST_TYPE_ANSI_2) {
            buffer[10] = PSTFile.PST_TYPE_ANSI;
        }
        if (buffer[10] !== PSTFile.PST_TYPE_ANSI &&
            buffer[10] !== PSTFile.PST_TYPE_UNICODE &&
            buffer[10] !== PSTFile.PST_TYPE_2013_UNICODE) {
            throw new Error('PSTFile::open Unrecognised PST File version: ' + buffer[10]);
        }
        this._pstFileType = buffer[10];
        // make sure no encryption
        if (this._pstFileType === PSTFile.PST_TYPE_ANSI) {
            this._encryptionType = buffer[461];
        }
        else {
            this._encryptionType = buffer[513];
        }
        if (this._encryptionType === 0x02) {
            throw new Error('PSTFile::open PST is encrypted');
        }
        // build out name to id map
        this.processNameToIDMap();
    }
    /**
     * Close the file.
     * @memberof PSTFile
     */
    close() {
        if (this.pstFD > 0) {
            fs.closeSync(this.pstFD);
        }
    }
    /**
     * Process name to ID map.
     * @private
     * @memberof PSTFile
     */
    processNameToIDMap() {
        const nameToIdMapDescriptorNode = this.getDescriptorIndexNode(long_1.default.fromNumber(97));
        // get the descriptors if we have them
        let localDescriptorItems = null;
        if (nameToIdMapDescriptorNode.localDescriptorsOffsetIndexIdentifier.toNumber() !=
            0) {
            localDescriptorItems = this.getPSTDescriptorItems(nameToIdMapDescriptorNode.localDescriptorsOffsetIndexIdentifier);
        }
        // process the map
        const off = this.getOffsetIndexNode(nameToIdMapDescriptorNode.dataOffsetIndexIdentifier);
        const nodein = new PSTNodeInputStream_class_1.PSTNodeInputStream(this, off);
        const bcTable = new PSTTableBC_class_1.PSTTableBC(nodein);
        const tableItems = bcTable.getItems();
        // Get the guids
        const guidEntry = tableItems.get(2);
        if (!guidEntry) {
            throw new Error('PSTFile::processNameToIDMap guidEntry is null');
        }
        const guids = this.getData(guidEntry, localDescriptorItems);
        const nGuids = Math.trunc(guids.length / 16);
        const guidIndexes = [];
        let offset = 0;
        for (let i = 0; i < nGuids; ++i) {
            let leftQuad = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(guids, offset, offset + 4);
            leftQuad = leftQuad.shiftLeft(32);
            let midQuad = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(guids, offset + 4, offset + 6);
            midQuad = midQuad.shiftLeft(16);
            const rightQuad = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(guids, offset + 6, offset + 8);
            const mostSigBits = leftQuad.or(midQuad).or(rightQuad);
            const leastSigBits = PSTUtil_class_1.PSTUtil.convertBigEndianBytesToLong(guids, offset + 8, offset + 16);
            // weird that need to cast below to any to get tsc error to go away - why?
            // see https://github.com/Microsoft/TypeScript/issues/6436
            const mostBuffer = mostSigBits.toBytes();
            const leastBuffer = leastSigBits.toBytes();
            const arrUID = mostBuffer.concat(leastBuffer);
            const strUID = uuidparse.unparse(arrUID).toUpperCase();
            const guid = this.guidMap.get(strUID);
            if (guid) {
                guidIndexes[i] = guid;
            }
            else {
                guidIndexes[i] = -1; // We don't know this guid
            }
            // console.log('PSTFile:: processNameToIdMap idx: ' + i + ', ' + strUID + ', ' + guidIndexes[i]);
            offset += 16;
        }
        // if we have a reference to an internal descriptor
        const mapEntries = tableItems.get(3);
        if (!mapEntries) {
            throw new Error('PSTFile::processNameToIDMap mapEntries is null');
        }
        const nameToIdByte = this.getData(mapEntries, localDescriptorItems);
        const stringMapEntries = tableItems.get(4);
        if (!stringMapEntries) {
            throw new Error('PSTFile::processNameToIDMap stringMapEntries is null');
        }
        const stringNameToIdByte = this.getData(stringMapEntries, localDescriptorItems);
        // process the entries
        for (let x = 0; x + 8 < nameToIdByte.length; x += 8) {
            const key = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(nameToIdByte, x, x + 4).toNumber();
            let guid = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(nameToIdByte, x + 4, x + 6).toNumber();
            let propId = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(nameToIdByte, x + 6, x + 8).toNumber();
            if ((guid & 0x0001) == 0) {
                // identifier is numeric
                propId += 0x8000;
                guid >>= 1;
                let guidIndex;
                if (guid == 1) {
                    guidIndex = PSTFile.PS_MAPI;
                }
                else if (guid == 2) {
                    guidIndex = PSTFile.PS_PUBLIC_STRINGS;
                }
                else {
                    guidIndex = guidIndexes[guid - 3];
                }
                PSTFile.nodeMap.setId(key, propId, guidIndex);
            }
            else {
                // identifier is a string
                // key is byte offset into the String stream in which the string name of the property is stored.
                const len = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(stringNameToIdByte, key, key + 4).toNumber();
                const keyByteValue = Buffer.alloc(len);
                PSTUtil_class_1.PSTUtil.arraycopy(stringNameToIdByte, key + 4, keyByteValue, 0, keyByteValue.length);
                propId += 0x8000;
                PSTFile.nodeMap.setId(keyByteValue.toString('utf16le').replace(/\0/g, ''), propId);
            }
        }
    }
    /**
     * Get data from a descriptor and store in buffer.
     * @private
     * @param {PSTTableItem} item
     * @param {Map<number, PSTDescriptorItem>} localDescriptorItems
     * @returns {Buffer}
     * @memberof PSTFile
     */
    getData(item, localDescriptorItems) {
        if (item.data.length != 0) {
            return item.data;
        }
        if (localDescriptorItems == null) {
            throw new Error('PSTFile::getData External reference but no localDescriptorItems in PSTFile.getData()');
        }
        if (item.entryValueType != 0x0102) {
            throw new Error('PSTFile::getData Attempting to get non-binary data in PSTFile.getData()');
        }
        const mapDescriptorItem = localDescriptorItems.get(item.entryValueReference);
        if (mapDescriptorItem == null) {
            throw new Error('PSTFile::getData Descriptor not found: ' + item.entryValueReference);
        }
        return mapDescriptorItem.getData();
    }
    /**
     * Get name to ID map item.
     * @param {number} key
     * @param {number} idx
     * @returns {number}
     * @memberof PSTFile
     */
    getNameToIdMapItem(key, idx) {
        return PSTFile.nodeMap.getId(key, idx);
    }
    /**
     * Get public string to id map item.
     * @static
     * @param {string} key
     * @returns {number}
     * @memberof PSTFile
     */
    static getPublicStringToIdMapItem(key) {
        return PSTFile.nodeMap.getId(key);
    }
    /**
     * Get property name from id.
     * @static
     * @param {number} propertyId
     * @param {boolean} bNamed
     * @returns {string}
     * @memberof PSTFile
     */
    static getPropertyName(propertyId, bNamed) {
        return PSTUtil_class_1.PSTUtil.propertyName.get(propertyId);
    }
    /**
     * Get name to id map key.
     * @static
     * @param {number} propId
     * @returns {long}
     * @memberof PSTFile
     */
    static getNameToIdMapKey(propId) {
        return PSTFile.nodeMap.getNumericName(propId);
    }
    /**
     * Get the message store of the PST file.  Note that this doesn't really
     * have much information, better to look under the root folder.
     * @returns {PSTMessageStore}
     * @memberof PSTFile
     */
    getMessageStore() {
        const messageStoreDescriptor = this.getDescriptorIndexNode(long_1.default.fromNumber(PSTFile.MESSAGE_STORE_DESCRIPTOR_IDENTIFIER));
        return new PSTMessageStore_class_1.PSTMessageStore(this, messageStoreDescriptor);
    }
    /**
     * Get the root folder for the PST file
     * @returns {PSTFolder}
     * @memberof PSTFile
     */
    getRootFolder() {
        const rootFolderDescriptor = this.getDescriptorIndexNode(long_1.default.fromValue(PSTFile.ROOT_FOLDER_DESCRIPTOR_IDENTIFIER));
        const output = new PSTFolder_class_1.PSTFolder(this, rootFolderDescriptor);
        return output;
    }
    /**
     * Read a leaf in the b-tree.
     * @param {long} bid
     * @returns {PSTNodeInputStream}
     * @memberof PSTFile
     */
    readLeaf(bid) {
        // get the index node for the descriptor index
        const offsetItem = this.getOffsetIndexNode(bid);
        return new PSTNodeInputStream_class_1.PSTNodeInputStream(this, offsetItem);
    }
    /**
     * Read the size of the specified leaf.
     * @param {long} bid
     * @returns {number}
     * @memberof PSTFile
     */
    getLeafSize(bid) {
        const offsetItem = this.getOffsetIndexNode(bid);
        // Internal block?
        if ((offsetItem.indexIdentifier.toNumber() & 0x02) == 0) {
            // No, return the raw size
            return offsetItem.size;
        }
        // we only need the first 8 bytes
        const data = Buffer.alloc(8);
        this.seek(offsetItem.fileOffset);
        this.readCompletely(data);
        // we are an array, get the sum of the sizes...
        return PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(data, 4, 8).toNumber();
    }
    /**
     * Get file offset, which is sorted in 8 little endian bytes
     * @private
     * @param {long} startOffset
     * @returns {long}
     * @memberof PSTFile
     */
    extractLEFileOffset(startOffset) {
        let offset = long_1.default.ZERO;
        if (this._pstFileType == PSTFile.PST_TYPE_ANSI) {
            this.seek(startOffset);
            const buffer = Buffer.alloc(4);
            this.readCompletely(buffer);
            offset = offset.or(buffer[3] & 0xff);
            offset = offset.shiftLeft(8);
            offset = offset.or(buffer[2] & 0xff);
            offset = offset.shiftLeft(8);
            offset = offset.or(buffer[1] & 0xff);
            offset = offset.shiftLeft(8);
            offset = offset.or(buffer[0] & 0xff);
        }
        else {
            this.seek(startOffset);
            const buffer = Buffer.alloc(8);
            this.readCompletely(buffer);
            offset = offset.or(buffer[7] & 0xff);
            let tmpLongValue;
            for (let x = 6; x >= 0; x--) {
                offset = offset.shiftLeft(8);
                tmpLongValue = buffer[x] & 0xff;
                offset = offset.or(tmpLongValue);
            }
        }
        return offset;
    }
    /**
     * Navigate PST B-tree and find a specific item.
     * @private
     * @param {long} index
     * @param {boolean} descTree
     * @returns {Buffer}
     * @memberof PSTFile
     */
    findBtreeItem(index, descTree) {
        let btreeStartOffset;
        let fileTypeAdjustment;
        // first find the starting point for the offset index
        if (this._pstFileType === PSTFile.PST_TYPE_ANSI) {
            btreeStartOffset = this.extractLEFileOffset(long_1.default.fromValue(196));
            if (descTree) {
                btreeStartOffset = this.extractLEFileOffset(long_1.default.fromValue(188));
            }
        }
        else {
            btreeStartOffset = this.extractLEFileOffset(long_1.default.fromValue(240));
            if (descTree) {
                btreeStartOffset = this.extractLEFileOffset(long_1.default.fromValue(224));
            }
        }
        // okay, what we want to do is navigate the tree until you reach the bottom....
        // try and read the index b-tree
        let buffer = Buffer.alloc(2);
        if (this._pstFileType === PSTFile.PST_TYPE_ANSI) {
            fileTypeAdjustment = 500;
        }
        else if (this._pstFileType === PSTFile.PST_TYPE_2013_UNICODE) {
            fileTypeAdjustment = 0x1000 - 24;
        }
        else {
            fileTypeAdjustment = 496;
        }
        this.seek(btreeStartOffset.add(fileTypeAdjustment));
        this.readCompletely(buffer);
        const b2 = Buffer.alloc(2);
        b2[0] = 0xff80;
        b2[1] = 0xff81;
        // ensure apples to apples comparison
        while ((buffer[0] === b2[0] && buffer[1] === b2[0] && !descTree) ||
            (buffer[0] === b2[1] && buffer[1] === b2[1] && descTree)) {
            // get the rest of the data
            let len;
            if (this._pstFileType == PSTFile.PST_TYPE_ANSI) {
                len = 496;
            }
            else if (this._pstFileType == PSTFile.PST_TYPE_2013_UNICODE) {
                len = 4056;
            }
            else {
                len = 488;
            }
            const branchNodeItems = Buffer.alloc(len);
            this.seek(btreeStartOffset);
            this.readCompletely(branchNodeItems);
            // console.log('PSTFile::findBtreeItem btreeStartOffset = ' + btreeStartOffset);
            let numberOfItems = 0;
            if (this._pstFileType === PSTFile.PST_TYPE_2013_UNICODE) {
                const numberOfItemsBytes = Buffer.alloc(2);
                this.readCompletely(numberOfItemsBytes);
                numberOfItems = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(numberOfItemsBytes).toNumber();
                this.readCompletely(numberOfItemsBytes);
            }
            else {
                numberOfItems = this.read();
                this.read(); // maxNumberOfItems
            }
            const itemSize = this.read(); // itemSize
            const levelsToLeaf = this.read();
            if (levelsToLeaf > 0) {
                let found = false;
                for (let x = 0; x < numberOfItems; x++) {
                    if (this._pstFileType == PSTFile.PST_TYPE_ANSI) {
                        const indexIdOfFirstChildNode = this.extractLEFileOffset(btreeStartOffset.add(x * 12));
                        if (indexIdOfFirstChildNode > index) {
                            // get the address for the child first node in this group
                            btreeStartOffset = this.extractLEFileOffset(btreeStartOffset.add((x - 1) * 12 + 8));
                            this.seek(btreeStartOffset.add(500));
                            this.readCompletely(buffer);
                            found = true;
                            break;
                        }
                    }
                    else {
                        const indexIdOfFirstChildNode = this.extractLEFileOffset(btreeStartOffset.add(x * 24));
                        if (indexIdOfFirstChildNode.greaterThan(index)) {
                            // get the address for the child first node in this group
                            btreeStartOffset = this.extractLEFileOffset(btreeStartOffset.add((x - 1) * 24 + 16));
                            this.seek(btreeStartOffset.add(fileTypeAdjustment));
                            this.readCompletely(buffer);
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    // it must be in the very last branch...
                    if (this._pstFileType == PSTFile.PST_TYPE_ANSI) {
                        btreeStartOffset = this.extractLEFileOffset(btreeStartOffset.add((numberOfItems - 1) * 12 + 8));
                        this.seek(btreeStartOffset.add(500));
                        this.readCompletely(buffer);
                    }
                    else {
                        btreeStartOffset = this.extractLEFileOffset(btreeStartOffset.add((numberOfItems - 1) * 24 + 16));
                        this.seek(btreeStartOffset.add(fileTypeAdjustment));
                        this.readCompletely(buffer);
                    }
                }
            }
            else {
                // we are at the bottom of the tree...
                // we want to get our file offset!
                for (let x = 0; x < numberOfItems; x++) {
                    if (this._pstFileType == PSTFile.PST_TYPE_ANSI) {
                        if (descTree) {
                            // The 32-bit descriptor index b-tree leaf node item
                            buffer = Buffer.alloc(4);
                            this.seek(btreeStartOffset.add(x * 16));
                            this.readCompletely(buffer);
                            if (PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer).equals(index)) {
                                // give me the offset index please!
                                buffer = Buffer.alloc(16);
                                this.seek(btreeStartOffset.add(x * 16));
                                this.readCompletely(buffer);
                                return buffer;
                            }
                        }
                        else {
                            // The 32-bit (file) offset index item
                            const indexIdOfFirstChildNode = this.extractLEFileOffset(btreeStartOffset.add(x * 12));
                            if (indexIdOfFirstChildNode.equals(index)) {
                                // we found it!
                                buffer = Buffer.alloc(12);
                                this.seek(btreeStartOffset.add(x * 12));
                                this.readCompletely(buffer);
                                // console.log('PSTFile::findBtreeItem ' + index.toString() + ' found!');
                                return buffer;
                            }
                        }
                    }
                    else {
                        if (descTree) {
                            // The 64-bit descriptor index b-tree leaf node item
                            buffer = Buffer.alloc(4);
                            this.seek(btreeStartOffset.add(x * 32));
                            this.readCompletely(buffer);
                            if (PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(buffer).equals(index)) {
                                // give me the offset index please!
                                buffer = Buffer.alloc(32);
                                this.seek(btreeStartOffset.add(x * 32));
                                this.readCompletely(buffer);
                                // console.log('PSTFile::findBtreeItem ' + index.toString() + ' found!');
                                return buffer;
                            }
                        }
                        else {
                            // The 64-bit (file) offset index item
                            const indexIdOfFirstChildNode = this.extractLEFileOffset(btreeStartOffset.add(x * 24));
                            if (indexIdOfFirstChildNode.equals(index)) {
                                // we found it
                                buffer = Buffer.alloc(24);
                                this.seek(btreeStartOffset.add(x * 24));
                                this.readCompletely(buffer);
                                // console.log('PSTFile::findBtreeItem ' + index.toString() + ' found!');
                                return buffer;
                            }
                        }
                    }
                }
                throw new Error('PSTFile::findBtreeItem Unable to find ' +
                    index +
                    ' is desc: ' +
                    descTree);
            }
        }
        throw new Error('PSTFile::findBtreeItem Unable to find node: ' +
            index +
            ' is desc: ' +
            descTree);
    }
    /**
     * Get a descriptor index node in the b-tree
     * @param {long} id
     * @returns {DescriptorIndexNode}
     * @memberof PSTFile
     */
    getDescriptorIndexNode(id) {
        // console.log('PSTFile::getDescriptorIndexNode ' + id.toString())
        return new DescriptorIndexNode_class_1.DescriptorIndexNode(this.findBtreeItem(id, true), this._pstFileType);
    }
    /**
     * Get an offset index node in the b-tree
     * @param {long} id
     * @returns {OffsetIndexItem}
     * @memberof PSTFile
     */
    getOffsetIndexNode(id) {
        return new OffsetIndexItem_class_1.OffsetIndexItem(this.findBtreeItem(id, false), this._pstFileType);
    }
    getPSTDescriptorItems(arg) {
        let inputStream = arg;
        if (typeof arg === 'object' && arg.hasOwnProperty('low')) {
            inputStream = this.readLeaf(arg);
        }
        // make sure the signature is correct
        inputStream.seek(long_1.default.ZERO);
        const sig = inputStream.read();
        if (sig != 0x2) {
            throw new Error('PSTFile::getPSTDescriptorItems Unable to process descriptor node, bad signature: ' +
                sig);
        }
        const output = new Map();
        const numberOfItems = inputStream.seekAndReadLong(long_1.default.fromValue(2), 2);
        let offset;
        if (this._pstFileType === PSTFile.PST_TYPE_ANSI) {
            offset = 4;
        }
        else {
            offset = 8;
        }
        const data = Buffer.alloc(inputStream.length.toNumber());
        inputStream.seek(long_1.default.ZERO);
        inputStream.readCompletely(data);
        for (let x = 0; x < numberOfItems.toNumber(); x++) {
            const item = new PSTDescriptorItem_class_1.PSTDescriptorItem(data, offset, this);
            output.set(item.descriptorIdentifier, item);
            if (this._pstFileType === PSTFile.PST_TYPE_ANSI) {
                offset += 12;
            }
            else {
                offset += 24;
            }
        }
        return output;
    }
    /**
     * Build the children descriptor tree, used as a fallback when the nodes
     * that list file contents are broken.
     * @returns
     * @memberof PSTFile
     */
    getChildDescriptorTree() {
        if (!this.childrenDescriptorTree) {
            let btreeStartOffset = long_1.default.ZERO;
            if (this._pstFileType === PSTFile.PST_TYPE_ANSI) {
                btreeStartOffset = this.extractLEFileOffset(long_1.default.fromValue(188));
            }
            else {
                btreeStartOffset = this.extractLEFileOffset(long_1.default.fromValue(224));
            }
            this.childrenDescriptorTree = new Map();
            this.processDescriptorBTree(btreeStartOffset);
        }
        return this.childrenDescriptorTree;
    }
    /**
     * Recursively walk PST descriptor tree and create internal version.
     * @private
     * @param {long} btreeStartOffset
     * @memberof PSTFile
     */
    processDescriptorBTree(btreeStartOffset) {
        let fileTypeAdjustment;
        let temp = Buffer.alloc(2);
        if (this._pstFileType === PSTFile.PST_TYPE_ANSI) {
            fileTypeAdjustment = 500;
        }
        else if (this._pstFileType === PSTFile.PST_TYPE_2013_UNICODE) {
            fileTypeAdjustment = 0x1000 - 24;
        }
        else {
            fileTypeAdjustment = 496;
        }
        this.seek(btreeStartOffset.add(fileTypeAdjustment));
        this.readCompletely(temp);
        if (temp[0] == 129 && temp[1] == 129) {
            if (this._pstFileType === PSTFile.PST_TYPE_ANSI) {
                this.seek(btreeStartOffset.add(496));
            }
            else if (this._pstFileType === PSTFile.PST_TYPE_2013_UNICODE) {
                this.seek(btreeStartOffset.add(4056));
            }
            else {
                this.seek(btreeStartOffset.add(488));
            }
            let numberOfItems = 0;
            if (this._pstFileType === PSTFile.PST_TYPE_2013_UNICODE) {
                const numberOfItemsBytes = Buffer.alloc(2);
                this.readCompletely(numberOfItemsBytes);
                numberOfItems = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(numberOfItemsBytes).toNumber();
                this.readCompletely(numberOfItemsBytes);
                const maxNumberOfItems = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(numberOfItemsBytes).toNumber();
            }
            else {
                numberOfItems = this.read();
                this.read(); // maxNumberOfItems
            }
            this.read(); // itemSize
            const levelsToLeaf = this.read();
            if (levelsToLeaf > 0) {
                for (let x = 0; x < numberOfItems; x++) {
                    if (this._pstFileType === PSTFile.PST_TYPE_ANSI) {
                        const branchNodeItemStartIndex = btreeStartOffset.add(12 * x);
                        const nextLevelStartsAt = this.extractLEFileOffset(branchNodeItemStartIndex.add(8));
                        this.processDescriptorBTree(nextLevelStartsAt);
                    }
                    else {
                        const branchNodeItemStartIndex = btreeStartOffset.add(24 * x);
                        const nextLevelStartsAt = this.extractLEFileOffset(branchNodeItemStartIndex.add(16));
                        this.processDescriptorBTree(nextLevelStartsAt);
                    }
                }
            }
            else {
                for (let x = 0; x < numberOfItems; x++) {
                    if (this._pstFileType === PSTFile.PST_TYPE_ANSI) {
                        this.seek(btreeStartOffset.add(x * 16));
                        temp = Buffer.alloc(16);
                        this.readCompletely(temp);
                    }
                    else {
                        this.seek(btreeStartOffset.add(x * 32));
                        temp = Buffer.alloc(32);
                        this.readCompletely(temp);
                    }
                    const tempNode = new DescriptorIndexNode_class_1.DescriptorIndexNode(temp, this._pstFileType);
                    // we don't want to be children of ourselves...
                    if (tempNode.parentDescriptorIndexIdentifier ==
                        tempNode.descriptorIdentifier) {
                        // skip!
                    }
                    else if (this.childrenDescriptorTree.has(tempNode.parentDescriptorIndexIdentifier)) {
                        // add this entry to the existing list of children
                        const children = this.childrenDescriptorTree.get(tempNode.parentDescriptorIndexIdentifier);
                        if (!children) {
                            throw new Error('PSTFile::processDescriptorBTree children is null');
                        }
                        children.push(tempNode);
                    }
                    else {
                        // create a new entry and add this one to that
                        const children = [];
                        children.push(tempNode);
                        this.childrenDescriptorTree.set(tempNode.parentDescriptorIndexIdentifier, children);
                    }
                }
            }
        }
        else {
            throw new Error('PSTFile::processDescriptorBTree Unable to read descriptor node, is not a descriptor');
        }
    }
    /*
          Basic file functions.
      */
    /**
     * Read a single byte from the PST file.
     * @param {number} [position]
     * @returns {number}
     * @memberof PSTFile
     */
    read(position) {
        const pos = position ? position : this.position;
        const buffer = Buffer.alloc(1);
        const bytesRead = this.readSync(buffer, buffer.length, pos);
        this.position = position ? position + bytesRead : this.position + bytesRead;
        return buffer[0];
    }
    /**
     * Read a complete section from the file, storing in the supplied buffer.
     * @param {Buffer} buffer
     * @param {number} [position]
     * @returns
     * @memberof PSTFile
     */
    readCompletely(buffer, position) {
        const pos = position ? position : this.position;
        const bytesRead = this.readSync(buffer, buffer.length, pos);
        this.position = position ? position + bytesRead : this.position + bytesRead;
    }
    /**
     * Read from either file system, or in memory buffer.
     * @param {Buffer} buffer
     * @param {number} length
     * @param {number} position
     * @returns {number} of bytes read
     * @memberof PSTFile
     */
    readSync(buffer, length, position) {
        if (this.pstFD > 0) {
            // read from file system
            return fs.readSync(this.pstFD, buffer, 0, length, position);
        }
        else {
            // copy from in-memory buffer
            this.pstBuffer.copy(buffer, 0, position, position + length);
            return length;
        }
    }
    /**
     * Seek to a specific position in PST file.
     * @param {long} index
     * @memberof PSTFile
     */
    seek(index) {
        this.position = index.toNumber();
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTFile
     */
    toJSON() {
        return this;
    }
}
exports.PSTFile = PSTFile;
PSTFile.ENCRYPTION_TYPE_NONE = 0;
PSTFile.ENCRYPTION_TYPE_COMPRESSIBLE = 1;
PSTFile.MESSAGE_STORE_DESCRIPTOR_IDENTIFIER = 33;
PSTFile.ROOT_FOLDER_DESCRIPTOR_IDENTIFIER = 290;
PSTFile.PST_TYPE_ANSI = 14;
PSTFile.PST_TYPE_ANSI_2 = 15;
PSTFile.PST_TYPE_UNICODE = 23;
PSTFile.PST_TYPE_2013_UNICODE = 36;
PSTFile.PS_PUBLIC_STRINGS = 0;
PSTFile.PS_INTERNET_HEADERS = 3;
PSTFile.PSETID_Messaging = 7;
PSTFile.PSETID_Note = 8;
PSTFile.PSETID_PostRss = 9;
PSTFile.PSETID_Task = 10;
PSTFile.PSETID_UnifiedMessaging = 11;
PSTFile.PS_MAPI = 12;
PSTFile.PSETID_AirSync = 13;
PSTFile.PSETID_Sharing = 14;
// node tree maps
PSTFile.nodeMap = new NodeMap_class_1.NodeMap();
