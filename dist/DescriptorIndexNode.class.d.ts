/// <reference types="node" />
import Long from 'long';
export declare class DescriptorIndexNode {
    private _descriptorIdentifier;
    itemType: number;
    get descriptorIdentifier(): number;
    private _parentDescriptorIndexIdentifier;
    get parentDescriptorIndexIdentifier(): number;
    private _localDescriptorsOffsetIndexIdentifier;
    get localDescriptorsOffsetIndexIdentifier(): Long;
    private _dataOffsetIndexIdentifier;
    get dataOffsetIndexIdentifier(): Long;
    /**
     * Creates an instance of DescriptorIndexNode, a component of the internal descriptor b-tree.
     * @param {Buffer} buffer
     * @param {number} pstFileType
     * @memberof DescriptorIndexNode
     */
    constructor(buffer: Buffer, pstFileType: number);
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof DescriptorIndexNode
     */
    toJSON(): any;
}
