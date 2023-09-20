import { NodeInfo } from './NodeInfo.class';
export declare class ColumnDescriptor {
    private _ibData;
    get ibData(): number;
    private _cbData;
    get cbData(): number;
    private _type;
    get type(): number;
    private _iBit;
    get iBit(): number;
    private _id;
    get id(): number;
    /**
     * Creates an instance of ColumnDescriptor.
     * @param {NodeInfo} nodeInfo
     * @param {number} offset
     * @memberof ColumnDescriptor
     */
    constructor(nodeInfo: NodeInfo, offset: number);
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof ColumnDescriptor
     */
    toJSON(): any;
}
