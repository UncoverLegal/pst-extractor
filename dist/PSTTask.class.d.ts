import { DescriptorIndexNode } from './DescriptorIndexNode.class';
import { PSTDescriptorItem } from './PSTDescriptorItem.class';
import { PSTMessage } from './PSTMessage.class';
import { PSTTableBC } from './PSTTableBC.class';
import { PSTFile } from './PSTFile.class';
import { RecurrencePattern } from './RecurrencePattern.class';
export declare class PSTTask extends PSTMessage {
    /**
     * Creates an instance of PSTTask.
     * @param {PSTFile} pstFile
     * @param {DescriptorIndexNode} descriptorIndexNode
     * @param {PSTTableBC} [table]
     * @param {Map<number, PSTDescriptorItem>} [localDescriptorItems]
     * @memberof PSTTask
     */
    constructor(pstFile: PSTFile, descriptorIndexNode: DescriptorIndexNode, table?: PSTTableBC, localDescriptorItems?: Map<number, PSTDescriptorItem>);
    /**
     * Specifies the status of the user's progress on the task.
     * https://msdn.microsoft.com/en-us/library/office/cc842120.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskStatus(): number;
    /**
     * Indicates the progress the user has made on a task.
     * https://msdn.microsoft.com/en-us/library/office/cc839932.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get percentComplete(): number;
    /**
     * Specifies the date when the user completes the task.
     * https://msdn.microsoft.com/en-us/library/office/cc815753.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTTask
     */
    get taskDateCompleted(): Date | null;
    /**
     * Indicates the number of minutes that the user performed a task.
     * https://msdn.microsoft.com/en-us/library/office/cc842253.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskActualEffort(): number;
    /**
     * Indicates the amount of time, in minutes, that the user expects to perform a task.
     * https://msdn.microsoft.com/en-us/library/office/cc842485.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskEstimatedEffort(): number;
    /**
     * Indicates which copy is the latest update of a task.
     * https://msdn.microsoft.com/en-us/library/office/cc815510.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskVersion(): number;
    /**
     * Indicates the task is complete.
     * https://msdn.microsoft.com/en-us/library/office/cc839514.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTTask
     */
    get isTaskComplete(): boolean;
    /**
     * Contains the name of the task owner.
     * https://msdn.microsoft.com/en-us/library/office/cc842363.aspx
     * @readonly
     * @type {string}
     * @memberof PSTTask
     */
    get taskOwner(): string;
    /**
     * Names the user who was last assigned the task.
     * https://msdn.microsoft.com/en-us/library/office/cc815865.aspx
     * @readonly
     * @type {string}
     * @memberof PSTTask
     */
    get taskAssigner(): string;
    /**
     * Names the most recent user who was the task owner.
     * https://msdn.microsoft.com/en-us/library/office/cc842278.aspx
     * @readonly
     * @type {string}
     * @memberof PSTTask
     */
    get taskLastUser(): string;
    /**
     * Provides an aid to custom sorting tasks.
     * https://msdn.microsoft.com/en-us/library/office/cc765654.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskOrdinal(): number;
    /**
     * Indicates whether the task includes a recurrence pattern.
     * https://msdn.microsoft.com/en-us/library/office/cc765875.aspx
     * @type {boolean}
     * @memberof PSTTask
     */
    get isTaskRecurring(): boolean;
    /**
     * https://docs.microsoft.com/en-us/office/client-developer/outlook/mapi/pidlidtaskrecurrence-canonical-property
     * @type {RecurrencePattern}
     * @memberof PSTTask
     */
    get taskRecurrencePattern(): RecurrencePattern | null;
    /**
     * https://docs.microsoft.com/en-us/office/client-developer/outlook/mapi/pidlidtaskdeadoccurrence-canonical-property
     * @type {boolean}
     * @memberof PSTTask
     */
    get taskDeadOccurrence(): boolean;
    /**
     * Indicates the role of the current user relative to the task.
     * https://msdn.microsoft.com/en-us/library/office/cc842113.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get taskOwnership(): number;
    /**
     * Indicates the acceptance state of the task.
     * https://msdn.microsoft.com/en-us/library/office/cc839689.aspx
     * @readonly
     * @type {number}
     * @memberof PSTTask
     */
    get acceptanceState(): number;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTTask
     */
    toJSON(): any;
}
