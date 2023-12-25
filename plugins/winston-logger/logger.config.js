const winston = require("winston");

const setData = (info) => {
  if (typeof info.message === "object" && info?.message?.request?.path) {
    return `route:  ${info.message.request.path} 
        method: ${info.message.request.method} 
        request: ${JSON.stringify(info.message.request)}
        response: ${JSON.stringify(info.message.response)}`;
  } else {
    return JSON.stringify(info);
  }
};

const options = {
  info: {
    level: "debug",
    filename: "logger/info.log",
    handleExceptions: true,
    json: true,
    colorize: false,
    timestamp: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.printf((info) => setData(info))
    ),
  },
  error: {
    level: "error",
    filename: "logger/error.log",
    handleExceptions: true,
    json: true,
    colorize: false,
    timestamp: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.printf((info) => setData(info))
    ),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.printf((info) => setData(info))
    ),
  },
};
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.info),
    new winston.transports.File(options.error),
    new winston.transports.Console(options.console),
  ],
});

module.exports = logger;
