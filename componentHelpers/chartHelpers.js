alphabeticalSort = (a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
 }

frequencySort = (a, b, order) => {
	 if (order === 'descending') {
    return a['total listens'] > b['total listens'] ? -1 : 1;
  }
  if (order === 'ascending') {
    return a['total listens'] > b['total listens'] ? 1 : -1;
  }
 }

module.exports = {
	alphabeticalSort,
	frequencySort
}