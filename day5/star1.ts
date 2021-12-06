import data from "./data"

function mapSegment(segment: string): Point {
  const xy = segment.split(',').map(x => parseInt(x))
  return { x: xy[0], y: xy[1] }
}

interface Point { x: number, y: number }

const knownPoints: Point[] = []

function getRange(start: number, end: number) {
  const actualStart = start <= end ? start : end
  const actualEnd = actualStart === start ? end : start
  return [...Array(actualEnd - actualStart + 1).keys()].map(x => x + actualStart)  
}

data.split('\n')
  .forEach(line => {
    const segments = line.split(' -> ')
    const start = mapSegment(segments[0])
    const end = mapSegment(segments[1])

    if (start.x !== end.x && start.y !== end.y)
      return
    
    if (start.x === end.x) {
      getRange(start.y, end.y).forEach(y => knownPoints.push({x: start.x, y}))
    }
    else {
      getRange(start.x, end.x).forEach(x => knownPoints.push({x, y: start.y}))
    }    
  })

  var counts = knownPoints.reduce((p, c) => {    
    const name = `${c.x},${c.y}`
    if (!p.hasOwnProperty(name)) {
      p[name] = 0;
    }
    p[name]++;
    return p;
  }, {} as {[key: string]: number});

  let total = 0
  for (const prop in counts) {
    if (counts[prop] > 1)
      total++
  }

  console.log(total)
