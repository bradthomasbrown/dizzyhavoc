// import { Cache } from './mod.ts'
// import { LogLevel } from '../types/mod.ts'

// /**
//  * A small function that logs a timestamp (in the style of geth)
//  */
// function logstamp() {
//     const date = new Date()
//     const month = String(date.getMonth()).padStart(2, '0')
//     const day = String(date.getDate()).padStart(2, '0')
//     const hour = String(date.getHours()).padStart(2, '0')
//     const minute = String(date.getMinutes()).padStart(2, '0')
//     const second = String(date.getSeconds()).padStart(2, '0')
//     const mills = String(date.getMilliseconds()).padStart(3, '0')
//     return `[${month}-${day}|${hour}:${minute}:${second}.${mills}]`
// }

// type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

// /**
//  * A class to help with logging
//  */
// export class Logger {

//     /**
//      * Wraps a promise, logs a message on failure or on success,
//      * returns null on failure
//      * @param failureMessage The message to log as an error
//      * if the promise rejects
//      * @param successMessage The message to log on success
//      * if the promise resolves
//      */
//     static async wrap<
//         T extends unknown
//     >(
//         promise:Promise<T>,
//         failureMessage:string,
//         level:LogLevel, successMessage:string
//     ):Promise<T|null> {

//         return await promise
//             .then(async value => {
//                 // info, debug, or detail?
//                 if (await Cache.get('level') >= level)
//                     switch (LogLevel[level]) {
//                         case 'INFO': this.info(successMessage); break
//                         case 'DEBUG': this.debug(successMessage); break
//                         case 'DETAIL': this.detail(successMessage); break
//                         default: this.error({ reason: new Error(`Logger: Log level ${level} not a valid success log level`) })
//                     }
//                 return value
//             })
//             .catch(reason => {
//                 this.error({ message: failureMessage, reason })
//                 return null
//             })

//     }

//     /**
//      * Logs an error if the logLevel is >= LogLevel.ERROR
//      * @param message 
//      */
//     static async error({
//         message, reason
//     }:AtLeastOne<{ message:string, reason:unknown }>) {
//         if (await Cache.get('level') >= LogLevel.ERROR) {
//             if (message) console.error(
//                  `${'ERROR'.padEnd(6, ' ')
//                 } ${logstamp()
//                 } ${message}`
//             )
//             if (reason) console.error(reason)
//         }
//     }

//     /**
//      * Logs an error if the logLevel is >= LogLevel.INFO
//      * @param message 
//      */
//     static async warn(message:string) {
//         if (await Cache.get('level') >= LogLevel.WARN) {
//             console.log(
//                  `${'WARN'.padEnd(6, ' ')
//                 } ${logstamp()
//                 } ${message}`
//             )
//         }
//     }

//     /**
//      * Logs an error if the logLevel is >= LogLevel.INFO
//      * @param message 
//      */
//     static async info(message:string) {
//         if (await Cache.get('level') >= LogLevel.INFO) {
//             console.log(
//                  `${'INFO'.padEnd(6, ' ')
//                 } ${logstamp()
//                 } ${message}`
//             )
//         }
//     }

//     /**
//      * Logs an error if the logLevel is >= LogLevel.DEBUG
//      * @param message 
//      */
//     static async debug(message:string) {
//         if (await Cache.get('level') >= LogLevel.DEBUG) {
//             console.log(
//                  `${'DEBUG'.padEnd(6, ' ')
//                 } ${logstamp()
//                 } ${message}`
//             )
//         }
//     }

//     /**
//      * Logs an error if the logLevel is >= LogLevel.DETAIL
//      * @param message 
//      */
//     static async detail(message:string) {
//         if (await Cache.get('level') >= LogLevel.DETAIL) {
//             console.log(
//                  `${'DETAIL'.padEnd(6, ' ')
//                 } ${logstamp()
//                 } ${message}`
//             )
//         }
//     }

// }