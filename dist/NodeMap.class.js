"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMap = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const long_1 = __importDefault(require("long"));
/**
 * Stores node names (both alpha and numeric) in node maps for quick lookup.
 * @export
 * @class NodeMap
 */
class NodeMap {
    constructor() {
        this.nameToId = new Map();
        this.idToNumericName = new Map();
        this.idToStringName = new Map();
    }
    /**
     * Set a node into the map.
     * @param {*} key
     * @param {number} propId
     * @param {number} [idx]
     * @memberof NodeMap
     */
    setId(key, propId, idx) {
        if (typeof key === 'number' && idx !== undefined) {
            const lkey = this.transformKey(key, idx);
            this.nameToId.set(lkey.toString(), propId);
            this.idToNumericName.set(propId, lkey);
            // console.log('NodeMap::setId: propId = ' + propId + ', lkey = ' + lkey.toString());
        }
        else if (typeof key === 'string') {
            this.nameToId.set(key, propId);
            this.idToStringName.set(propId, key);
            // console.log('NodeMap::setId: propId = ' + propId + ', key = ' + key);
        }
        else {
            throw new Error('NodeMap::setId bad param type ' + typeof key);
        }
    }
    /**
     * Get a node from the map.
     * @param {*} key
     * @param {number} [idx]
     * @returns {number}
     * @memberof NodeMap
     */
    getId(key, idx) {
        let id = undefined;
        if (typeof key === 'number' && idx) {
            id = this.nameToId.get(this.transformKey(key, idx).toString());
        }
        else if (typeof key === 'string') {
            id = this.nameToId.get(key);
        }
        else {
            throw new Error('NodeMap::getId bad param type ' + typeof key);
        }
        if (!id) {
            return -1;
        }
        return id;
    }
    /**
     * Get a node from the map.
     * @param {number} propId
     * @returns {long}
     * @memberof NodeMap
     */
    getNumericName(propId) {
        const lkey = this.idToNumericName.get(propId);
        if (!lkey) {
            // console.log("NodeMap::getNumericName Name to Id mapping not found, propId = " + propId);
        }
        return lkey;
    }
    transformKey(key, idx) {
        let lidx = long_1.default.fromNumber(idx);
        lidx = lidx.shiftLeft(32);
        lidx = lidx.or(key);
        return lidx;
    }
}
exports.NodeMap = NodeMap;
