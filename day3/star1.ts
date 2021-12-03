import data from './data'

const majorityNeeded = data.length / 2
const colCount = data[0].length
const result: string[] = []

for (let i = 0; i < colCount; i++) {  
  result[i] = data.filter( row => row[i] === '1' ).length > majorityNeeded ? '1' : '0'
}

const gammaStr = result.join('')
const gamma = parseInt(gammaStr, 2)
const epsilonStr = gammaStr.replace(/1/g, 'x').replace(/0/g, '1').replace(/x/g, '0')
const epsilon = parseInt(epsilonStr, 2)

console.log(gamma * epsilon)
