import { picks, cards as cardData } from './data'

interface CardLocation {
  loc: string
  loc_picked?: boolean 
}

interface Card {
  locations: CardLocation[][]
}

const cards: Card[] = cardData.map(card => ({locations: card.map( row => row.map( loc => ({loc})))}))

let winningCard: Card | null = null
let winningLoc: number | null = null

picks.every(pick => {
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
  return winningCard == null
})

console.log(JSON.stringify(winningCard, null, 2))

let unmarkedLocSum: number = 0
winningCard!.locations.forEach(row => row.filter(loc => !loc.loc_picked).forEach(loc => (unmarkedLocSum += parseInt(loc.loc))))
console.log(unmarkedLocSum * winningLoc!)
