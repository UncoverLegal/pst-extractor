"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrencePattern = exports.NthOccurrence = exports.EndType = exports.PatternType = exports.RecurFrequency = void 0;
const OFFSETS = {
    RecurFrequency: 4,
    PatternType: 6,
    FirstDateTime: 10,
    Period: 14,
    PatternTypeSpecific: 22,
    EndType: 22,
    OccurrenceCount: 26,
    FirstDOW: 30,
    StartDate: -8,
    EndDate: -4,
};
var RecurFrequency;
(function (RecurFrequency) {
    RecurFrequency[RecurFrequency["Daily"] = 8202] = "Daily";
    RecurFrequency[RecurFrequency["Weekly"] = 8203] = "Weekly";
    RecurFrequency[RecurFrequency["Monthly"] = 8204] = "Monthly";
    RecurFrequency[RecurFrequency["Yearly"] = 8205] = "Yearly";
})(RecurFrequency = exports.RecurFrequency || (exports.RecurFrequency = {}));
var PatternType;
(function (PatternType) {
    PatternType[PatternType["Day"] = 0] = "Day";
    PatternType[PatternType["Week"] = 1] = "Week";
    PatternType[PatternType["Month"] = 2] = "Month";
    PatternType[PatternType["MonthEnd"] = 4] = "MonthEnd";
    PatternType[PatternType["MonthNth"] = 3] = "MonthNth";
})(PatternType = exports.PatternType || (exports.PatternType = {}));
var EndType;
(function (EndType) {
    EndType[EndType["AfterDate"] = 8225] = "AfterDate";
    EndType[EndType["AfterNOccurrences"] = 8226] = "AfterNOccurrences";
    EndType[EndType["NeverEnd"] = 8227] = "NeverEnd";
})(EndType = exports.EndType || (exports.EndType = {}));
var NthOccurrence;
(function (NthOccurrence) {
    NthOccurrence[NthOccurrence["First"] = 1] = "First";
    NthOccurrence[NthOccurrence["Second"] = 2] = "Second";
    NthOccurrence[NthOccurrence["Third"] = 3] = "Third";
    NthOccurrence[NthOccurrence["Fourth"] = 4] = "Fourth";
    NthOccurrence[NthOccurrence["Last"] = 5] = "Last";
})(NthOccurrence = exports.NthOccurrence || (exports.NthOccurrence = {}));
class RecurrencePattern {
    constructor(buffer) {
        this.buffer = buffer;
        const bufferEnd = buffer.length;
        let patternTypeOffset = 0;
        this.recurFrequency = this.readInt(OFFSETS.RecurFrequency, 1);
        this.patternType = this.readInt(OFFSETS.PatternType, 1);
        this.firstDateTime = winToJsDate(this.readInt(OFFSETS.FirstDateTime, 2));
        this.period = this.readInt(OFFSETS.Period, 2);
        this.patternTypeSpecific = this.readPatternTypeSpecific(this.patternType);
        switch (this.patternType) {
            case PatternType.Week:
            case PatternType.Month:
            case PatternType.MonthEnd:
                patternTypeOffset = 4;
                break;
            case PatternType.MonthNth:
                patternTypeOffset = 8;
                break;
        }
        this.endType = this.readInt(OFFSETS.EndType + patternTypeOffset, 2);
        this.occurrenceCount = this.readInt(OFFSETS.OccurrenceCount + patternTypeOffset, 2);
        this.firstDOW = this.readInt(OFFSETS.FirstDOW + patternTypeOffset, 2);
        this.startDate = winToJsDate(this.readInt(bufferEnd + OFFSETS.StartDate, 2));
        this.endDate = winToJsDate(this.readInt(bufferEnd + OFFSETS.EndDate, 2));
    }
    toJSON() {
        return {
            recurFrequency: RecurFrequency[this.recurFrequency],
            patternType: PatternType[this.patternType],
            firstDateTime: this.firstDateTime,
            period: this.period,
            patternTypeSpecific: this.patternTypeSpecific,
            endType: EndType[this.endType],
            occurrenceCount: this.occurrenceCount,
            firstDOW: this.firstDOW,
            startDate: this.startDate,
            endDate: this.endDate,
        };
    }
    readInt(offset, size) {
        switch (size) {
            case 1:
                return this.buffer.readInt16LE(offset);
            case 2:
                return this.buffer.readInt32LE(offset);
        }
    }
    readPatternTypeSpecific(type) {
        switch (type) {
            case PatternType.Day:
                return null;
            case PatternType.Week:
                return readWeekByte(this.buffer.readInt8(OFFSETS.PatternTypeSpecific));
            case PatternType.Month:
            case PatternType.MonthEnd:
                return this.readInt(OFFSETS.PatternTypeSpecific, 2);
            case PatternType.MonthNth:
                return {
                    weekdays: readWeekByte(this.buffer.readInt8(OFFSETS.PatternTypeSpecific)),
                    nth: this.readInt(OFFSETS.PatternTypeSpecific + 4, 2),
                };
        }
    }
}
exports.RecurrencePattern = RecurrencePattern;
function winToJsDate(dateInt) {
    return new Date(dateInt * 60 * 1000 - 1.16444736e13); // subtract milliseconds between 1601-01-01 and 1970-01-01
}
function readWeekByte(byte) {
    const weekArr = [];
    for (let i = 0; i < 7; ++i) {
        weekArr.push(Boolean(byte & (1 << i)));
    }
    return weekArr;
}
