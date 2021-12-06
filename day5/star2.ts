import data from "./data"

function mapSegment(segment: string): Point {
  const xy = segment.split(',').map(x => parseInt(x))
  return { x: xy[0], y: xy[1] }
}

interface Point { x: number, y: number }

const knownPoints: Point[] = []

function movePoint(current: number, end: number) {
  if (end === current) 
    return current
  if (current > end)
    return current - 1
  return current + 1
}

data.split('\n')
  .forEach(line => {
    const segments = line.split(' -> ')
    const start = mapSegment(segments[0])
    const end = mapSegment(segments[1])

    let currentPoint = start
    knownPoints.push(start)
    while (currentPoint.x != end.x || currentPoint.y != end.y) {
      currentPoint = { x: movePoint(currentPoint.x, end.x), y: movePoint(currentPoint.y, end.y) }
      knownPoints.push(currentPoint)
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