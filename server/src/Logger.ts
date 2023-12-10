const winston = require('winston');

export const Logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        })
    ]
});