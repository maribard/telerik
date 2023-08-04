

export function getSortDirection(arr) {
    const allEqual = arr => arr.every( v => v === arr[0] )
    if (allEqual(arr)) return 'allEquall';

    const c = [];
    for (let i = 1; i < arr.length; i++) {
      c.push(arr[i - 1].localeCompare(arr[i], undefined, {numeric: true, sensitivity: 'base'}))
    }
  
    if (c.every((n) => n <= 0)) return 'ascending';
    if (c.every((n) => n >= 0)) return 'descending';
  
    return 'unsorted';
  }
export function getSortDirectionForRangeColumn(values) {
    const allEqual = values => values.every( v => v === values[0] )
    if (allEqual(values)) return 'allEquall';

    let sortingOrder: 'ascending' | 'descending' | 'unsorted' = 'unsorted';

    for (let index = 1; index < values.length; index++) {
        const prevNum = parseInt(values[index - 1].replace(/[^0-9-]/g, ''), 10);
        const currentNum = parseInt(values[index].replace(/[^0-9-]/g, ''), 10);

        if (prevNum < currentNum) {
            if (sortingOrder === 'unsorted') {
                sortingOrder = 'ascending';
            } else if (sortingOrder === 'descending') {
                sortingOrder = 'unsorted';
                break;
            }
        } else if (prevNum > currentNum) {
            if (sortingOrder === 'unsorted') {
                sortingOrder = 'descending';
            } else if (sortingOrder === 'ascending') {
                sortingOrder = 'unsorted';
                break;
            }
        }
    }
    return sortingOrder
  }