const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const state = Object.freeze({
  UNAPPROVED: 'UNAPPROVED',
  APPROVED: 'APPROVED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
});

const statesSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  stateName: {
    type: String,
    enum: Object.values(state),
    required: true
  }
});

const State = mongoose.model('States', statesSchema, 'states');

mongoose.connection.once('open', async () => {
  const count = await State.find().limit(1).count();
  if (Number.isInteger(count) && count === 0) {
    Object.values(state).forEach((stateValue) => {
      const newState = new State({
        _id: new mongoose.Types.ObjectId(),
        stateName: stateValue
      });
      newState.save()
    });
  }
});

module.exports = State;