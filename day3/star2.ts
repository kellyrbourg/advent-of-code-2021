import data from './data'

interface RatingParams {  
  majorityNeeded: number
  zeros: string[][]
  ones: string[][]
}

const colCount = data[0].length

function getRating (dataFilter: (data: RatingParams) => string[][]) {
  let filteredData = data;

  for (let i = 0; i < colCount; i++) {
    const majorityNeeded = filteredData.length / 2
    
    filteredData = dataFilter({      
      majorityNeeded,
      ones: filteredData.filter(row => row[i] === '1'),
      zeros: filteredData.filter(row => row[i] === '0')
    })

    if (filteredData.length === 1)
      break;
  }
  
  if (filteredData.length > 1){
    throw new Error(`invalid data, could not determine rating:\n${filteredData.join('\n')}`)
  }

  return parseInt(filteredData[0].join(''), 2)
}

const oxygenGeneratorRating = getRating(data => data.ones.length >= data.majorityNeeded ? data.ones : data.zeros)
const co2ScrubberRating = getRating(data => data.zeros.length <= data.majorityNeeded ? data.zeros : data.ones)

console.log(oxygenGeneratorRating * co2ScrubberRating)
