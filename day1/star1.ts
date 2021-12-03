import data from './data'

const result = data.slice(1).filter((x, i) => x > data[i]).length
console.log(result)
