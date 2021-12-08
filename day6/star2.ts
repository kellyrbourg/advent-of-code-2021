import data from './data'

const daysToSimulate = 256

const emptyArr = [...Array(9)].map(() => 0)

let fishAggregate = data.reduce((arr, daysToSpawn) => {
  if (arr[daysToSpawn] == null)
    arr[daysToSpawn] = 1
  else 
    arr[daysToSpawn]++
  return arr
}, emptyArr.slice());

[...Array(daysToSimulate)].map(() => {
  const newAggregate = emptyArr.slice()
  for (let i = 0; i < fishAggregate.length; i++) {            
    const newDaysToSpawn = i === 0 ? 6 : i - 1
    newAggregate[newDaysToSpawn] += fishAggregate[i]
  }  
  newAggregate[8] += fishAggregate[0]
  fishAggregate = newAggregate
})

const totalFish = fishAggregate.reduce((acc, v) => acc + v, 0)
console.log(totalFish)