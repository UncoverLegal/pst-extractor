import Long from 'long';
/**
 * Stores node names (both alpha and numeric) in node maps for quick lookup.
 * @export
 * @class NodeMap
 */
export declare class NodeMap {
    private nameToId;
    private idToNumericName;
    private idToStringName;
    /**
     * Set a node into the map.
     * @param {*} key
     * @param {number} propId
     * @param {number} [idx]
     * @memberof NodeMap
     */
    setId(key: any, propId: number, idx?: number): void;
    /**
     * Get a node from the map.
     * @param {*} key
     * @param {number} [idx]
     * @returns {number}
     * @memberof NodeMap
     */
    getId(key: any, idx?: number): number;
    /**
     * Get a node from the map.
     * @param {number} propId
     * @returns {long}
     * @memberof NodeMap
     */
    getNumericName(propId: number): Long | undefined;
    private transformKey;
}
