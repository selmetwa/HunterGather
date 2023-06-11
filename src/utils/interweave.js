// @ts-nocheck
/**
 * Interweaves blocks and collections together
 */

export function interweave(first, second) {
	var min = Math.min(first.length, second.length),
		i = 0,
		result = [];

	while (i < min) {
		result.push(first[i], second[i]);
		++i;
	}
	return result.concat(first.slice(min), second.slice(min));
}
