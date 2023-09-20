/// <reference types="node" />
import Long from 'long';
import { DescriptorIndexNode } from './DescriptorIndexNode.class';
import { PSTDescriptorItem } from './PSTDescriptorItem.class';
import { PSTFile } from './PSTFile.class';
import { PSTTableBC } from './PSTTableBC.class';
import { PSTTableItem } from './PSTTableItem.class';
export declare abstract class PSTObject {
    protected pstFile: PSTFile;
    protected descriptorIndexNode: DescriptorIndexNode | null;
    protected localDescriptorItems: Map<number, PSTDescriptorItem> | null;
    private pstTableBC;
    protected pstTableItems: Map<number, PSTTableItem> | null;
    /**
     * Creates an instance of PSTObject, the root class of most PST Items.
     * @memberof PSTObject
     */
    constructor(pstFile: PSTFile, descriptorIndexNode?: DescriptorIndexNode, pstTableItems?: Map<number, PSTTableItem>);
    /**
     * Load a descriptor from the PST.
     * @protected
     * @param {PSTFile} pstFile
     * @param {DescriptorIndexNode} descriptorIndexNode
     * @memberof PSTObject
     */
    private loadDescriptor;
    /**
     * Get table items.
     * @protected
     * @param {PSTFile} theFile
     * @param {DescriptorIndexNode} folderIndexNode
     * @param {PSTTableBC} pstTableBC
     * @param {Map<number, PSTDescriptorItem>} localDescriptorItems
     * @memberof PSTObject
     */
    protected prePopulate(folderIndexNode: DescriptorIndexNode | null, pstTableBC: PSTTableBC, localDescriptorItems?: Map<number, PSTDescriptorItem>): void;
    /**
     * Get the descriptor identifier for this item which can be used for loading objects
     * through detectAndLoadPSTObject(PSTFile theFile, long descriptorIndex)
     * @readonly
     * @type {long}
     * @memberof PSTObject
     */
    get descriptorNodeId(): Long;
    /**
     * Get the node type for the descriptor id.
     * @param {number} [descriptorIdentifier]
     * @returns {number}
     * @memberof PSTObject
     */
    getNodeType(descriptorIdentifier?: number): number;
    /**
     * Get a number.
     * @protected
     * @param {number} identifier
     * @param {number} [defaultValue]
     * @returns {number}
     * @memberof PSTObject
     */
    protected getIntItem(identifier: number, defaultValue?: number): number;
    /**
     * Get a boolean.
     * @protected
     * @param {number} identifier
     * @param {boolean} [defaultValue]
     * @returns {boolean}
     * @memberof PSTObject
     */
    protected getBooleanItem(identifier: number, defaultValue?: boolean): boolean;
    /**
     * Get a double.
     * @protected
     * @param {number} identifier
     * @param {number} [defaultValue]
     * @returns {number}
     * @memberof PSTObject
     */
    protected getDoubleItem(identifier: number, defaultValue?: number): number;
    /**
     * Get a long.
     * @protected
     * @param {number} identifier
     * @param {long} [defaultValue]
     * @returns {long}
     * @memberof PSTObject
     */
    protected getLongItem(identifier: number, defaultValue?: Long): Long;
    /**
     * Get a string.
     * @protected
     * @param {number} identifier
     * @param {number} [stringType]
     * @param {string} [codepage]
     * @returns {string}
     * @memberof PSTObject
     */
    protected getStringItem(identifier: number, stringType?: number, codepage?: string): string;
    /**
     * Get a codepage.
     * @readonly
     * @type {string}
     * @memberof PSTObject
     */
    get stringCodepage(): string | undefined;
    /**
     * Get a date.
     * @param {number} identifier
     * @returns {Date}
     * @memberof PSTObject
     */
    getDateItem(identifier: number): Date | null;
    /**
     * Get a blob.
     * @protected
     * @param {number} identifier
     * @returns {Buffer}
     * @memberof PSTObject
     */
    protected getBinaryItem(identifier: number): Buffer | null;
    /**
     * Get the display name of this object.
     * https://msdn.microsoft.com/en-us/library/office/cc842383.aspx
     * @readonly
     * @type {string}
     * @memberof PSTObject
     */
    get displayName(): string;
    /**
     * JSON the object.
     * @returns {string}
     * @memberof PSTObject
     */
    toJSON(): any;
}
