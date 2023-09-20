"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTTask = void 0;
const OutlookProperties_1 = require("./OutlookProperties");
const PSTMessage_class_1 = require("./PSTMessage.class");
const PSTFile_class_1 = require("./PSTFile.class");
const RecurrencePattern_class_1 = require("./RecurrencePattern.class");
class PSTTask extends PSTMessage_class_1.PSTMessage {
    /**
     * Creates an instance of PSTTask.
     * @param {PSTFile} pstFile
     * @param {DescriptorIndexNode} descriptorIndexNode
     * @param {PSTTableBC} [table]
     * @param {Map<number, PSTDescriptorItem>} [localDescriptorItems]
     * @memberof PSTTask
     */
    constructor(pstFile, descriptorIndexNode, table, localDescriptorItems) {
        super(pstFile, descriptorIndexNode, table, localDescriptorItems);
    }
    /**
     * Specifies the status of the user's progress on the task.
     * https://msdn.microsoft.com/en-us/library/office/cc842120.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskStatus() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskStatus, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Indicates the progress the user has made on a task.
     * https://msdn.microsoft.com/en-us/library/office/cc839932.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get percentComplete() {
        return this.getDoubleItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidPercentComplete, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Specifies the date when the user completes the task.
     * https://msdn.microsoft.com/en-us/library/office/cc815753.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTTask
     */
    get taskDateCompleted() {
        return this.getDateItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskDateCompleted, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Indicates the number of minutes that the user performed a task.
     * https://msdn.microsoft.com/en-us/library/office/cc842253.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskActualEffort() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskActualEffort, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Indicates the amount of time, in minutes, that the user expects to perform a task.
     * https://msdn.microsoft.com/en-us/library/office/cc842485.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskEstimatedEffort() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskEstimatedEffort, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Indicates which copy is the latest update of a task.
     * https://msdn.microsoft.com/en-us/library/office/cc815510.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskVersion() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskVersion, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Indicates the task is complete.
     * https://msdn.microsoft.com/en-us/library/office/cc839514.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTTask
     */
    get isTaskComplete() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskComplete, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Contains the name of the task owner.
     * https://msdn.microsoft.com/en-us/library/office/cc842363.aspx
     * @readonly
     * @type {string}
     * @memberof PSTTask
     */
    get taskOwner() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskOwner, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Names the user who was last assigned the task.
     * https://msdn.microsoft.com/en-us/library/office/cc815865.aspx
     * @readonly
     * @type {string}
     * @memberof PSTTask
     */
    get taskAssigner() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskAssigner, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Names the most recent user who was the task owner.
     * https://msdn.microsoft.com/en-us/library/office/cc842278.aspx
     * @readonly
     * @type {string}
     * @memberof PSTTask
     */
    get taskLastUser() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskLastUser, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Provides an aid to custom sorting tasks.
     * https://msdn.microsoft.com/en-us/library/office/cc765654.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskOrdinal() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskOrdinal, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Indicates whether the task includes a recurrence pattern.
     * https://msdn.microsoft.com/en-us/library/office/cc765875.aspx
     * @type {boolean}
     * @memberof PSTTask
     */
    get isTaskRecurring() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskFRecurring, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * https://docs.microsoft.com/en-us/office/client-developer/outlook/mapi/pidlidtaskrecurrence-canonical-property
     * @type {RecurrencePattern}
     * @memberof PSTTask
     */
    get taskRecurrencePattern() {
        const recurrenceBLOB = this.getBinaryItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskRecurrence, PSTFile_class_1.PSTFile.PSETID_Task));
        return recurrenceBLOB && new RecurrencePattern_class_1.RecurrencePattern(recurrenceBLOB);
    }
    /**
     * https://docs.microsoft.com/en-us/office/client-developer/outlook/mapi/pidlidtaskdeadoccurrence-canonical-property
     * @type {boolean}
     * @memberof PSTTask
     */
    get taskDeadOccurrence() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskDeadOccurrence, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Indicates the role of the current user relative to the task.
     * https://msdn.microsoft.com/en-us/library/office/cc842113.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskOwnership() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskOwnership, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * Indicates the acceptance state of the task.
     * https://msdn.microsoft.com/en-us/library/office/cc839689.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get acceptanceState() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTaskAcceptanceState, PSTFile_class_1.PSTFile.PSETID_Task));
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTTask
     */
    toJSON() {
        const clone = Object.assign({
            messageClass: this.messageClass,
            subject: this.subject,
            importance: this.importance,
            transportMessageHeaders: this.transportMessageHeaders,
            taskStatus: this.taskStatus,
            percentComplete: this.percentComplete,
            taskDateCompleted: this.taskDateCompleted,
            taskActualEffort: this.taskActualEffort,
            taskEstimatedEffort: this.taskEstimatedEffort,
            taskVersion: this.taskVersion,
            isTaskComplete: this.isTaskComplete,
            taskOwner: this.taskOwner,
            taskAssigner: this.taskAssigner,
            taskLastUser: this.taskLastUser,
            taskOrdinal: this.taskOrdinal,
            isTaskRecurring: this.isTaskRecurring,
            taskOwnership: this.taskOwnership,
            acceptanceState: this.acceptanceState,
        }, this);
        return clone;
    }
}
exports.PSTTask = PSTTask;
