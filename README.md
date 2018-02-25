Axolemma
========

##### A tool for procedurally generating Ranvier areas.

--

## How to Install

`npm install --save axolemma`

## How to Use

```javascript
// Require-able like any other library.
const Axolemma = require('axolemma')

Axolemma.generate({ // Programmatically pass in options
  type: 'Digger' // Uses ROT-js well-documented map generation algorithms.
  writeToFile: true // Can write YAML definitions to file for static persistence
}).then(function(data) { // Returns an await-able Promise
  const {graphic, rooms, yaml} = data
  console.log(graphic) // Returns an old-school ASCII map of your area.
  console.log(yaml) // Returns parsed YAML.
  return rooms.map(
    roomDef => new Room(roomDef) // Returns Ranvier-compatible room definitions.
  )
})
```

## Misc.

Axolemma is currently in an early alpha stage. Use at your own risk.

The areas it generates are incredibly generic in this iteration so much hand-editing is still required.

If you're using this in your Ranvier server to dynamically generate content on the fly, consider using a Cluster or similar to avoid blocking the main process with Axolemma.