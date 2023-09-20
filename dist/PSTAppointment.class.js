"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTAppointment = void 0;
const OutlookProperties_1 = require("./OutlookProperties");
const PSTMessage_class_1 = require("./PSTMessage.class");
// PSTAppointment is for Calendar items
class PSTAppointment extends PSTMessage_class_1.PSTMessage {
    constructor(pstFile, descriptorIndexNode, table, localDescriptorItems) {
        super(pstFile, descriptorIndexNode, table, localDescriptorItems);
    }
    /**
     * Specifies if a meeting request should be sent as an iCal message.
     * https://msdn.microsoft.com/en-us/library/office/cc839802.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get sendAsICAL() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidSendMeetingAsIcal, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Represents the user’s availability for an appointment.
     * https://msdn.microsoft.com/en-us/library/office/cc841972.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get busyStatus() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidBusyStatus, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * The user is busy.
     * https://msdn.microsoft.com/en-us/library/office/cc841972.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get showAsBusy() {
        return this.busyStatus == 2;
    }
    /**
     * Represents the location of an appointment.
     * https://msdn.microsoft.com/en-us/library/office/cc842419.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get location() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidLocation, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Represents the date and time when an appointment begins.
     * https://msdn.microsoft.com/en-us/library/office/cc839929.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAppointment
     */
    get startTime() {
        return this.getDateItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAppointmentStartWhole, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Represents the date and time that an appointment ends.
     * https://msdn.microsoft.com/en-us/library/office/cc815864.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAppointment
     */
    get endTime() {
        return this.getDateItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAppointmentEndWhole, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Represents the length of time, in minutes, when an appointment is scheduled.
     * https://msdn.microsoft.com/en-us/library/office/cc842287.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get duration() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAppointmentDuration, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the color to use when displaying the calendar.
     * https://msdn.microsoft.com/en-us/library/office/cc842274.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get color() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAppointmentColor, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies whether or not the event is all day.
     * https://msdn.microsoft.com/en-us/library/office/cc839901.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get subType() {
        return (this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAppointmentSubType, OutlookProperties_1.OutlookProperties.PSETID_Appointment)) != 0);
    }
    /**
     * Specifies a bit field that describes the state of the object.
     * https://msdn.microsoft.com/en-us/library/office/cc765762.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get meetingStatus() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAppointmentStateFlags, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the response status of an attendee.
     * https://msdn.microsoft.com/en-us/library/office/cc839923.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get responseStatus() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidResponseStatus, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies whether an appointment message is recurrent.
     * https://msdn.microsoft.com/en-us/library/office/cc765772.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get isRecurring() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidRecurring, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the date and time within the recurrence pattern that the exception will replace.
     * https://msdn.microsoft.com/en-us/library/office/cc842450.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAppointment
     */
    get recurrenceBase() {
        return this.getDateItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidExceptionReplaceTime, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the recurrence type of the recurring series.
     * https://msdn.microsoft.com/en-us/library/office/cc842135.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get recurrenceType() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidRecurrenceType, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies a description of the recurrence pattern of the calendar object.
     * https://msdn.microsoft.com/en-us/library/office/cc815733.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get recurrencePattern() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidRecurrencePattern, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the dates and times when a recurring series occurs by using one of the recurrence patterns and ranges that are specified in [MS-OXOCAL].
     * https://msdn.microsoft.com/en-us/library/office/cc842017.aspx
     * @readonly
     * @type {Buffer}
     * @memberof PSTAppointment
     */
    get recurrenceStructure() {
        return this.getBinaryItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAppointmentRecur, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Contains a stream that maps to the persisted format of a TZREG structure, which describes the time zone to be used for the start and end time of a recurring appointment or meeting request.
     * https://msdn.microsoft.com/en-us/library/office/cc815376.aspx
     * @readonly
     * @type {Buffer}
     * @memberof PSTAppointment
     */
    get timezone() {
        return this.getBinaryItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidTimeZoneStruct, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies a list of all the attendees except for the organizer, including resources and unsendable attendees.
     * https://msdn.microsoft.com/en-us/library/office/cc815418.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get allAttendees() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAllAttendeesString, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Contains a list of all the sendable attendees who are also required attendees.
     * https://msdn.microsoft.com/en-us/library/office/cc842502.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get toAttendees() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidToAttendeesString, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Contains a list of all the sendable attendees who are also optional attendees.
     * https://msdn.microsoft.com/en-us/library/office/cc839636.aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get ccAttendees() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidCcAttendeesString, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the sequence number of a Meeting object.
     * https://msdn.microsoft.com/en-us/library/office/cc765937.aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get appointmentSequence() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAppointmentSequence, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Is a hosted meeting?
     * https://msdn.microsoft.com/en-us/library/ee200872(v=exchg.80).aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get isOnlineMeeting() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidConferencingCheck, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the type of the meeting.
     * https://msdn.microsoft.com/en-us/library/ee158396(v=exchg.80).aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get netMeetingType() {
        return this.getIntItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidConferencingType, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the directory server to be used.
     * https://msdn.microsoft.com/en-us/library/ee201516(v=exchg.80).aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get netMeetingServer() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidDirectory, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the email address of the organizer.
     * https://msdn.microsoft.com/en-us/library/ee203317(v=exchg.80).aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get netMeetingOrganizerAlias() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidOrganizerAlias, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the document to be launched when the user joins the meeting.
     * https://msdn.microsoft.com/en-us/library/ee204395(v=exchg.80).aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get netMeetingDocumentPathName() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidCollaborateDoc, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * The PidLidNetShowUrl property ([MS-OXPROPS] section 2.175) specifies the URL to be launched when the user joins the meeting
     * https://msdn.microsoft.com/en-us/library/ee179451(v=exchg.80).aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get netShowURL() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidNetShowUrl, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Specifies the date and time at which the meeting-related object was sent.
     * https://msdn.microsoft.com/en-us/library/ee237112(v=exchg.80).aspx
     * @readonly
     * @type {Date}
     * @memberof PSTAppointment
     */
    get attendeeCriticalChange() {
        return this.getDateItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAttendeeCriticalChange, OutlookProperties_1.OutlookProperties.PSETID_Meeting));
    }
    /**
     * Indicates that this meeting response is a counter proposal.
     * https://msdn.microsoft.com/en-us/magazine/cc815846.aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get appointmentCounterProposal() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidAppointmentCounterProposal, OutlookProperties_1.OutlookProperties.PSETID_Appointment));
    }
    /**
     * Indicates whether the user did not include any text in the body of the Meeting Response object.
     * https://msdn.microsoft.com/en-us/library/ee159822(v=exchg.80).aspx
     * @readonly
     * @type {boolean}
     * @memberof PSTAppointment
     */
    get isSilent() {
        return this.getBooleanItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidIsSilent, OutlookProperties_1.OutlookProperties.PSETID_Meeting));
    }
    /**
     * Identifies required attendees for the appointment or meeting.
     * https://msdn.microsoft.com/en-us/library/ee160700(v=exchg.80).aspx
     * @readonly
     * @type {string}
     * @memberof PSTAppointment
     */
    get requiredAttendees() {
        return this.getStringItem(this.pstFile.getNameToIdMapItem(OutlookProperties_1.OutlookProperties.PidLidRequiredAttendees, OutlookProperties_1.OutlookProperties.PSETID_Meeting));
    }
    /**
     * Contains the Windows Locale ID of the end-user who created this message.
     * https://msdn.microsoft.com/en-us/library/ee201602(v=exchg.80).aspx
     * @readonly
     * @type {number}
     * @memberof PSTAppointment
     */
    get localeId() {
        return this.getIntItem(OutlookProperties_1.OutlookProperties.PidTagMessageLocaleId);
    }
    /**
     * JSON stringify the object properties.  Large fields (like body) aren't included.
     * @returns {string}
     * @memberof PSTAppointment
     */
    toJSON() {
        const clone = Object.assign({
            messageClass: this.messageClass,
            subject: this.subject,
            importance: this.importance,
            transportMessageHeaders: this.transportMessageHeaders,
            sendAsICAL: this.sendAsICAL,
            busyStatus: this.busyStatus,
            showAsBusy: this.showAsBusy,
            location: this.location,
            startTime: this.startTime,
            endTime: this.endTime,
            duration: this.duration,
            color: this.color,
            subType: this.subType,
            meetingStatus: this.meetingStatus,
            isRecurring: this.isRecurring,
            recurrenceBase: this.recurrenceBase,
            recurrenceType: this.recurrenceType,
            recurrencePattern: this.recurrencePattern,
            recurrenceStructure: this.recurrenceStructure,
            timezone: this.timezone,
            allAttendees: this.allAttendees,
            toAttendees: this.toAttendees,
            ccAttendees: this.ccAttendees,
            appointmentSequence: this.appointmentSequence,
            isOnlineMeeting: this.isOnlineMeeting,
            netMeetingType: this.netMeetingType,
            netMeetingServer: this.netMeetingServer,
            netMeetingOrganizerAlias: this.netMeetingOrganizerAlias,
            netMeetingDocumentPathName: this.netMeetingDocumentPathName,
            attendeeCriticalChange: this.attendeeCriticalChange,
            appointmentCounterProposal: this.appointmentCounterProposal,
            isSilent: this.isSilent,
            requiredAttendees: this.requiredAttendees,
            localeId: this.localeId,
        }, this);
        return clone;
    }
}
exports.PSTAppointment = PSTAppointment;
