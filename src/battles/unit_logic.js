const data = require('../gamedata/units.json')
const defdata = require('../gamedata/defunits.json')
const unit_logic = {
    cleanDefArmy: function (user_units) {
        const result = []
        if (user_units.length > 0) {
            for (i in user_units) {
                if (defdata.filter(function (item) { return item.id === user_units[i].unit })) {
                    const unit = defdata.filter(function (item) { return item.id === user_units[i].unit })[0]
                    const new_unit = unit
                    if (user_units[i].amount > 0) {
                        new_unit.amount = user_units[i].amount
                        new_unit.pv = user_units[i].amount * new_unit.defense
                        new_unit.damage = user_units[i].amount * new_unit.attack
                        result.push(new_unit)
                    }
                }

            }
        }
        return result
    },
    cleanArmy: function (user_units) {
        const result = []
        if (user_units.length > 0) {
            for (i in user_units) {
                if (data.filter(function (item) { return item.id === user_units[i].unit })) {
                    const unit = data.filter(function (item) { return item.id === user_units[i].unit })[0]
                    const new_unit = unit
                    if (user_units[i].amount > 0) {
                        new_unit.amount = user_units[i].amount
                        new_unit.pv = user_units[i].amount * new_unit.defense
                        new_unit.damage = user_units[i].amount * new_unit.attack
                        result.push(new_unit)
                    }
                }

            }
        }
        return result
    },
    chooseNextAttackersByPriority: function (old_army) {
        if (old_army && old_army.length > 0) {
            var units = []
            for (i = 0; i < data.length; i++) {
                units.push(data[i])
            }
            var fresh_army = []
            var placeholder = units
            old_army = old_army.filter(function (el) {
                return el != null;
            });
            for (var i = 0; i < old_army.length; i++) {
                var new_unit = placeholder.filter(function (item) { return item.id === old_army[i].id })[0]
                if (new_unit && new_unit.amount != undefined) {
                    if (new_unit.amount < 0) {

                    }
                    else {
                        new_unit.pv = new_unit.defense * old_army[i].amount
                        new_unit.damage = new_unit.attack * old_army[i].amount
                        fresh_army.push(new_unit)
                    }
                }
            }
            return fresh_army.sort(function (a, b) {
                return parseFloat(a.priority) - parseFloat(b.priority)
            })[0]
        }
    }
}
module.exports = unit_logic;