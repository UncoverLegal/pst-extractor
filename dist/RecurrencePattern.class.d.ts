/// <reference types="node" />
export declare enum RecurFrequency {
    Daily = 8202,
    Weekly = 8203,
    Monthly = 8204,
    Yearly = 8205
}
export declare enum PatternType {
    Day = 0,
    Week = 1,
    Month = 2,
    MonthEnd = 4,
    MonthNth = 3
}
export declare enum EndType {
    AfterDate = 8225,
    AfterNOccurrences = 8226,
    NeverEnd = 8227
}
export declare enum NthOccurrence {
    First = 1,
    Second = 2,
    Third = 3,
    Fourth = 4,
    Last = 5
}
export type WeekSpecific = boolean[] & {
    length: 7;
};
export type MonthNthSpecific = {
    weekdays: WeekSpecific;
    nth: NthOccurrence;
};
export declare class RecurrencePattern {
    private buffer;
    recurFrequency: RecurFrequency;
    patternType: PatternType;
    firstDateTime: Date;
    period: number;
    patternTypeSpecific: number | WeekSpecific | MonthNthSpecific | null;
    endType: EndType;
    occurrenceCount: number;
    firstDOW: number;
    startDate: Date;
    endDate: Date;
    constructor(buffer: Buffer);
    toJSON(): any;
    private readInt;
    private readPatternTypeSpecific;
}
