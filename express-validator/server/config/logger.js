import winston from "winston";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "magenta",
    error: "red",
    warning: "yellow",
    info: "green",
    debug: "blue",
  },
};

const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level}]: ${stack || message}`;
    })
  ),
  defaultMeta: { service: "app-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./logs/app.log", level: "info" }),
    new winston.transports.File({ filename: "./logs/errors.log", level: "error" }),
  ],
});

winston.addColors(customLevels.colors);

export default logger;
