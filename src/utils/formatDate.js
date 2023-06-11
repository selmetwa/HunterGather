export const formatDate = (/** @type {string | number | Date} */ dateString) => {
	const date = new Date(dateString);

	const options = { month: 'long', day: 'numeric', year: 'numeric' };
	// @ts-ignore
	const formattedDate = date.toLocaleDateString('en-US', options);

	return formattedDate;
};
