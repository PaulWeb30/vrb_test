import React from 'react';
export default function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = React.useState<string>(value);

	React.useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay || 500);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);

	return debouncedValue;
}
