"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnDescriptor = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const long_1 = __importDefault(require("long"));
class ColumnDescriptor {
    get ibData() {
        return this._ibData;
    }
    get cbData() {
        return this._cbData;
    }
    get type() {
        return this._type;
    }
    get iBit() {
        return this._iBit;
    }
    get id() {
        return this._id;
    }
    /**
     * Creates an instance of ColumnDescriptor.
     * @param {NodeInfo} nodeInfo
     * @param {number} offset
     * @memberof ColumnDescriptor
     */
    constructor(nodeInfo, offset) {
        this._type = nodeInfo.seekAndReadLong(long_1.default.fromValue(offset), 2).toNumber(); // & 0xFFFF;
        this._id = nodeInfo
            .seekAndReadLong(long_1.default.fromValue(offset + 2), 2)
            .toNumber(); // & 0xFFFF;
        this._ibData = nodeInfo
            .seekAndReadLong(long_1.default.fromValue(offset + 4), 2)
            .toNumber(); // & 0xFFFF;
        this._cbData = nodeInfo.pstNodeInputStream.read(); // & 0xFFFF;
        this._iBit = nodeInfo.pstNodeInputStream.read(); // & 0xFFFF;
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof ColumnDescriptor
     */
    toJSON() {
        return this;
    }
}
exports.ColumnDescriptor = ColumnDescriptor;
