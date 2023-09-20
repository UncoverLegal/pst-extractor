import { PSTNodeInputStream } from './PSTNodeInputStream.class';
import { PSTTable } from './PSTTable.class';
import { PSTTableItem } from './PSTTableItem.class';
export declare class PSTTableBC extends PSTTable {
    private items;
    private isDescNotYetInitiated;
    /**
     * Creates an instance of PSTTableBC ("Property Context").
     * @param {PSTNodeInputStream} pstNodeInputStream
     * @memberof PSTTableBC
     */
    constructor(pstNodeInputStream: PSTNodeInputStream);
    /**
     * Get the items parsed out of this table.
     * @returns {Map<number, PSTTableItem>}
     * @memberof PSTTableBC
     */
    getItems(): Map<number, PSTTableItem>;
    /**
     * JSON stringify the items list.
     * @returns {string}
     * @memberof PSTTable7C
     */
    itemsJSON(): string;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTTable7C
     */
    toJSON(): any;
}
