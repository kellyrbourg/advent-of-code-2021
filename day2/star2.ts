import data from "./data"

let depth = 0, horizontal = 0, aim = 0

data.forEach(x => {
  const parts = x.split(' ')
  const direction = parts[0]
  const amount = parseInt(parts[1])

  switch(direction){
    case 'down':
      aim += amount
      break
    case 'up':
      aim -= amount
      break;
    case 'forward':
      horizontal += amount
      depth += (aim * amount)
      break;
    default:
      throw new Error(`direction: ${direction} not implemented.`)
  }
})

console.log(depth, horizontal)
console.log(depth * horizontal)
