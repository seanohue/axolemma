module.exports = {
  type: 'Digger',
  areaTitle: 'Abandoned Mines',

  width: 20,
  height: 20,

  roomHeightMaximum: 7,
  roomHeightMinimum: 3,

  roomWidthMaximum: 7,
  roomWidthMinimum: 3,

  dugPercentage: 0.4,

  corridorLengthMaximum: 7,
  corridorLengthMinimum: 2,

  weightedRoomsTable: require('./rooms-table')

};