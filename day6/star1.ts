import data from './data'

const daysToSimulate = 80
let fish = data.slice();

[...Array(daysToSimulate)].map(() => {
  const newFishies = fish.map(x => x === 0 ? 6 : x - 1)
  fish.filter(f => f === 0 ).forEach(_ => newFishies.push(8));
  fish = newFishies
})

console.log(fish.length)