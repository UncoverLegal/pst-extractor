/// <reference types="node" />
import { DescriptorIndexNode } from './DescriptorIndexNode.class';
import { PSTDescriptorItem } from './PSTDescriptorItem.class';
import { PSTFile } from './PSTFile.class';
import { PSTMessage } from './PSTMessage.class';
import { PSTTableBC } from './PSTTableBC.class';
export declare class PSTAppointment extends PSTMessage {
    constructor(pstFile: PSTFile, descriptorIndexNode: DescriptorIndexNode, table?: PSTTableBC, localDescriptorItems?: Map<number, PSTDescriptorItem>);
    /**
     * Specifies if a meeting request should be sent as an iCal message.
     * https://msdn.microsoft.com/en-us/library/office/cc839802.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get sendAsICAL(): boolean;
    /**
     * Represents the user’s availability for an appointment.
     * https://msdn.microsoft.com/en-us/library/office/cc841972.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get busyStatus(): number;
    /**
     * The user is busy.
     * https://msdn.microsoft.com/en-us/library/office/cc841972.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get showAsBusy(): boolean;
    /**
     * Represents the location of an appointment.
     * https://msdn.microsoft.com/en-us/library/office/cc842419.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get location(): string;
    /**
     * Represents the date and time when an appointment begins.
     * https://msdn.microsoft.com/en-us/library/office/cc839929.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAppointment
     */
    get startTime(): Date | null;
    /**
     * Represents the date and time that an appointment ends.
     * https://msdn.microsoft.com/en-us/library/office/cc815864.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAppointment
     */
    get endTime(): Date | null;
    /**
     * Represents the length of time, in minutes, when an appointment is scheduled.
     * https://msdn.microsoft.com/en-us/library/office/cc842287.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get duration(): number;
    /**
     * Specifies the color to use when displaying the calendar.
     * https://msdn.microsoft.com/en-us/library/office/cc842274.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get color(): number;
    /**
     * Specifies whether or not the event is all day.
     * https://msdn.microsoft.com/en-us/library/office/cc839901.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get subType(): boolean;
    /**
     * Specifies a bit field that describes the state of the object.
     * https://msdn.microsoft.com/en-us/library/office/cc765762.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get meetingStatus(): number;
    /**
     * Specifies the response status of an attendee.
     * https://msdn.microsoft.com/en-us/library/office/cc839923.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get responseStatus(): number;
    /**
     * Specifies whether an appointment message is recurrent.
     * https://msdn.microsoft.com/en-us/library/office/cc765772.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get isRecurring(): boolean;
    /**
     * Specifies the date and time within the recurrence pattern that the exception will replace.
     * https://msdn.microsoft.com/en-us/library/office/cc842450.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAppointment
     */
    get recurrenceBase(): Date | null;
    /**
     * Specifies the recurrence type of the recurring series.
     * https://msdn.microsoft.com/en-us/library/office/cc842135.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get recurrenceType(): number;
    /**
     * Specifies a description of the recurrence pattern of the calendar object.
     * https://msdn.microsoft.com/en-us/library/office/cc815733.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get recurrencePattern(): string;
    /**
     * Specifies the dates and times when a recurring series occurs by using one of the recurrence patterns and ranges that are specified in [MS-OXOCAL].
     * https://msdn.microsoft.com/en-us/library/office/cc842017.aspx
     * @readonly
     * @type {Buffer}
     * @memberof PSTAppointment
     */
    get recurrenceStructure(): Buffer | null;
    /**
     * Contains a stream that maps to the persisted format of a TZREG structure, which describes the time zone to be used for the start and end time of a recurring appointment or meeting request.
     * https://msdn.microsoft.com/en-us/library/office/cc815376.aspx
     * @readonly
     * @type {Buffer}
     * @memberof PSTAppointment
     */
    get timezone(): Buffer | null;
    /**
     * Specifies a list of all the attendees except for the organizer, including resources and unsendable attendees.
     * https://msdn.microsoft.com/en-us/library/office/cc815418.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get allAttendees(): string;
    /**
     * Contains a list of all the sendable attendees who are also required attendees.
     * https://msdn.microsoft.com/en-us/library/office/cc842502.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get toAttendees(): string;
    /**
     * Contains a list of all the sendable attendees who are also optional attendees.
     * https://msdn.microsoft.com/en-us/library/office/cc839636.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get ccAttendees(): string;
    /**
     * Specifies the sequence number of a Meeting object.
     * https://msdn.microsoft.com/en-us/library/office/cc765937.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get appointmentSequence(): number;
    /**
     * Is a hosted meeting?
     * https://msdn.microsoft.com/en-us/library/ee200872(v=exchg.80).aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get isOnlineMeeting(): boolean;
    /**
     * Specifies the type of the meeting.
     * https://msdn.microsoft.com/en-us/library/ee158396(v=exchg.80).aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get netMeetingType(): number;
    /**
     * Specifies the directory server to be used.
     * https://msdn.microsoft.com/en-us/library/ee201516(v=exchg.80).aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get netMeetingServer(): string;
    /**
     * Specifies the email address of the organizer.
     * https://msdn.microsoft.com/en-us/library/ee203317(v=exchg.80).aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get netMeetingOrganizerAlias(): string;
    /**
     * Specifies the document to be launched when the user joins the meeting.
     * https://msdn.microsoft.com/en-us/library/ee204395(v=exchg.80).aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get netMeetingDocumentPathName(): string;
    /**
     * The PidLidNetShowUrl property ([MS-OXPROPS] section 2.175) specifies the URL to be launched when the user joins the meeting
     * https://msdn.microsoft.com/en-us/library/ee179451(v=exchg.80).aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get netShowURL(): string;
    /**
     * Specifies the date and time at which the meeting-related object was sent.
     * https://msdn.microsoft.com/en-us/library/ee237112(v=exchg.80).aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAppointment
     */
    get attendeeCriticalChange(): Date | null;
    /**
     * Indicates that this meeting response is a counter proposal.
     * https://msdn.microsoft.com/en-us/magazine/cc815846.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get appointmentCounterProposal(): boolean;
    /**
     * Indicates whether the user did not include any text in the body of the Meeting Response object.
     * https://msdn.microsoft.com/en-us/library/ee159822(v=exchg.80).aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get isSilent(): boolean;
    /**
     * Identifies required attendees for the appointment or meeting.
     * https://msdn.microsoft.com/en-us/library/ee160700(v=exchg.80).aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get requiredAttendees(): string;
    /**
     * Contains the Windows Locale ID of the end-user who created this message.
     * https://msdn.microsoft.com/en-us/library/ee201602(v=exchg.80).aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get localeId(): number;
    /**
     * JSON stringify the object properties.  Large fields (like body) aren't included.
     * @returns {string}
     * @memberof PSTAppointment
     */
    toJSON(): any;
}
