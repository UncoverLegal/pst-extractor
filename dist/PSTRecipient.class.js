"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSTRecipient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const OutlookProperties_1 = require("./OutlookProperties");
const PSTObject_class_1 = require("./PSTObject.class");
// Class containing recipient information
class PSTRecipient extends PSTObject_class_1.PSTObject {
    /**
     * Creates an instance of PSTRecipient.
     * @param {Map<number, PSTTableItem>} recipientDetails
     * @memberof PSTRecipient
     */
    constructor(pstFile, recipientDetails) {
        super(pstFile, undefined, recipientDetails);
    }
    /**
     * Contains the recipient type for a message recipient.
     * https://msdn.microsoft.com/en-us/library/office/cc839620.aspx
     * @readonly
     * @type {number}
     * @memberof PSTMessage
     */
    get recipientType() {
        return this.getIntItem(OutlookProperties_1.OutlookProperties.PR_RECIPIENT_TYPE);
    }
    /**
     * Contains the messaging user's e-mail address type, such as SMTP.
     * https://msdn.microsoft.com/en-us/library/office/cc815548.aspx
     * @readonly
     * @type {string}
     * @memberof PSTMessage
     */
    get addrType() {
        return this.getStringItem(OutlookProperties_1.OutlookProperties.PR_ADDRTYPE);
    }
    /**
     * Contains the messaging user's e-mail address.
     * https://msdn.microsoft.com/en-us/library/office/cc842372.aspx
     * @readonly
     * @type {string}
     * @memberof PSTMessage
     */
    get emailAddress() {
        return this.getStringItem(OutlookProperties_1.OutlookProperties.PR_EMAIL_ADDRESS);
    }
    /**
     * Specifies a bit field that describes the recipient status.
     * https://msdn.microsoft.com/en-us/library/office/cc815629.aspx
     * @readonly
     * @type {number}
     * @memberof PSTRecipient
     */
    get recipientFlags() {
        return this.getIntItem(OutlookProperties_1.OutlookProperties.PR_RECIPIENT_FLAGS);
    }
    /**
     * Specifies the location of the current recipient in the recipient table.
     * https://msdn.microsoft.com/en-us/library/ee201359(v=exchg.80).aspx
     * @readonly
     * @type {number}
     * @memberof PSTRecipient
     */
    get recipientOrder() {
        return this.getIntItem(OutlookProperties_1.OutlookProperties.PidTagRecipientOrder);
    }
    /**
     * Contains the SMTP address for the address book object.
     * https://msdn.microsoft.com/en-us/library/office/cc842421.aspx
     * @readonly
     * @type {string}
     * @memberof PSTRecipient
     */
    get smtpAddress() {
        // If the recipient address type is SMTP, we can simply return the recipient address.
        const addressType = this.addrType;
        if (addressType != null && addressType.toLowerCase() === 'smtp') {
            const addr = this.emailAddress;
            if (addr != null && addr.length != 0) {
                return addr;
            }
        }
        // Otherwise, we have to hope the SMTP address is present as the PidTagPrimarySmtpAddress property.
        return this.getStringItem(OutlookProperties_1.OutlookProperties.PR_SMTP_ADDRESS);
    }
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTRecipient
     */
    toJSON() {
        const clone = Object.assign({
            smtpAddress: this.smtpAddress,
            recipientType: this.recipientType,
            addrType: this.addrType,
            emailAddress: this.emailAddress,
            recipientFlags: this.recipientFlags,
            recipientOrder: this.recipientOrder,
        }, this);
        return clone;
    }
}
exports.PSTRecipient = PSTRecipient;
