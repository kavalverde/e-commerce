export function sortArrayByData(array) {
  return array.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
}
