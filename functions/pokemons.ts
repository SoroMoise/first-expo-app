export function getPokemonId(url: string): number {
  return parseInt(url.split('/').at(-2)!, 10)
}

export function getPokemonArtwork(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function formatWeight(weight?: number): string {
  return weight ? (weight / 10).toString().replace('.', ',') + 'kg' : '--'
}

export function formatHeight(height?: number): string {
  return height ? (height / 10).toString().replace('.', ',') + 'm' : '--'
}
