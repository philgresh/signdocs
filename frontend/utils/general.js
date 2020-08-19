export function titleize(str) {
  if (!str.length) return str;
  const newStr = str[0].toUpperCase();
  return `${newStr}${str.slice(1).toLowerCase()}`;
}

export function humanize(str, sep = '_') {
  const newStr = str.replace(sep, ' ');
  return titleize(newStr);
}
