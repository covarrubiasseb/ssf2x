function SortDate(sets, matchData) {

  let mappedDates = sets.map((set) => {
    let date = set.date;
    let result = [];

    result.push(Number(date.slice(0, 4)));
    result.push(Number(date.slice(5, 7)));
    result.push(Number(date.slice(8, 10)));

    return {
      date: result,
      matchKey: set.match
    };
  });

  return mappedDates.sort((a,b) => {
    if (a.date[0] < b.date[0]) {
      return -1;
    } else if (a.date[0] === b.date[0]) {
      if (a.date[1] < b.date[1]) {
        return -1;
      } else if (a.date[1] === b.date[1]) {
        if (a.date[2] < b.date[2]) {
          return -1;
        } else if (a.date[2] === b.date[2]) {
          return 0;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  });
}

export default SortDate