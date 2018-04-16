const COMMON = 5
const UNCOMMON = 3
const RARE = 1

module.exports = {
  mineshaft: {
    weight: UNCOMMON,
    title: 'Abandoned Mineshaft',
    description: 'A dark pit looms below you, boarded over by loose planks. The walls around you bear the marks of generations worth of pickaxes.'
  },

  minefloor: {
    weight: COMMON,
    title: 'Abandoned Mine Floor',
    description: 'Loose stones cover the ground, the results of a hasty excavation.'
  },

  oredeposit: {
    weight: RARE,
    title: 'Abandoned Ore Deposit',
    description: 'Loose stones cover the ground, surrounded an exposed vein of glittering metal.',
    items: ['crafting:ore']
  }
};