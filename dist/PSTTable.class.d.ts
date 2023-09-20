import Long from 'long';
import { NodeInfo } from './NodeInfo.class';
import { PSTNodeInputStream } from './PSTNodeInputStream.class';
import { PSTDescriptorItem } from './PSTDescriptorItem.class';
export declare abstract class PSTTable {
    protected tableType: string;
    protected tableTypeByte: number;
    protected hidUserRoot: number;
    protected arrayBlocks: Long[];
    protected sizeOfItemKey: number;
    protected sizeOfItemValue: number;
    protected hidRoot: number;
    protected numberOfKeys: number;
    protected numberOfIndexLevels: number;
    private pstNodeInputStream;
    private subNodeDescriptorItems;
    /**
     * Creates an instance of PSTTable.  The PST Table is the workhorse of the whole system.
     * It allows for an item to be read and broken down into the individual properties that it consists of.
     * For most PST Objects, it appears that only 7C and BC table types are used.
     * @param {PSTNodeInputStream} pstNodeInputStream
     * @param {Map<number, PSTDescriptorItem>} subNodeDescriptorItems
     * @memberof PSTTable
     */
    constructor(pstNodeInputStream: PSTNodeInputStream, subNodeDescriptorItems?: Map<number, PSTDescriptorItem>);
    /**
     * Release data.
     * @protected
     * @memberof PSTTable
     */
    protected releaseRawData(): void;
    /**
     * Number of items in table.
     * @readonly
     * @type {number}
     * @memberof PSTTable
     */
    get rowCount(): number;
    /**
     * Get information for the node in the b-tree.
     * @param {number} hnid
     * @returns {NodeInfo}
     * @memberof PSTTable
     */
    getNodeInfo(hnid: number): NodeInfo | null;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTTable
     */
    toJSON(): any;
}
