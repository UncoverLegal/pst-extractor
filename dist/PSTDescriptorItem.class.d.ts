/// <reference types="node" />
import { PSTFile } from './PSTFile.class';
export declare class PSTDescriptorItem {
    private dataBlockData;
    private dataBlockOffsets;
    private _pstFile;
    private _subNodeOffsetIndexIdentifier;
    get subNodeOffsetIndexIdentifier(): number;
    private _descriptorIdentifier;
    get descriptorIdentifier(): number;
    private _offsetIndexIdentifier;
    get offsetIndexIdentifier(): number;
    /**
     * Creates an instance of PSTDescriptorItem.
     * @param {Buffer} data
     * @param {number} offset
     * @param {PSTFile} pstFile
     * @memberof PSTDescriptorItem
     */
    constructor(data: Buffer, offset: number, pstFile: PSTFile);
    /**
     * Get a node input stream from the offset index and read into a buffer.
     * @returns {Buffer}
     * @memberof PSTDescriptorItem
     */
    getData(): Buffer;
    /**
     * Get block offsets within current file.
     * @returns {number[]}
     * @memberof PSTDescriptorItem
     */
    getBlockOffsets(): number[];
    /**
     * Get the size of this this leaf of the b-tree.
     * @readonly
     * @type {number}
     * @memberof PSTDescriptorItem
     */
    get dataSize(): number;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTDescriptorItem
     */
    toJSON(): any;
}
