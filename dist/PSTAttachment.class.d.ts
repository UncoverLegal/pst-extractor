import { DescriptorIndexNode } from './DescriptorIndexNode.class';
import { PSTDescriptorItem } from './PSTDescriptorItem.class';
import { PSTFile } from './PSTFile.class';
import { PSTMessage } from './PSTMessage.class';
import { PSTNodeInputStream } from './PSTNodeInputStream.class';
import { PSTObject } from './PSTObject.class';
import { PSTTableBC } from './PSTTableBC.class';
export declare class PSTAttachment extends PSTObject {
    static ATTACHMENT_METHOD_NONE: number;
    static ATTACHMENT_METHOD_BY_VALUE: number;
    static ATTACHMENT_METHOD_BY_REFERENCE: number;
    static ATTACHMENT_METHOD_BY_REFERENCE_RESOLVE: number;
    static ATTACHMENT_METHOD_BY_REFERENCE_ONLY: number;
    static ATTACHMENT_METHOD_EMBEDDED: number;
    static ATTACHMENT_METHOD_OLE: number;
    /**
     * Creates an instance of PSTAttachment.
     * @param {PSTFile} pstFile
     * @param {PSTTableBC} table
     * @param {Map<number, PSTDescriptorItem>} localDescriptorItems
     * @memberof PSTAttachment
     */
    constructor(pstFile: PSTFile, table: PSTTableBC, localDescriptorItems: Map<number, PSTDescriptorItem>, descriptorIndexNode: DescriptorIndexNode | null);
    /**
     * The PR_ATTACH_SIZE property contains the sum, in bytes, of the sizes of all properties on an attachment.
     * https://msdn.microsoft.com/en-us/library/gg156074(v=winembedded.70).aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get size(): number;
    /**
     * Contains the creation date and time of a message.
     * https://msdn.microsoft.com/en-us/library/office/cc765677.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAttachment
     */
    get creationTime(): Date | null;
    /**
     * Contains the date and time when the object or subobject was last modified.
     * https://msdn.microsoft.com/en-us/library/office/cc815689.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAttachment
     */
    get modificationTime(): Date | null;
    /**
     * Get an embedded message.
     * @readonly
     * @type {PSTMessage}
     * @memberof PSTAttachment
     */
    get embeddedPSTMessage(): PSTMessage | null;
    /**
     * The file input stream.
     * https://msdn.microsoft.com/en-us/library/gg154634(v=winembedded.70).aspx
     * @readonly
     * @type {PSTNodeInputStream}
     * @memberof PSTAttachment
     */
    get fileInputStream(): PSTNodeInputStream | null;
    /**
     * Size of the attachment file itself.
     * https://msdn.microsoft.com/en-us/library/gg154634(v=winembedded.70).aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get filesize(): number;
    /**
     * Contains an attachment's base file name and extension, excluding path.
     * https://msdn.microsoft.com/en-us/library/office/cc842517.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get filename(): string;
    /**
     * Contains a MAPI-defined constant representing the way the contents of an attachment can be accessed.
     * https://msdn.microsoft.com/en-us/library/office/cc815439.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get attachMethod(): number;
    /**
     * Contains a number that uniquely identifies the attachment within its parent message.
     * https://msdn.microsoft.com/en-us/library/office/cc841969.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get attachNum(): number;
    /**
     * Contains an attachment's long filename and extension, excluding path.
     * https://msdn.microsoft.com/en-us/library/office/cc842157.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get longFilename(): string;
    /**
     * Contains an attachment's fully-qualified path and filename.
     * https://msdn.microsoft.com/en-us/library/office/cc839889.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get pathname(): string;
    /**
     * Contains an offset, in characters, to use in rendering an attachment within the main message text.
     * https://msdn.microsoft.com/en-us/library/office/cc842381.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get renderingPosition(): number;
    /**
     * Contains an attachment's fully-qualified long path and filename.
     * https://msdn.microsoft.com/en-us/library/office/cc815443.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get longPathname(): string;
    /**
     * Contains formatting information about a Multipurpose Internet Mail Extensions (MIME) attachment.
     * https://msdn.microsoft.com/en-us/library/office/cc842516.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get mimeTag(): string;
    /**
     * Contains the MIME sequence number of a MIME message attachment.
     * https://msdn.microsoft.com/en-us/library/office/cc963256.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get mimeSequence(): number;
    /**
     * Contains the content identification header of a Multipurpose Internet Mail Extensions (MIME) message attachment.
     * https://msdn.microsoft.com/en-us/library/office/cc765868.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get contentId(): string;
    /**
     * Indicates that this attachment is not available to HTML rendering applications and should be ignored in Multipurpose Internet Mail Extensions (MIME) processing.
     * https://msdn.microsoft.com/en-us/library/office/cc765876.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAttachment
     */
    get isAttachmentInvisibleInHtml(): boolean;
    /**
     * Indicates that this attachment is not available to applications rendering in Rich Text Format (RTF) and should be ignored by MAPI.
     * https://msdn.microsoft.com/en-us/library/office/cc765876.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAttachment
     */
    get isAttachmentInvisibleInRTF(): boolean;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTAttachment
     */
    toJSON(): any;
}
