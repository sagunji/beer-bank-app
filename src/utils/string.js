/**
 * Build supplied string by interpolating properties after delimiter(':') with the given parameters.
 *
 * @example
 * interpolate('/posts/:id', {id: 1})
 * => '/posts/1'
 *
 * @param {string} str
 * @param {object} params
 * @returns {string}
 */
export function interpolate(str, params) {
  let formattedString = str;

  for (const [key, value] of Object.entries(params)) {
    const val = value || '';

    formattedString = formattedString.replace(new RegExp(':' + key, 'gi'), val.toString());
  }

  return formattedString;
}
