import Long from 'long';
import { PSTNodeInputStream } from './PSTNodeInputStream.class';
export declare class NodeInfo {
    private _startOffset;
    get startOffset(): number;
    private _endOffset;
    get endOffset(): number;
    length(): number;
    private _pstNodeInputStream;
    get pstNodeInputStream(): PSTNodeInputStream;
    /**
     * Creates an instance of NodeInfo, part of the node table.
     * @param {number} start
     * @param {number} end
     * @param {PSTNodeInputStream} pstNodeInputStream
     * @memberof NodeInfo
     */
    constructor(start: number, end: number, pstNodeInputStream: PSTNodeInputStream);
    /**
     * Seek to position in node input stream and read a long
     * @param {long} offset
     * @param {number} length
     * @returns {long}
     * @memberof NodeInfo
     */
    seekAndReadLong(offset: Long, length: number): Long;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof NodeInfo
     */
    toJSON(): any;
}
