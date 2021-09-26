/*
 * Define Result Format
 */

const codeNumber = require('./code')

const Result = {}

Result.commonResult = function (result) {
    return {
        code: codeNumber.success,
        result
    }
}

module.exports = Result
