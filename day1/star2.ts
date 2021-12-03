import data from './data'

let increases = 0

data.forEach((_, i) => {
  if (i === 0) return
  if (i + 2 > data.length) return
  const constant = data[i] + data[i+1]
  const curr = constant + data[i+2]
  const prev = constant + data[i-1]  
  if (curr > prev) increases++
})

console.log(increases)
