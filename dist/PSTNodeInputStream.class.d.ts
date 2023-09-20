/// <reference types="node" />
import Long from 'long';
import { PSTDescriptorItem } from './PSTDescriptorItem.class';
import { OffsetIndexItem } from './OffsetIndexItem.class';
import { PSTFile } from './PSTFile.class';
export declare class PSTNodeInputStream {
    private skipPoints;
    private indexItems;
    private currentBlock;
    private allData;
    private isZlib;
    private _currentLocation;
    private get currentLocation();
    private set currentLocation(value);
    private _pstFile;
    get pstFile(): PSTFile;
    private _length;
    get length(): Long;
    private _encrypted;
    get encrypted(): boolean;
    /**
     * Creates an instance of PSTNodeInputStream.
     * @param {PSTFile} pstFile
     * @param {Buffer} attachmentData
     * @param {boolean} [encrypted]
     * @memberof PSTNodeInputStream
     */
    constructor(pstFile: PSTFile, attachmentData: Buffer, encrypted?: boolean);
    constructor(pstFile: PSTFile, descriptorItem: PSTDescriptorItem | undefined, encrypted?: boolean);
    constructor(pstFile: PSTFile, offsetItem: OffsetIndexItem, encrypted?: boolean);
    /**
     * Checks if the node is ZL compressed and unzips if so.
     * @private
     * @returns
     * @memberof PSTNodeInputStream
     */
    private detectZlib;
    /**
     * Load data from offset in file.
     * @private
     * @param {OffsetIndexItem} offsetItem
     * @returns
     * @memberof PSTNodeInputStream
     */
    private loadFromOffsetItem;
    /**
     * Get block skip points in file.
     * @private
     * @param {Buffer} data
     * @memberof PSTNodeInputStream
     */
    private getBlockSkipPoints;
    /**
     * Read from the stream.
     * @param {Buffer} [output]
     * @returns
     * @memberof PSTNodeInputStream
     */
    read(output?: Buffer): number;
    /**
     * Read a single byte from the input stream.
     * @returns {number}
     * @memberof PSTNodeInputStream
     */
    readSingleByte(): number;
    private totalLoopCount;
    /**
     * Read a block from the input stream, ensuring buffer is completely filled.
     * Recommended block size = 8176 (size used internally by PSTs)
     * @param {Buffer} target
     * @memberof PSTNodeInputStream
     */
    readCompletely(target: Buffer): void;
    /**
     * Read a block from the input stream.
     * Recommended block size = 8176 (size used internally by PSTs)
     * @param {Buffer} output
     * @returns {number}
     * @memberof PSTNodeInputStream
     */
    readBlock(output: Buffer): number;
    /**
     * Read from the offset.
     * @param {Buffer} output
     * @param {number} offset
     * @param {number} length
     * @returns {number}
     * @memberof PSTNodeInputStream
     */
    readFromOffset(output: Buffer, offset: number, length: number): number;
    /**
     * Reset the file pointer (internally).
     * @memberof PSTNodeInputStream
     */
    reset(): void;
    /**
     * Get the offsets (block positions) used in the array
     * @returns {long[]}
     * @memberof PSTNodeInputStream
     */
    getBlockOffsets(): Long[];
    /**
     * Seek within item.
     * @param {long} location
     * @returns
     * @memberof PSTNodeInputStream
     */
    seek(location: Long): void;
    /**
     * Seek within stream and read a long.
     * @param {long} location
     * @param {number} bytes
     * @returns {long}
     * @memberof PSTNodeInputStream
     */
    seekAndReadLong(location: Long, bytes: number): Long;
    /**
     * JSON the object, large buffers excluded.
     * @returns {*}
     * @memberof PSTNodeInputStream
     */
    toJSON(): any;
}
