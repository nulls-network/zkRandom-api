/*
 * Define Result Format
 */

const CodeNumber = require('./code')

const Result = {}

Result.SUCCESS = function (result) {
    return {
        code: CodeNumber.SUCCESS,
        result
    }
}

Result.ERROR = function (error) {
    return {
        code: CodeNumber.ERROR,
        result: error
    }
}

module.exports = Result
