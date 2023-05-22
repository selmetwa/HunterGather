/**
 * @param {any} arr1
 * @param {any} arr2
 * 
 * Interweaves blocks and collections together
 */

export const interweave = (arr1, arr2) => {
  return arr1.reduce(( /** @type {any} */ acc, /** @type {any} */ current, /** @type {number} */ index) => {
    return [...acc, current, ...arr2.splice(0, arr1[index + 1] ? 2 : arr2.length)];
  }, []);
};