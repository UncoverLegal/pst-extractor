/// <reference types="node" />
import Long from 'long';
export declare class PSTTableItem {
    static VALUE_TYPE_PT_UNICODE: number;
    static VALUE_TYPE_PT_STRING8: number;
    static VALUE_TYPE_PT_BIN: number;
    private _itemIndex;
    set itemIndex(val: number);
    get itemIndex(): number;
    private _entryType;
    set entryType(val: Long);
    get entryType(): Long;
    private _isExternalValueReference;
    set isExternalValueReference(val: boolean);
    get isExternalValueReference(): boolean;
    private _entryValueReference;
    set entryValueReference(val: number);
    get entryValueReference(): number;
    private _entryValueType;
    set entryValueType(val: number);
    get entryValueType(): number;
    private _data;
    set data(val: Buffer);
    get data(): Buffer;
    /**
     * Creates an instance of PSTTableItem.
     * @memberof PSTTableItem
     */
    /**
     * Get long value from table item.
     * @returns
     * @memberof PSTTableItem
     */
    getLongValue(): Long | -1;
    /**
     * Get string value of data.
     * @param {number} [stringType]
     * @returns {string}
     * @memberof PSTTableItem
     */
    getStringValue(stringType?: number): string;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTTableItem
     */
    toJSON(): any;
}
