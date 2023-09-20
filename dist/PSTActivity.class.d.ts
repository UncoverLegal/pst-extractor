import { PSTFile } from './PSTFile.class';
import { DescriptorIndexNode } from './DescriptorIndexNode.class';
import { PSTTableBC } from './PSTTableBC.class';
import { PSTDescriptorItem } from './PSTDescriptorItem.class';
import { PSTMessage } from './PSTMessage.class';
export declare class PSTActivity extends PSTMessage {
    /**
     * Creates an instance of PSTActivity.  Represents Journal entries, class IPM.Activity.
     * https://msdn.microsoft.com/en-us/library/office/aa204771(v=office.11).aspx
     * @param {PSTFile} pstFile
     * @param {DescriptorIndexNode} descriptorIndexNode
     * @param {PSTTableBC} [table]
     * @param {Map<number, PSTDescriptorItem>} [localDescriptorItems]
     * @memberof PSTActivity
     */
    constructor(pstFile: PSTFile, descriptorIndexNode: DescriptorIndexNode, table?: PSTTableBC, localDescriptorItems?: Map<number, PSTDescriptorItem>);
    /**
     * Contains the display name of the journaling application (for example, "MSWord"), and is typically a free-form attribute of a journal message, usually a string.
     * https://msdn.microsoft.com/en-us/library/office/cc839662.aspx
     * @readonly
     * @type {string}
     * @memberof PSTActivity
     */
    get logType(): string;
    /**
     * Represents the start date and time for the journal message.
     * https://msdn.microsoft.com/en-us/library/office/cc842339.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTActivity
     */
    get logStart(): Date | null;
    /**
     * Represents the duration, in minutes, of a journal message.
     * https://msdn.microsoft.com/en-us/library/office/cc765536.aspx
     * @readonly
     * @type {number}
     * @memberof PSTActivity
     */
    get logDuration(): number;
    /**
     * Represents the end date and time for the journal message.
     * https://msdn.microsoft.com/en-us/library/office/cc839572.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTActivity
     */
    get logEnd(): Date | null;
    /**
     * Contains metadata about the journal.
     * https://msdn.microsoft.com/en-us/library/office/cc815433.aspx
     * @readonly
     * @type {number}
     * @memberof PSTActivity
     */
    get logFlags(): number;
    /**
     * Indicates whether the document was printed during journaling.
     * https://msdn.microsoft.com/en-us/library/office/cc839873.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTActivity
     */
    get isDocumentPrinted(): boolean;
    /**
     * Indicates whether the document was saved during journaling.
     * https://msdn.microsoft.com/en-us/library/office/cc815488.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTActivity
     */
    get isDocumentSaved(): boolean;
    /**
     * Indicates whether the document was sent to a routing recipient during journaling.
     * https://msdn.microsoft.com/en-us/library/office/cc839558.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTActivity
     */
    get isDocumentRouted(): boolean;
    /**
     * Indicates whether the document was sent by e-mail or posted to a server folder during journaling.
     * https://msdn.microsoft.com/en-us/library/office/cc815353.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTActivity
     */
    get isDocumentPosted(): boolean;
    /**
     * Describes the activity that is being recorded.
     * https://msdn.microsoft.com/en-us/library/office/cc815500.aspx
     * @readonly
     * @type {string}
     * @memberof PSTActivity
     */
    get logTypeDesc(): string;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTActivity
     */
    toJSON(): any;
}
