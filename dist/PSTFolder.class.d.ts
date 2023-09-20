import { DescriptorIndexNode } from './DescriptorIndexNode.class';
import { PSTDescriptorItem } from './PSTDescriptorItem.class';
import { PSTFile } from './PSTFile.class';
import { PSTTableBC } from './PSTTableBC.class';
import { PSTObject } from './PSTObject.class';
/**
 * Represents a folder in the PST File.  Allows you to access child folders or items.
 * Items are accessed through a sort of cursor arrangement.  This allows for
 * incremental reading of a folder which may have _lots_ of emails.
 * @export
 * @class PSTFolder
 * @extends {PSTObject}
 */
export declare class PSTFolder extends PSTObject {
    private currentEmailIndex;
    private subfoldersTable;
    private emailsTable;
    private fallbackEmailsTable;
    /**
     * Creates an instance of PSTFolder.
     * Represents a folder in the PST File.  Allows you to access child folders or items.
     * Items are accessed through a sort of cursor arrangement.  This allows for
     * incremental reading of a folder which may have _lots_ of emails.
     * @param {PSTFile} pstFile
     * @param {DescriptorIndexNode} descriptorIndexNode
     * @param {PSTTableBC} [table]
     * @param {Map<number, PSTDescriptorItem>} [localDescriptorItems]
     * @memberof PSTFolder
     */
    constructor(pstFile: PSTFile, descriptorIndexNode: DescriptorIndexNode, table?: PSTTableBC, localDescriptorItems?: Map<number, PSTDescriptorItem>);
    /**
     * Get folders in one fell swoop, since there's not usually thousands of them.
     * @returns {PSTFolder[]}
     * @memberof PSTFolder
     */
    getSubFolders(): PSTFolder[];
    /**
     * Load subfolders table.
     * @private
     * @returns
     * @memberof PSTFolder
     */
    private initSubfoldersTable;
    private initEmailsTable;
    /**
     * Get the next child of this folder. As there could be thousands of emails, we have these
     * kind of cursor operations.
     * @returns {*}
     * @memberof PSTFolder
     */
    getNextChild(): any;
    /**
     *  Move the internal folder cursor to the desired position position 0 is before the first record.
     * @param {number} newIndex
     * @returns
     * @memberof PSTFolder
     */
    moveChildCursorTo(newIndex: number): void;
    /**
     * The number of child folders in this folder
     * @readonly
     * @type {number}
     * @memberof PSTFolder
     */
    get subFolderCount(): number;
    /**
     * Number of emails in this folder
     * @readonly
     * @type {number}
     * @memberof PSTFolder
     */
    get emailCount(): number;
    /**
     * Contains a constant that indicates the folder type.
     * https://msdn.microsoft.com/en-us/library/office/cc815373.aspx
     * @readonly
     * @type {number}
     * @memberof PSTFolder
     */
    get folderType(): number;
    /**
     * Contains the number of messages in a folder, as computed by the message store.
     * For a number calculated by the library use getEmailCount
     * @readonly
     * @type {number}
     * @memberof PSTFolder
     */
    get contentCount(): number;
    /**
     * Contains the number of unread messages in a folder, as computed by the message store.
     * https://msdn.microsoft.com/en-us/library/office/cc841964.aspx
     * @readonly
     * @type {number}
     * @memberof PSTFolder
     */
    get unreadCount(): number;
    /**
     * Contains TRUE if a folder contains subfolders.
     * once again, read from the PST, use getSubFolderCount if you want to know
     * @readonly
     * @type {boolean}
     * @memberof PSTFolder
     */
    get hasSubfolders(): boolean;
    /**
     * Contains a text string describing the type of a folder. Although this property is
     * generally ignored, versions of Microsoft® Exchange Server prior to Exchange Server
     * 2003 Mailbox Manager expect this property to be present.
     * https://msdn.microsoft.com/en-us/library/office/cc839839.aspx
     * @readonly
     * @type {string}
     * @memberof PSTFolder
     */
    get containerClass(): string;
    /**
     * Contains a bitmask of flags describing capabilities of an address book container.
     * https://msdn.microsoft.com/en-us/library/office/cc839610.aspx
     * @readonly
     * @type {number}
     * @memberof PSTFolder
     */
    get containerFlags(): number;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTFolder
     */
    toJSON(): any;
}
