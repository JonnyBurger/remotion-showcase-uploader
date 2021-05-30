function logger(...args: unknown[]): void {
	args.unshift('[remotion-showcase]');
	console.log(...args); // eslint-disable-line no-console
}

logger.warn = function (...args: unknown[]) {
	args.unshift('[remotion-showcase]');
	console.warn(...args); // eslint-disable-line no-console
};

logger.error = function (...args: unknown[]) {
	args.unshift('[remotion-showcase]');
	console.warn(...args); // eslint-disable-line no-console
};

export default logger;
