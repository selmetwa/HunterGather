/**
 * @param {any} arr1
 * @param {any} arr2
 * 
 * Creates a unique array of blocks and collections based on their ID
 */
export function createUniqueArray(arr1, arr2) {
  return [
    ...new Map(
      [...arr1, ...arr2].map((item) => [
        item.objectType === 'block' ? item['blockId'] : item['collectionId'],
        item
      ])
    ).values()
  ];
}