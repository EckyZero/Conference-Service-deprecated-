'use strict';

const _expect = require('chai').expect;
const DateParser = require('../../domains/shared/dateParser');

// TODO: More unit tests in general

describe('DateParser', function () {
    describe('monthStringToInt', function() {
        it('should find and and convert every valid month', function () {

            // create mock validator since dateParser uses this to validate values
            const opts = {
                objectValidator: {
                    isString: (val) => true
                }
            };

            const _dateParser = new DateParser(opts);

            _expect(_dateParser.monthStringToInt('January')).to.eq(1);
            _expect(_dateParser.monthStringToInt('February')).to.eq(2);
            _expect(_dateParser.monthStringToInt('March')).to.eq(3);
            _expect(_dateParser.monthStringToInt('April')).to.eq(4);
            _expect(_dateParser.monthStringToInt('May')).to.eq(5);
            _expect(_dateParser.monthStringToInt('June')).to.eq(6);
            _expect(_dateParser.monthStringToInt('July')).to.eq(7);
            _expect(_dateParser.monthStringToInt('August')).to.eq(8);
            _expect(_dateParser.monthStringToInt('September')).to.eq(9);
            _expect(_dateParser.monthStringToInt('October')).to.eq(10);
            _expect(_dateParser.monthStringToInt('November')).to.eq(11);
            _expect(_dateParser.monthStringToInt('December')).to.eq(12);
        });
        it('should find values for valid month 3 char abbreviations', function () {    // create mock validator since dateParser uses this to validate values
            const opts = {
                objectValidator: {
                    isString: (val) => true
                }
            };

            const _dateParser = new DateParser(opts);
            
            _expect(_dateParser.monthStringToInt('Jan')).to.eq(1);
            _expect(_dateParser.monthStringToInt('Feb')).to.eq(2);
            _expect(_dateParser.monthStringToInt('Mar')).to.eq(3);
            _expect(_dateParser.monthStringToInt('Apr')).to.eq(4);
            _expect(_dateParser.monthStringToInt('May')).to.eq(5);
            _expect(_dateParser.monthStringToInt('Jun')).to.eq(6);
            _expect(_dateParser.monthStringToInt('Jul')).to.eq(7);
            _expect(_dateParser.monthStringToInt('Aug')).to.eq(8);
            _expect(_dateParser.monthStringToInt('Sep')).to.eq(9);
            _expect(_dateParser.monthStringToInt('Oct')).to.eq(10);
            _expect(_dateParser.monthStringToInt('Nov')).to.eq(11);
            _expect(_dateParser.monthStringToInt('Dec')).to.eq(12);
        });
        it('should find regardless of case', function () {
            
            // create mock validator since dateParser uses this to validate values
            const opts = {
                objectValidator: {
                    isString: (val) => true
                }
            };

            const _dateParser = new DateParser(opts);
            
            _expect(_dateParser.monthStringToInt('janUary')).to.eq(1);
        });
        it('should not find values for invalid months', function () {
            
            // create mock validator since dateParser uses this to validate values
            const opts = {
                objectValidator: {
                    isString: (val) => true
                }
            };

            const _dateParser = new DateParser(opts);
            
            _expect(_dateParser.monthStringToInt('foo')).to.eq(null);
        });
        it('should not find values for null or undefined', function () {    // create mock validator since dateParser uses this to validate values
            const opts = {
                objectValidator: {
                    isString: (val) => false
                }
            };

            const _dateParser = new DateParser(opts);
            
            _expect(_dateParser.monthStringToInt(null)).to.eq(null);
            _expect(_dateParser.monthStringToInt(undefined)).to.eq(null);
        });
    });
    describe('intMonthToYear', function() {
        it('should find and and convert every valid month', function () {
            const opts = {
                objectValidator: {
                    isNumber: (val) => true
                }
            };

            const _dateParser = new DateParser(opts);

            _expect(_dateParser.intMonthToString(1)).to.eq("january");
            _expect(_dateParser.intMonthToString(2)).to.eq("february");
            _expect(_dateParser.intMonthToString(3)).to.eq("march");
            _expect(_dateParser.intMonthToString(4)).to.eq("april");
            _expect(_dateParser.intMonthToString(5)).to.eq("may");
            _expect(_dateParser.intMonthToString(6)).to.eq("june");
            _expect(_dateParser.intMonthToString(7)).to.eq("july");
            _expect(_dateParser.intMonthToString(8)).to.eq("august");
            _expect(_dateParser.intMonthToString(9)).to.eq("september");
            _expect(_dateParser.intMonthToString(10)).to.eq("october");
            _expect(_dateParser.intMonthToString(11)).to.eq("november");
            _expect(_dateParser.intMonthToString(12)).to.eq("december");
        });
        it('should ..', function () {
            const opts = {
                objectValidator: {
                    isNumber: (val) => true
                }
            };

            const _dateParser = new DateParser(opts);

            _expect(_dateParser.intMonthToString(0)).to.eq(null);
            _expect(_dateParser.intMonthToString(13)).to.eq(null);
        });
    });
});