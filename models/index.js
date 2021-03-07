const User = require('./User');
const Landmark = require('./Landmark');

User.hasMany(Landmark, {
	foreignKey: 'added_by',
});

Landmark.belongsTo(User, {
	foreignKey: 'added_by',
});

module.exports = { User, Landmark };
