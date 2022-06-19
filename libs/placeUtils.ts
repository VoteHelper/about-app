import { Colors } from "./colors"

const placeToColor = {
  '커피빈': Colors.coffeebin,
  '할리스': Colors.hollys,
  '': Colors.yellow ,
}

const placeToColorScheme = {
  '커피빈': 'purple',
  '할리스': 'red',
  '': 'yellow' ,
}

const placeToImg = {
  '커피빈': 'https://play-lh.googleusercontent.com/VJUZEoZtShO4aTHR4xSfLLGlYwP5fys_tU5qEsMoW1pIpo9FRZo90AMUzlEaOOcN3zHR=w480-h960-rw',
  '할리스': 'https://play-lh.googleusercontent.com/RJj9PNtPWXcokaPm-t-FkEM1FB9IPnREhOhG6Re_kJCO7BS8CoHqSg1j3d7o_PHIBQw=w480-h960-rw'
}

const placeToFullName = {
  '커피빈': '커피빈 광교아브뉴프랑점',
  '할리스': '할리스 아주대삼거리점',
}

export const getPlaces = () => {
  return Object.keys(placeToColorScheme)
    .filter((p) => p !== '')
}

export const getPlaceFullName = (place: string) => {
  if (place in placeToColor)
    return placeToFullName[place]

  return '잘못된 장소'
}

export const getPlaceColor = (place: string) => {
  if (place in placeToColor)
    return placeToColor[place]
  
  return placeToColor['']
}

export const getPlaceImg = (place: string) => {
  if (place in placeToImg)
    return placeToImg[place]
  
  return ''
}

export const getOptimalPlace = (places: string[]) => {
  const frequency = places.reduce((acc, curr) => (
    acc[curr] ? ++acc[curr] : acc[curr] = 1, acc), {})

  const sortByFrequency = Array.from(Object.keys(frequency))
  .sort((a, b) => frequency[b] - frequency[a])

  if (sortByFrequency.length > 0) {
    if (sortByFrequency.length == 2 && sortByFrequency[0] == sortByFrequency[1]) {
      return '커피빈'
    }
    return sortByFrequency[0]
  }
  return '커피빈'
}