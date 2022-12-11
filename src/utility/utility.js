/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
export const ellipsis = (text, size) => {
  return `${text.split(' ').slice(0, size).join(' ')}...`;
};
