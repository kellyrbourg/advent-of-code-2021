import { picks, cards as cardData } from './data'

interface CardLocation {
  loc: string
  loc_picked?: boolean 
}

interface Card {
  locations: CardLocation[][]
}

let cards: Card[] = cardData.map(card => ({locations: card.map( row => row.map( loc => ({loc})))}))

function tryFindWinner(pick: string): { winningCard: Card | null, winningLoc: number | null } {
  let winningCard: Card | null = null
  let winningLoc: number | null = null
  cards.every(card => {   
    card.locations.every(row => {
      row.every((loc, i) => {
        if (loc.loc !== pick)
          return true                

        loc.loc_picked = true

        const cardIsBingo = row.filter(loc => loc.loc_picked === true).length === row.length
          || card.locations.filter(row => row[i].loc_picked === true).length === card.locations.length
        
        if (cardIsBingo) {
          winningLoc = parseInt(pick)
          winningCard = card          
        }
        return winningCard == null
      })
      return winningCard == null
    })
    return winningCard == null    
  })

  return { winningCard, winningLoc }
}

let lastWinningCard: Card | null = null
let lastWinningLoc: number | null = null

picks.forEach(pick => {
  let keepGoing = false  
  do
  {
    keepGoing = false
    const { winningCard, winningLoc } = tryFindWinner(pick)
    if (winningCard) {
      keepGoing = true
      lastWinningCard = winningCard
      lastWinningLoc = winningLoc
      cards = cards.filter(x => x != winningCard)
    }
  } while (keepGoing)
  return true  
})

let unmarkedLocSum: number = 0
lastWinningCard!.locations.forEach(row => row.filter(loc => !loc.loc_picked).forEach(loc => (unmarkedLocSum += parseInt(loc.loc))))
console.log(unmarkedLocSum * lastWinningLoc!)
