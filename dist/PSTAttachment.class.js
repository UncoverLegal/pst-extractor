"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTAttachment = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const long_1 = __importDefault(require("long"));
const OutlookProperties_1 = require("./OutlookProperties");
const PSTNodeInputStream_class_1 = require("./PSTNodeInputStream.class");
const PSTObject_class_1 = require("./PSTObject.class");
const PSTTableBC_class_1 = require("./PSTTableBC.class");
const PSTUtil_class_1 = require("./PSTUtil.class");
// Class containing attachment information.
class PSTAttachment extends PSTObject_class_1.PSTObject {
    /**
     * Creates an instance of PSTAttachment.
     * @param {PSTFile} pstFile
     * @param {PSTTableBC} table
     * @param {Map<number, PSTDescriptorItem>} localDescriptorItems
     * @memberof PSTAttachment
     */
    constructor(pstFile, table, localDescriptorItems, descriptorIndexNode) {
        super(pstFile, descriptorIndexNode || undefined);
        // pre-populate folder object with values
        this.prePopulate(descriptorIndexNode, table, localDescriptorItems);
    }
    /**
     * The PR_ATTACH_SIZE property contains the sum, in bytes, of the sizes of all properties on an attachment.
     * https://msdn.microsoft.com/en-us/library/gg156074(v=winembedded.70).aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get size() {
        return this.getIntItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_SIZE);
    }
    /**
     * Contains the creation date and time of a message.
     * https://msdn.microsoft.com/en-us/library/office/cc765677.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAttachment
     */
    get creationTime() {
        return this.getDateItem(OutlookProperties_1.OutlookProperties.PR_CREATION_TIME);
    }
    /**
     * Contains the date and time when the object or subobject was last modified.
     * https://msdn.microsoft.com/en-us/library/office/cc815689.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAttachment
     */
    get modificationTime() {
        return this.getDateItem(OutlookProperties_1.OutlookProperties.PR_LAST_MODIFICATION_TIME);
    }
    /**
     * Get an embedded message.
     * @readonly
     * @type {PSTMessage}
     * @memberof PSTAttachment
     */
    get embeddedPSTMessage() {
        let pstNodeInputStream = null;
        let localDescriptorItems = this.localDescriptorItems;
        if (this.getIntItem(0x3705) == PSTAttachment.ATTACHMENT_METHOD_EMBEDDED) {
            const item = this.pstTableItems ? this.pstTableItems.get(0x3701) : null;
            if (item && item.entryValueType == 0x0102) {
                if (!item.isExternalValueReference) {
                    pstNodeInputStream = new PSTNodeInputStream_class_1.PSTNodeInputStream(this.pstFile, item.data);
                }
                else {
                    // We are in trouble!
                    throw new Error('PSTAttachment::getEmbeddedPSTMessage External reference in getEmbeddedPSTMessage()!');
                }
            }
            else if (item && item.entryValueType == 0x000d) {
                const descriptorItem = PSTUtil_class_1.PSTUtil.convertLittleEndianBytesToLong(item.data, 0, 4).toNumber();
                const descriptorItemNested = this.localDescriptorItems
                    ? this.localDescriptorItems.get(descriptorItem)
                    : null;
                if (descriptorItemNested) {
                    pstNodeInputStream = new PSTNodeInputStream_class_1.PSTNodeInputStream(this.pstFile, descriptorItemNested);
                    if (descriptorItemNested &&
                        descriptorItemNested.subNodeOffsetIndexIdentifier > 0) {
                        localDescriptorItems = this.pstFile.getPSTDescriptorItems(long_1.default.fromNumber(descriptorItemNested.subNodeOffsetIndexIdentifier));
                    }
                }
            }
            if (!pstNodeInputStream) {
                return null;
            }
            try {
                const attachmentTable = new PSTTableBC_class_1.PSTTableBC(pstNodeInputStream);
                if (localDescriptorItems && this.descriptorIndexNode) {
                    return PSTUtil_class_1.PSTUtil.createAppropriatePSTMessageObject(this.pstFile, this.descriptorIndexNode, attachmentTable, localDescriptorItems);
                }
            }
            catch (err) {
                console.error('PSTAttachment::embeddedPSTMessage createAppropriatePSTMessageObject failed\n' +
                    err);
                throw err;
            }
        }
        return null;
    }
    /**
     * The file input stream.
     * https://msdn.microsoft.com/en-us/library/gg154634(v=winembedded.70).aspx
     * @readonly
     * @type {PSTNodeInputStream}
     * @memberof PSTAttachment
     */
    get fileInputStream() {
        const attachmentDataObject = this.pstTableItems
            ? this.pstTableItems.get(OutlookProperties_1.OutlookProperties.PR_ATTACH_DATA_BIN)
            : null;
        if (!attachmentDataObject) {
            return null;
        }
        else if (attachmentDataObject.isExternalValueReference) {
            const descriptorItemNested = this.localDescriptorItems
                ? this.localDescriptorItems.get(attachmentDataObject.entryValueReference)
                : null;
            if (descriptorItemNested) {
                return new PSTNodeInputStream_class_1.PSTNodeInputStream(this.pstFile, descriptorItemNested);
            }
        }
        else {
            // internal value references are never encrypted
            return new PSTNodeInputStream_class_1.PSTNodeInputStream(this.pstFile, attachmentDataObject.data, false);
        }
        return null;
    }
    /**
     * Size of the attachment file itself.
     * https://msdn.microsoft.com/en-us/library/gg154634(v=winembedded.70).aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get filesize() {
        const attachmentDataObject = this.pstTableItems
            ? this.pstTableItems.get(OutlookProperties_1.OutlookProperties.PR_ATTACH_DATA_BIN)
            : null;
        if (attachmentDataObject && attachmentDataObject.isExternalValueReference) {
            const descriptorItemNested = this.localDescriptorItems
                ? this.localDescriptorItems.get(attachmentDataObject.entryValueReference)
                : null;
            if (descriptorItemNested == null) {
                throw new Error('PSTAttachment::filesize missing attachment descriptor item for: ' +
                    attachmentDataObject.entryValueReference);
            }
            return descriptorItemNested.dataSize;
        }
        else if (attachmentDataObject) {
            // raw attachment data, right there!
            return attachmentDataObject.data.length;
        }
        return 0;
    }
    /**
     * Contains an attachment's base file name and extension, excluding path.
     * https://msdn.microsoft.com/en-us/library/office/cc842517.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get filename() {
        return this.getStringItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_FILENAME);
    }
    /**
     * Contains a MAPI-defined constant representing the way the contents of an attachment can be accessed.
     * https://msdn.microsoft.com/en-us/library/office/cc815439.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get attachMethod() {
        return this.getIntItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_METHOD);
    }
    /**
     * Contains a number that uniquely identifies the attachment within its parent message.
     * https://msdn.microsoft.com/en-us/library/office/cc841969.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get attachNum() {
        return this.getIntItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_NUM);
    }
    /**
     * Contains an attachment's long filename and extension, excluding path.
     * https://msdn.microsoft.com/en-us/library/office/cc842157.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get longFilename() {
        return this.getStringItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_LONG_FILENAME);
    }
    /**
     * Contains an attachment's fully-qualified path and filename.
     * https://msdn.microsoft.com/en-us/library/office/cc839889.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get pathname() {
        return this.getStringItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_PATHNAME);
    }
    /**
     * Contains an offset, in characters, to use in rendering an attachment within the main message text.
     * https://msdn.microsoft.com/en-us/library/office/cc842381.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get renderingPosition() {
        return this.getIntItem(OutlookProperties_1.OutlookProperties.PR_RENDERING_POSITION);
    }
    /**
     * Contains an attachment's fully-qualified long path and filename.
     * https://msdn.microsoft.com/en-us/library/office/cc815443.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get longPathname() {
        return this.getStringItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_LONG_PATHNAME);
    }
    /**
     * Contains formatting information about a Multipurpose Internet Mail Extensions (MIME) attachment.
     * https://msdn.microsoft.com/en-us/library/office/cc842516.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get mimeTag() {
        return this.getStringItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_MIME_TAG);
    }
    /**
     * Contains the MIME sequence number of a MIME message attachment.
     * https://msdn.microsoft.com/en-us/library/office/cc963256.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAttachment
     */
    get mimeSequence() {
        return this.getIntItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_MIME_SEQUENCE);
    }
    /**
     * Contains the content identification header of a Multipurpose Internet Mail Extensions (MIME) message attachment.
     * https://msdn.microsoft.com/en-us/library/office/cc765868.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAttachment
     */
    get contentId() {
        return this.getStringItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_CONTENT_ID);
    }
    /**
     * Indicates that this attachment is not available to HTML rendering applications and should be ignored in Multipurpose Internet Mail Extensions (MIME) processing.
     * https://msdn.microsoft.com/en-us/library/office/cc765876.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAttachment
     */
    get isAttachmentInvisibleInHtml() {
        const actionFlag = this.getIntItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_FLAGS);
        return (actionFlag & 0x1) > 0;
    }
    /**
     * Indicates that this attachment is not available to applications rendering in Rich Text Format (RTF) and should be ignored by MAPI.
     * https://msdn.microsoft.com/en-us/library/office/cc765876.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAttachment
     */
    get isAttachmentInvisibleInRTF() {
        const actionFlag = this.getIntItem(OutlookProperties_1.OutlookProperties.PR_ATTACH_FLAGS);
        return (actionFlag & 0x2) > 0;
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTAttachment
     */
    toJSON() {
        const clone = Object.assign({
            size: this.size,
            creationTime: this.creationTime,
            modificationTime: this.modificationTime,
            filename: this.filename,
            attachMethod: this.attachMethod,
            attachNum: this.attachNum,
            longFilename: this.longFilename,
            pathname: this.pathname,
            renderingPosition: this.renderingPosition,
            longPathname: this.longPathname,
            mimeTag: this.mimeTag,
            mimeSequence: this.mimeSequence,
            contentId: this.contentId,
            isAttachmentInvisibleInHtml: this.isAttachmentInvisibleInHtml,
            isAttachmentInvisibleInRTF: this.isAttachmentInvisibleInRTF,
        }, this);
        return clone;
    }
}
exports.PSTAttachment = PSTAttachment;
PSTAttachment.ATTACHMENT_METHOD_NONE = 0;
PSTAttachment.ATTACHMENT_METHOD_BY_VALUE = 1;
PSTAttachment.ATTACHMENT_METHOD_BY_REFERENCE = 2;
PSTAttachment.ATTACHMENT_METHOD_BY_REFERENCE_RESOLVE = 3;
PSTAttachment.ATTACHMENT_METHOD_BY_REFERENCE_ONLY = 4;
PSTAttachment.ATTACHMENT_METHOD_EMBEDDED = 5;
PSTAttachment.ATTACHMENT_METHOD_OLE = 6;
