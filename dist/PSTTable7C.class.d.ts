import { PSTDescriptorItem } from './PSTDescriptorItem.class';
import { PSTNodeInputStream } from './PSTNodeInputStream.class';
import { PSTTable } from './PSTTable.class';
import { PSTTableItem } from './PSTTableItem.class';
export declare class PSTTable7C extends PSTTable {
    private items;
    private numberOfDataSets;
    private BLOCK_SIZE;
    private numColumns;
    private TCI_bm;
    private TCI_1b;
    private columnDescriptors;
    private overrideCol;
    private rowNodeInfo;
    private keyMap;
    /**
     * Creates an instance of PSTTable7C ("Table Context").
     * @param {PSTNodeInputStream} pstNodeInputStream
     * @param {Map<number, PSTDescriptorItem>} subNodeDescriptorItems
     * @param {number} [entityToExtract]
     * @memberof PSTTable7C
     */
    constructor(pstNodeInputStream: PSTNodeInputStream, subNodeDescriptorItems?: Map<number, PSTDescriptorItem>, entityToExtract?: number);
    /**
     * Get items from the table.
     * @param {number} [startAtRecord]
     * @param {number} [numberOfRecordsToReturn]
     * @returns {Map<number, PSTTableItem>[]}
     * @memberof PSTTable7C
     */
    getItems(startAtRecord?: number, numberOfRecordsToReturn?: number): Map<number, PSTTableItem>[];
    /**
     * Get the number of rows.
     * @readonly
     * @type {number}
     * @memberof PSTTable7C
     */
    get rowCount(): number;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTTable7C
     */
    toJSON(): any;
}
