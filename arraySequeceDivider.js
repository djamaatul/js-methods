const arrayDivider = (arr, divide = 1) => {
	const result = [];
	let count = 0;
	arr.forEach((item) => {
		result[count] = [...(result[count] ?? []), item];
		++count;
		if (count >= divide) {
			count = 0;
		}
	});
	return result;
};
