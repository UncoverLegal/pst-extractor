"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeInfo = void 0;
class NodeInfo {
    get startOffset() {
        return this._startOffset;
    }
    get endOffset() {
        return this._endOffset;
    }
    length() {
        return this.endOffset - this.startOffset;
    }
    get pstNodeInputStream() {
        return this._pstNodeInputStream;
    }
    /**
     * Creates an instance of NodeInfo, part of the node table.
     * @param {number} start
     * @param {number} end
     * @param {PSTNodeInputStream} pstNodeInputStream
     * @memberof NodeInfo
     */
    constructor(start, end, pstNodeInputStream) {
        if (start > end) {
            throw new Error(`NodeInfo:: constructor Invalid NodeInfo parameters: start ${start} is greater than end ${end}`);
        }
        this._startOffset = start;
        this._endOffset = end;
        this._pstNodeInputStream = pstNodeInputStream;
    }
    /**
     * Seek to position in node input stream and read a long
     * @param {long} offset
     * @param {number} length
     * @returns {long}
     * @memberof NodeInfo
     */
    seekAndReadLong(offset, length) {
        return this.pstNodeInputStream.seekAndReadLong(offset.add(this.startOffset), length);
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof NodeInfo
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toJSON() {
        return this;
    }
}
exports.NodeInfo = NodeInfo;
