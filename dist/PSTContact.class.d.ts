import { DescriptorIndexNode } from './DescriptorIndexNode.class';
import { PSTDescriptorItem } from './PSTDescriptorItem.class';
import { PSTFile } from './PSTFile.class';
import { PSTMessage } from './PSTMessage.class';
import { PSTTableBC } from './PSTTableBC.class';
export declare class PSTContact extends PSTMessage {
    constructor(pstFile: PSTFile, descriptorIndexNode: DescriptorIndexNode, table?: PSTTableBC, localDescriptorItems?: Map<number, PSTDescriptorItem>);
    /**
     * Contains the recipient's account name.
     * https://msdn.microsoft.com/en-us/library/office/cc842401.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get account(): string;
    /**
     * Contains a telephone number that the message recipient can use to reach the sender.
     * https://msdn.microsoft.com/en-us/library/office/cc839943.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get callbackTelephoneNumber(): string;
    /**
     * Contains a generational abbreviation that follows the full name of the recipient.
     * https://msdn.microsoft.com/en-us/library/office/cc842136.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get generation(): string;
    /**
     * Contains the first or given name of the recipient.
     * https://msdn.microsoft.com/en-us/library/office/cc815351.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get givenName(): string;
    /**
     * Contains a government identifier for the recipient.
     * https://msdn.microsoft.com/en-us/library/office/cc815890.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get governmentIdNumber(): string;
    /**
     * Contains the primary telephone number of the recipient's place of business.
     * https://msdn.microsoft.com/en-us/library/office/cc839937.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get businessTelephoneNumber(): string;
    /**
     * Contains the primary telephone number of the recipient's home.
     * https://msdn.microsoft.com/en-us/library/office/cc815389.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get homeTelephoneNumber(): string;
    /**
     * Contains the initials for parts of the full name of the recipient.
     * https://msdn.microsoft.com/en-us/library/office/cc839843.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get initials(): string;
    /**
     * Contains a keyword that identifies the recipient to the recipient's system administrator.
     * https://msdn.microsoft.com/en-us/library/office/cc842250.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get keyword(): string;
    /**
     * Contains a value that indicates the language in which the messaging user is writing messages.
     * https://msdn.microsoft.com/en-us/library/office/cc839724.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get language(): string;
    /**
     * Contains the location of the recipient in a format that is useful to the recipient's organization.
     * https://msdn.microsoft.com/en-us/library/office/cc815567.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get location(): string;
    /**
     * Contains the common name of the message handling system.
     * https://msdn.microsoft.com/en-us/library/office/cc842474.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get mhsCommonName(): string;
    /**
     * Contains an organizational ID number for the contact, such as an employee ID number.
     * https://msdn.microsoft.com/en-us/library/office/cc765672.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get organizationalIdNumber(): string;
    /**
     * Contains the last or surname of the recipient.
     * https://msdn.microsoft.com/en-us/library/office/cc765704.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get surname(): string;
    /**
     * Contains the original display name for an entry copied from an address book to a personal address book or other writable address book.
     * https://msdn.microsoft.com/en-us/library/office/cc765709.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get originalDisplayName(): string;
    /**
     * Contains the recipient's postal address.
     * https://msdn.microsoft.com/en-us/library/office/cc842549.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get postalAddress(): string;
    /**
     * Contains the recipient's company name.
     * https://msdn.microsoft.com/en-us/library/office/cc842192.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get companyName(): string;
    /**
     * Contains the recipient's job title.
     * https://msdn.microsoft.com/en-us/library/office/cc815831.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get title(): string;
    /**
     * Contains a name for the department in which the recipient works.
     * https://msdn.microsoft.com/en-us/library/office/cc839825.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get departmentName(): string;
    /**
     * Contains the recipient's office location.
     * https://msdn.microsoft.com/en-us/library/office/cc842269.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get officeLocation(): string;
    /**
     * Contains the recipient's primary telephone number.
     * https://msdn.microsoft.com/en-us/library/office/cc839969.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get primaryTelephoneNumber(): string;
    /**
     * Contains a secondary telephone number at the recipient's place of business.
     * https://msdn.microsoft.com/en-us/library/office/cc841990.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get business2TelephoneNumber(): string;
    /**
     * Contains the recipient's cellular telephone number.
     * https://msdn.microsoft.com/en-us/library/office/cc839798.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get mobileTelephoneNumber(): string;
    /**
     * Contains the recipient's radio telephone number.
     * https://msdn.microsoft.com/en-us/library/office/cc839806.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get radioTelephoneNumber(): string;
    /**
     * Contains the recipient's car telephone number.
     * https://msdn.microsoft.com/en-us/library/office/cc815394.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get carTelephoneNumber(): string;
    /**
     * Contains an alternate telephone number for the recipient.
     * https://msdn.microsoft.com/en-us/library/office/cc839561.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get otherTelephoneNumber(): string;
    /**
     * Contains a recipient's display name in a secure form that cannot be changed.
     * https://msdn.microsoft.com/en-us/library/office/cc815723.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get transmittableDisplayName(): string;
    /**
     * Contains the recipient's pager telephone number.
     * https://msdn.microsoft.com/en-us/library/office/cc765824.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get pagerTelephoneNumber(): string;
    /**
     * Contains the telephone number of the recipient's primary fax machine.
     * https://msdn.microsoft.com/en-us/library/office/cc815713.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get primaryFaxNumber(): string;
    /**
     * Contains the telephone number of the recipient's business fax machine.
     * https://msdn.microsoft.com/en-us/library/office/cc765799.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get businessFaxNumber(): string;
    /**
     * Contains the telephone number of the recipient's home fax machine.
     * https://msdn.microsoft.com/en-us/library/office/cc842109.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get homeFaxNumber(): string;
    /**
     * Contains the name of the recipient's country/region.
     * https://msdn.microsoft.com/en-us/library/office/cc842494.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get businessAddressCountry(): string;
    /**
     * Contains the name of the recipient's locality, such as the town or city.
     * https://msdn.microsoft.com/en-us/library/office/cc815711.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get businessAddressCity(): string;
    /**
     * Contains the name of the recipient's state or province.
     * https://msdn.microsoft.com/en-us/library/office/cc839544.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get businessAddressStateOrProvince(): string;
    /**
     * Contains the recipient's street address.
     * https://msdn.microsoft.com/en-us/library/office/cc765810.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get businessAddressStreet(): string;
    /**
     * Contains the postal code for the recipient's postal address.
     * https://msdn.microsoft.com/en-us/library/office/cc839851.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get businessPostalCode(): string;
    /**
     * Contains the number or identifier of the recipient's post office box.
     * https://msdn.microsoft.com/en-us/library/office/cc815522.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get businessPoBox(): string;
    /**
     * Contains the recipient's telex number.
     * https://msdn.microsoft.com/en-us/library/office/cc765894.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get telexNumber(): string;
    /**
     * Contains the recipient's ISDN-capable telephone number.
     * https://msdn.microsoft.com/en-us/library/office/cc765863.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get isdnNumber(): string;
    /**
     * Contains the telephone number of the recipient's administrative assistant.
     * https://msdn.microsoft.com/en-us/library/office/cc840012.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get assistantTelephoneNumber(): string;
    /**
     * Contains a secondary telephone number at the recipient's home.
     * https://msdn.microsoft.com/en-us/library/office/cc815540.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get home2TelephoneNumber(): string;
    /**
     * Contains the name of the recipient's administrative assistant.
     * https://msdn.microsoft.com/en-us/library/office/cc815319.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get assistant(): string;
    /**
     * Contains the names of the hobbies of the messaging user.
     * https://msdn.microsoft.com/en-us/library/office/cc815391.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get hobbies(): string;
    /**
     * Contains the middle name of a contact.
     * https://msdn.microsoft.com/en-us/library/office/cc815329.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get middleName(): string;
    /**
     * Contains the display name prefix (such as Miss, Mr., Mrs.) for the messaging user.
     * https://msdn.microsoft.com/en-us/library/office/cc765538.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get displayNamePrefix(): string;
    /**
     * Contains the profession of the user.
     * https://msdn.microsoft.com/en-us/library/office/cc765792.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get profession(): string;
    /**
     * Contains the name of the mail user's referral.
     * https://msdn.microsoft.com/en-us/library/office/cc765803.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get preferredByName(): string;
    /**
     * Contains the user’s spouse name.
     * https://msdn.microsoft.com/en-us/library/office/cc765832.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get spouseName(): string;
    /**
     * Contains the name of the network used to transmit the message.
     * https://msdn.microsoft.com/en-us/library/office/cc839633.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get computerNetworkName(): string;
    /**
     * Contains the contact’s customer ID number.
     * https://msdn.microsoft.com/en-us/library/office/cc842178.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get customerId(): string;
    /**
     * Contains the telephone number for the contact’s text telephone (TTY) or telecommunication device for the deaf (TDD).
     * https://msdn.microsoft.com/en-us/library/office/cc765580.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get ttytddPhoneNumber(): string;
    /**
     * Contains the contact’s File Transfer Protocol (FTP) URL. FTP is a protocol that is used to transfer data, as specified in [RFC959].
     * https://msdn.microsoft.com/en-us/library/office/cc839830.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get ftpSite(): string;
    /**
     * Contains the name of the recipient's manager.
     * https://msdn.microsoft.com/en-us/library/office/cc842009.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get managerName(): string;
    /**
     * Contains the nickname of the contact.
     * https://msdn.microsoft.com/en-us/library/office/cc765603.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get nickname(): string;
    /**
     * Contains the URL of a user's personal home page.
     * https://msdn.microsoft.com/en-us/library/office/cc765751.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get personalHomePage(): string;
    /**
     * Contains the URL of the home page for the business.
     * https://msdn.microsoft.com/en-us/library/office/cc842385.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get businessHomePage(): string;
    /**
     * Get the note associated with the contact.
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get note(): string;
    /**
     * Get a named string item from the map
     * @param {number} key
     * @returns {string}
     * @memberof PSTContact
     */
    getNamedStringItem(key: number): string;
    /**
     * Contains the main telephone number for a company
     * https://msdn.microsoft.com/en-us/library/office/cc839651.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get companyMainPhoneNumber(): string;
    /**
     * Contains a list of names of children
     * https://msdn.microsoft.com/en-us/library/office/cc839533.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get childrensNames(): string;
    /**
     * Contains the city for the recipient's home address.
     * https://msdn.microsoft.com/en-us/library/office/cc815582.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get homeAddressCity(): string;
    /**
     * Contains the county in a contact's address.
     * https://msdn.microsoft.com/en-us/library/office/cc842548.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get homeAddressCountry(): string;
    /**
     * Contains the postal code for the user's home address.
     * https://msdn.microsoft.com/en-us/library/office/cc815880.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get homeAddressPostalCode(): string;
    /**
     * Contains the state or province portion of a user's address.
     * https://msdn.microsoft.com/en-us/library/office/cc839958.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get homeAddressStateOrProvince(): string;
    /**
     * Contains the street portion of a user's address.
     * https://msdn.microsoft.com/en-us/library/office/cc841997.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get homeAddressStreet(): string;
    /**
     * Contains the post office box information for a user's address.
     * https://msdn.microsoft.com/en-us/library/office/cc842440.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get homeAddressPostOfficeBox(): string;
    /**
     * Contains the name of the mail user's other locality, such as the town or city.
     * https://msdn.microsoft.com/en-us/library/office/cc765881.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get otherAddressCity(): string;
    /**
     * Contains the mail user's other country/region.
     * https://msdn.microsoft.com/en-us/library/office/cc765814.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get otherAddressCountry(): string;
    /**
     * Contains the postal code for the mail user's other postal address.
     * https://msdn.microsoft.com/en-us/library/office/cc842261.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get otherAddressPostalCode(): string;
    /**
     * Contains the name of state or province used in the other address.
     * https://msdn.microsoft.com/en-us/library/office/cc815782.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get otherAddressStateOrProvince(): string;
    /**
     * Contains the mail user's other street address.
     * https://msdn.microsoft.com/en-us/library/office/cc839546.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get otherAddressStreet(): string;
    /**
     * Contains the post office box for a contact's other address.
     * https://msdn.microsoft.com/en-us/library/office/cc842396.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get otherAddressPostOfficeBox(): string;
    /**
     * Specifies the name under which the contact is filed when displaying a list of contacts.
     * https://msdn.microsoft.com/en-us/library/office/cc842002.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get fileUnder(): string;
    /**
     * Specifies the complete address of the contact’s home address.
     * https://msdn.microsoft.com/en-us/library/office/cc839539.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get homeAddress(): string;
    /**
     * Specifies the contact's complete work address.
     * https://msdn.microsoft.com/en-us/library/office/cc815905.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get workAddress(): string;
    /**
     * Specifies the complete address of the contact’s other address.
     * https://msdn.microsoft.com/en-us/library/office/cc815383.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get otherAddress(): string;
    /**
     * Specifies which physical address is the contact’s mailing address.
     * https://msdn.microsoft.com/en-us/library/office/cc815430.aspx
     * @readonly
     * @type {number}
     * @memberof PSTContact
     */
    get postalAddressId(): number;
    /**
     * Specifies the contact’s business Web page URL.
     * https://msdn.microsoft.com/en-us/library/office/cc842001.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get html(): string;
    /**
     * Specifies the street portion of the contact's work mailing address.
     * https://msdn.microsoft.com/en-us/library/office/cc815537.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get workAddressStreet(): string;
    /**
     * Specifies the city or locality portion of the contact's work address.
     * https://msdn.microsoft.com/en-us/library/office/cc765923.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get workAddressCity(): string;
    /**
     * Specifies the state or province portion of the contact's work mailing address.
     * https://msdn.microsoft.com/en-us/library/office/cc842152.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get workAddressState(): string;
    /**
     * Specifies the postal code (ZIP code) portion of the contact's work address.
     * https://msdn.microsoft.com/en-us/library/office/cc842066.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get workAddressPostalCode(): string;
    /**
     * Specifies the country or region portion of the contact's work address.
     * https://msdn.microsoft.com/en-us/library/office/cc765698.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get workAddressCountry(): string;
    /**
     * Specifies the post office box portion of the contact's work.
     * https://msdn.microsoft.com/en-us/library/office/cc815563.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get workAddressPostOfficeBox(): string;
    /**
     * Specifies the contact’s instant messaging address.
     * https://msdn.microsoft.com/en-us/library/office/cc815607.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get instantMessagingAddress(): string;
    /**
     * Specifies the user-readable display name for the first e-mail address.
     * https://msdn.microsoft.com/en-us/library/office/cc815460.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email1DisplayName(): string;
    /**
     * Specifies the address type of the first e-mail address.
     * https://msdn.microsoft.com/en-us/library/office/cc815570.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email1AddressType(): string;
    /**
     * Specifies the first e-mail address of the contact.
     * https://msdn.microsoft.com/en-us/library/office/cc842050.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email1EmailAddress(): string;
    /**
     * Specifies the first display name that corresponds to the e-mail address that is specified for the contact.
     * https://msdn.microsoft.com/en-us/library/office/cc815564.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email1OriginalDisplayName(): string;
    /**
     * Specifies the user-readable display name for the second e-mail address.
     * https://msdn.microsoft.com/en-us/library/office/cc839675.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email2DisplayName(): string;
    /**
     * Specifies the address type of the second e-mail address.
     * https://msdn.microsoft.com/en-us/library/office/cc815361.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email2AddressType(): string;
    /**
     * Specifies the second e-mail address of the contact.
     * https://msdn.microsoft.com/en-us/library/office/cc842205.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email2EmailAddress(): string;
    /**
     * Specifies the second display name that corresponds to the e-mail address specified for the contact.
     * https://msdn.microsoft.com/en-us/library/office/cc765618.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email2OriginalDisplayName(): string;
    /**
     * Specifies the user-readable display name for the third e-mail address.
     * https://msdn.microsoft.com/en-us/library/office/cc815669.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email3DisplayName(): string;
    /**
     * Specifies the address type of the third e-mail address.
     * https://msdn.microsoft.com/en-us/library/office/cc842438.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email3AddressType(): string;
    /**
     * Specifies the third e-mail address of the contact.
     * https://msdn.microsoft.com/en-us/library/office/cc815504.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email3EmailAddress(): string;
    /**
     * Specifies the third display name that corresponds to the e-mail address that is specified for the contact.
     * https://msdn.microsoft.com/en-us/library/office/cc815833.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get email3OriginalDisplayName(): string;
    /**
     * Specifies the address type for the business fax address for a contact.
     * https://msdn.microsoft.com/en-us/library/office/cc842026.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get fax1AddressType(): string;
    /**
     * Specifies the e-mail address of the contact’s business fax.
     * https://msdn.microsoft.com/en-us/library/office/cc765813.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get fax1EmailAddress(): string;
    /**
     * Specifies the original display name of the contact’s business fax address.
     * https://msdn.microsoft.com/en-us/library/office/cc765694.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get fax1OriginalDisplayName(): string;
    /**
     * Specifies the address type for the contact’s home fax address.
     * https://msdn.microsoft.com/en-us/library/office/cc839741.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get fax2AddressType(): string;
    /**
     * Specifies the e-mail address of the contact’s home fax address.
     * https://msdn.microsoft.com/en-us/library/office/cc765668.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get fax2EmailAddress(): string;
    /**
     * Specifies the original display name of the contact’s home fax address.
     * https://msdn.microsoft.com/en-us/library/office/cc842101.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get fax2OriginalDisplayName(): string;
    /**
     * Specifies the address type for the other contact’s fax address.
     * https://msdn.microsoft.com/en-us/library/office/cc839752.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get fax3AddressType(): string;
    /**
     * Specifies the email address of the contact’s other fax address.
     * https://msdn.microsoft.com/en-us/library/office/cc842217.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get fax3EmailAddress(): string;
    /**
     * Specifies the original display name of the contact’s other fax address.
     * https://msdn.microsoft.com/en-us/library/office/cc765682.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get fax3OriginalDisplayName(): string;
    /**
     * Specifies a URL path from which a client can retrieve free/busy information for the contact as an iCal file, as specified in [MS-OXCICAL].
     * https://msdn.microsoft.com/en-us/library/office/cc765766.aspx
     * @readonly
     * @type {string}
     * @memberof PSTContact
     */
    get freeBusyLocation(): string;
    /**
     * Contains the birthday of the contact.
     * https://msdn.microsoft.com/en-us/library/office/cc842301.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTContact
     */
    get birthday(): Date | null;
    /**
     * Contains the date of a user's wedding anniversary.
     * https://msdn.microsoft.com/en-us/library/office/cc842132.aspx
     * @readonly
     * @type {Date}
     * @memberof PSTContact
     */
    get anniversary(): Date | null;
    /**
     * JSON stringify the object properties.
     * @returns {string}
     * @memberof PSTContact
     */
    toJSON(): any;
}
