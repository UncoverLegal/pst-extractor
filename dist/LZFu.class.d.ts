/// <reference types="node" />
export declare class LZFu {
    private static LZFU_HEADER;
    /**
     * Decompress the buffer of RTF content using LZ
     * @static
     * @param {Buffer} data
     * @returns {string}
     * @memberof LZFu
     */
    static decode(data: Buffer): string;
}
