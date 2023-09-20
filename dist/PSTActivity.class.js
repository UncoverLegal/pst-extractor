"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTActivity = void 0;
const PSTMessage_class_1 = require("./PSTMessage.class");
const OutlookProperties_1 = require("./OutlookProperties");
class PSTActivity extends PSTMessage_class_1.PSTMessage {
    /**
     * Creates an instance of PSTActivity.  Represents Journal entries, class IPM.Activity.
     * https://msdn.microsoft.com/en-us/library/office/aa204771(v=office.11).aspx
     * @param {PSTFile} pstFile
     * @param {DescriptorIndexNode} descriptorIndexNode
     * @param {PSTTableBC} [table]
     * @param {Map<number, PSTDescriptorItem>} [localDescriptorItems]
     * @memberof PSTActivity
     */
    constructor(pstFile, descriptorIndexNode, table, localDescriptorItems) {
        super(pstFile, descriptorIndexNode, table, localDescriptorItems);
    }
    /**
     * Contains the display name of the journaling application (for example, "MSWord"), and is typically a free-form attribute of a journal message, usually a string.
     * https://msdn.microsoft.com/en-us/library/office/cc839662.aspx
     * @readonly
     * @type {string}
     * @memberof PSTActivity
     */
    get logType() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLogType, OutlookProperties_1.OutlookProperties.PSETID_Log));
    }
    /**
     * Represents the start date and time for the journal message.
     * https://msdn.microsoft.com/en-us/library/office/cc842339.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTActivity
     */
    get logStart() {
        return this.getDateItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLogStart, OutlookProperties_1.OutlookProperties.PSETID_Log));
    }
    /**
     * Represents the duration, in minutes, of a journal message.
     * https://msdn.microsoft.com/en-us/library/office/cc765536.aspx
     * @readonly
     * @type {number}
     * @memberof PSTActivity
     */
    get logDuration() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLogDuration, OutlookProperties_1.OutlookProperties.PSETID_Log));
    }
    /**
     * Represents the end date and time for the journal message.
     * https://msdn.microsoft.com/en-us/library/office/cc839572.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTActivity
     */
    get logEnd() {
        return this.getDateItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLogEnd, OutlookProperties_1.OutlookProperties.PSETID_Log));
    }
    /**
     * Contains metadata about the journal.
     * https://msdn.microsoft.com/en-us/library/office/cc815433.aspx
     * @readonly
     * @type {number}
     * @memberof PSTActivity
     */
    get logFlags() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLogFlags, OutlookProperties_1.OutlookProperties.PSETID_Log));
    }
    /**
     * Indicates whether the document was printed during journaling.
     * https://msdn.microsoft.com/en-us/library/office/cc839873.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTActivity
     */
    get isDocumentPrinted() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLogDocumentPrinted, OutlookProperties_1.OutlookProperties.PSETID_Log));
    }
    /**
     * Indicates whether the document was saved during journaling.
     * https://msdn.microsoft.com/en-us/library/office/cc815488.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTActivity
     */
    get isDocumentSaved() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLogDocumentSaved, OutlookProperties_1.OutlookProperties.PSETID_Log));
    }
    /**
     * Indicates whether the document was sent to a routing recipient during journaling.
     * https://msdn.microsoft.com/en-us/library/office/cc839558.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTActivity
     */
    get isDocumentRouted() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLogDocumentRouted, OutlookProperties_1.OutlookProperties.PSETID_Log));
    }
    /**
     * Indicates whether the document was sent by e-mail or posted to a server folder during journaling.
     * https://msdn.microsoft.com/en-us/library/office/cc815353.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTActivity
     */
    get isDocumentPosted() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLogDocumentPosted, OutlookProperties_1.OutlookProperties.PSETID_Log));
    }
    /**
     * Describes the activity that is being recorded.
     * https://msdn.microsoft.com/en-us/library/office/cc815500.aspx
     * @readonly
     * @type {string}
     * @memberof PSTActivity
     */
    get logTypeDesc() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLogTypeDesc, OutlookProperties_1.OutlookProperties.PSETID_Log));
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTActivity
     */
    toJSON() {
        const clone = Object.assign({
            messageClass: this.messageClass,
            subject: this.subject,
            importance: this.importance,
            transportMessageHeaders: this.transportMessageHeaders,
            logType: this.logType,
            logStart: this.logStart,
            logDuration: this.logDuration,
            logEnd: this.logEnd,
            logFlags: this.logFlags,
            isDocumentPrinted: this.isDocumentPrinted,
            isDocumentSaved: this.isDocumentSaved,
            isDocumentRouted: this.isDocumentRouted,
            isDocumentPosted: this.isDocumentPosted,
            logTypeDesc: this.logTypeDesc,
        }, this);
        return clone;
    }
}
exports.PSTActivity = PSTActivity;
