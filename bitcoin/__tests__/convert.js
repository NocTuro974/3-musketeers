'use strict';

const convert = require('..');
const Big = require('big.js');

test('should default to returning a Number', () => {
  //convert(2, 'BTC', 'BTC');

});

test('should return a Number', () => {
  //convert(2, 'BTC', 'BTC', 'Number');
  expect(convert(2, 'BTC', 'BTC', 'Number')).toEqual(2);
});

test('should return a Big number', () => {
  //convert(2, 'BTC', 'BTC', 'Big');
  expect(convert(2, 'BTC', 'BTC', 'Big')).toBeInstanceOf(Big);
});

test('should return a String', () => {
  //convert(2100, 'mBTC', 'BTC', 'String');
  expect(convert(2100, 'mBTC', 'BTC', 'String')).toMatch(/2.1/);
});

test('should convert an integer', () => {
  //convert(123456789012345, 'Satoshi', 'BTC', 'Number');
  expect(convert(123456789012345, 'Satoshi', 'BTC', 'Number')).toBeCloseTo(1234567.89012345, 10);
});

test('should convert a number', () => {
  //convert(1234567.89012345, 'BTC', 'Satoshi', 'Number');
  expect(convert(1234567.89012345, 'BTC', 'Satoshi', 'Number')).toBe(123456789012345);
});

test('should convert a string', () => {
  //convert('2', 'BTC', 'BTC', 'Number');
  expect(convert('2', 'BTC', 'BTC', 'Number')).toBe(2);

});

test('should convert a Big number', () => {
  //convert(new Big(2), 'BTC', 'BTC', 'Number');
  expect(convert(new Big(2), 'BTC', 'BTC', 'Number')).toEqual(2);
});

test('should convert a NaN to a Number', () => {
  //convert(NaN, 'BTC', 'BTC', 'Number');
  expect(convert(NaN, 'BTC', 'BTC', 'Number')).toBe(NaN);
  //convert(NaN, 'BTC', 'mBTC', 'Number');
  expect(convert(NaN, 'BTC', 'mBTC', 'Number')).toBe(NaN);
});

test('should convert a NaN to a String', () => {
  //convert(NaN, 'BTC', 'BTC', 'String');
  expect(convert(NaN, 'BTC', 'BTC', 'String')).toMatch('NaN');
  //convert(NaN, 'BTC', 'mBTC', 'String');
  expect(convert(NaN, 'BTC', 'mBTC', 'String')).toMatch('NaN');
});

test('should not convert a NaN to a Big', () => {
  //convert(NaN, 'BTC', 'BTC', 'Big');
});

test('should handle rounding errors', () => {
  //convert(4.6, 'Satoshi', 'BTC', 'Number');
  expect(convert(4.6, 'Satoshi', 'BTC', 'Number')).toEqual(0.000000046);
  //convert(0.000000046, 'BTC', 'Satoshi', 'Number');
  expect(convert(0.000000046, 'BTC', 'Satoshi', 'Number')).toBe(4.6);
});

test('should throw when untest is undefined', () => {
  //convert(new Big(2), 'x', 'BTC', 'Number');
  expect(() => {
    convert(new Big(2), 'x', 'BTC', 'Number');
  }).toThrow();
  //convert(new Big(2), 'BTC', 'x', 'Number');
  expect(() => {
    convert(new Big(2), 'BTC', 'x', 'Number');
  }).toThrow();
  //convert(NaN, 'x', 'BTC', 'Number');
  expect(() => {
    convert(NaN, 'x', 'BTC', 'Number');
  }).toThrow();
  //convert(NaN, 'BTC', 'x', 'Number');
  expect(() => {
    convert(NaN, 'BTC', 'x', 'Number');
  }).toThrow();
});

test('should throw when representaion is undefined', () => {
  //convert(2, 'BTC', 'mBTC', 'x');
  expect(() => {
    convert(2, 'BTC', 'mBTC', 'x');
  }).toThrow();
  //convert(NaN, 'BTC', 'mBTC', 'x');
  expect(() => {
    convert(NaN, 'BTC', 'mBTC', 'x');
  }).toThrow();
});

test('should allow untest aliases', () => {
  //convert(4.6, 'Satoshi', 'sat');
  expect(convert(4.6, 'Satoshi', 'sat')).toBe(4.6);
  //convert(4.6, 'μBTC', 'btest');
  expect(() => {
    convert(4.6, 'μBTC', 'btest');
  }).toThrow();
});

test('should return list of available conversions', () => {
  expect(convert.units()).toContain("BTC", "mBTC", "µBTC", "bit", "Satoshi", "sat");
});

test('should add an unit for conversion', () => {
  convert.addUnit('finney', 0.00006);
  expect(convert.units()).toContain('finney');
})

test('should throw if trying to add an already-existing unit with a different factor', () => {
  expect(() => {
    convert.addUnit('BTC', 0.1);
  }).toThrow();
})

test('should remove an user-added unit', () => {
  convert.removeUnit('xBTC');
  expect(convert.units()).not.toContain('xBTC');
})

test('should throw an error if trying to remove a permanent unit', () => {
  expect(() => {
    convert.removeUnit('BTC');
  }).toThrow();
})
