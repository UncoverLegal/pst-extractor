/// <reference types="node" />
import Long from 'long';
import { DescriptorIndexNode } from './DescriptorIndexNode.class';
import { OffsetIndexItem } from './OffsetIndexItem.class';
import { PSTDescriptorItem } from './PSTDescriptorItem.class';
import { PSTFolder } from './PSTFolder.class';
import { PSTMessageStore } from './PSTMessageStore.class';
import { PSTNodeInputStream } from './PSTNodeInputStream.class';
export declare class PSTFile {
    static ENCRYPTION_TYPE_NONE: number;
    static ENCRYPTION_TYPE_COMPRESSIBLE: number;
    static MESSAGE_STORE_DESCRIPTOR_IDENTIFIER: number;
    static ROOT_FOLDER_DESCRIPTOR_IDENTIFIER: number;
    static PST_TYPE_ANSI: number;
    static PST_TYPE_ANSI_2: number;
    static PST_TYPE_UNICODE: number;
    static PST_TYPE_2013_UNICODE: number;
    static PS_PUBLIC_STRINGS: number;
    static PS_INTERNET_HEADERS: number;
    static PSETID_Messaging: number;
    static PSETID_Note: number;
    static PSETID_PostRss: number;
    static PSETID_Task: number;
    static PSETID_UnifiedMessaging: number;
    static PS_MAPI: number;
    static PSETID_AirSync: number;
    static PSETID_Sharing: number;
    private guidMap;
    private _encryptionType;
    get encryptionType(): number;
    private _pstFileType;
    get pstFileType(): number;
    private _pstFilename;
    get pstFilename(): string;
    private childrenDescriptorTree;
    private static nodeMap;
    private pstFD;
    private pstBuffer;
    private position;
    /**
     * Creates an instance of PSTFile.  File is opened in constructor.
     * @param {string} fileName
     * @memberof PSTFile
     */
    constructor(pstBuffer: Buffer);
    constructor(fileName: string);
    /**
     * Close the file.
     * @memberof PSTFile
     */
    close(): void;
    /**
     * Process name to ID map.
     * @private
     * @memberof PSTFile
     */
    private processNameToIDMap;
    /**
     * Get data from a descriptor and store in buffer.
     * @private
     * @param {PSTTableItem} item
     * @param {Map<number, PSTDescriptorItem>} localDescriptorItems
     * @returns {Buffer}
     * @memberof PSTFile
     */
    private getData;
    /**
     * Get name to ID map item.
     * @param {number} key
     * @param {number} idx
     * @returns {number}
     * @memberof PSTFile
     */
    getNameToIdMapItem(key: number, idx: number): number;
    /**
     * Get public string to id map item.
     * @static
     * @param {string} key
     * @returns {number}
     * @memberof PSTFile
     */
    static getPublicStringToIdMapItem(key: string): number;
    /**
     * Get property name from id.
     * @static
     * @param {number} propertyId
     * @param {boolean} bNamed
     * @returns {string}
     * @memberof PSTFile
     */
    static getPropertyName(propertyId: number, bNamed: boolean): string | undefined;
    /**
     * Get name to id map key.
     * @static
     * @param {number} propId
     * @returns {long}
     * @memberof PSTFile
     */
    static getNameToIdMapKey(propId: number): Long | undefined;
    /**
     * Get the message store of the PST file.  Note that this doesn't really
     * have much information, better to look under the root folder.
     * @returns {PSTMessageStore}
     * @memberof PSTFile
     */
    getMessageStore(): PSTMessageStore;
    /**
     * Get the root folder for the PST file
     * @returns {PSTFolder}
     * @memberof PSTFile
     */
    getRootFolder(): PSTFolder;
    /**
     * Read a leaf in the b-tree.
     * @param {long} bid
     * @returns {PSTNodeInputStream}
     * @memberof PSTFile
     */
    readLeaf(bid: Long): PSTNodeInputStream;
    /**
     * Read the size of the specified leaf.
     * @param {long} bid
     * @returns {number}
     * @memberof PSTFile
     */
    getLeafSize(bid: Long): number;
    /**
     * Get file offset, which is sorted in 8 little endian bytes
     * @private
     * @param {long} startOffset
     * @returns {long}
     * @memberof PSTFile
     */
    private extractLEFileOffset;
    /**
     * Navigate PST B-tree and find a specific item.
     * @private
     * @param {long} index
     * @param {boolean} descTree
     * @returns {Buffer}
     * @memberof PSTFile
     */
    private findBtreeItem;
    /**
     * Get a descriptor index node in the b-tree
     * @param {long} id
     * @returns {DescriptorIndexNode}
     * @memberof PSTFile
     */
    getDescriptorIndexNode(id: Long): DescriptorIndexNode;
    /**
     * Get an offset index node in the b-tree
     * @param {long} id
     * @returns {OffsetIndexItem}
     * @memberof PSTFile
     */
    getOffsetIndexNode(id: Long): OffsetIndexItem;
    /**
     * Parse a PSTDescriptor and get all of its items
     * @param {long} localDescriptorsOffsetIndexIdentifier
     * @returns {Map<number, PSTDescriptorItem>}
     * @memberof PSTFile
     */
    getPSTDescriptorItems(localDescriptorsOffsetIndexIdentifier: Long): Map<number, PSTDescriptorItem>;
    getPSTDescriptorItems(inputStream: PSTNodeInputStream): Map<number, PSTDescriptorItem>;
    /**
     * Build the children descriptor tree, used as a fallback when the nodes
     * that list file contents are broken.
     * @returns
     * @memberof PSTFile
     */
    getChildDescriptorTree(): Map<number, DescriptorIndexNode[]>;
    /**
     * Recursively walk PST descriptor tree and create internal version.
     * @private
     * @param {long} btreeStartOffset
     * @memberof PSTFile
     */
    private processDescriptorBTree;
    /**
     * Read a single byte from the PST file.
     * @param {number} [position]
     * @returns {number}
     * @memberof PSTFile
     */
    read(position?: number): number;
    /**
     * Read a complete section from the file, storing in the supplied buffer.
     * @param {Buffer} buffer
     * @param {number} [position]
     * @returns
     * @memberof PSTFile
     */
    readCompletely(buffer: Buffer, position?: number): void;
    /**
     * Read from either file system, or in memory buffer.
     * @param {Buffer} buffer
     * @param {number} length
     * @param {number} position
     * @returns {number} of bytes read
     * @memberof PSTFile
     */
    private readSync;
    /**
     * Seek to a specific position in PST file.
     * @param {long} index
     * @memberof PSTFile
     */
    seek(index: Long): void;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTFile
     */
    toJSON(): any;
}
