const filterByDate = (dayFrom, dayTo, data) => {
  return data.data.filter(date => date.date >= dayFrom && date.date <= dayTo );
}

module.exports.filterByDate = filterByDate;