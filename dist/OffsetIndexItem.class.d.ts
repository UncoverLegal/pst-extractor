/// <reference types="node" />
import Long from 'long';
export declare class OffsetIndexItem {
    private _indexIdentifier;
    get indexIdentifier(): Long;
    private _fileOffset;
    get fileOffset(): Long;
    private _size;
    get size(): number;
    private cRef;
    /**
     * Creates an instance of OffsetIndexItem, part of the node table.
     * @param {Buffer} data
     * @param {number} pstFileType
     * @memberof OffsetIndexItem
     */
    constructor(data: Buffer, pstFileType: number);
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof OffsetIndexItem
     */
    toJSON(): any;
}
