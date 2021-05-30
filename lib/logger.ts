function logger(...args: any): void {
  args.unshift("[remotion-showcase]");
  console.log(...args); // eslint-disable-line no-console
}

logger.warn = function loggerWarn(...args: any) {
  args.unshift("[remotion-showcase]");
  console.warn(...args); // eslint-disable-line no-console
};

logger.error = function loggerError(...args: any) {
  args.unshift("[remotion-showcase]");
  console.warn(...args); // eslint-disable-line no-console
};

export default logger;
