function resolveAttack(attack){
    if(attack != undefined && attack != null)
    {
        console.log('revolsing battle' + attack.key)
        attackblocks = attackblocks.filter(function(ele){
            return ele != attack;
        });
    }

 
}


var db = require('../lib/db');
var attackblocks = []
const battle_handler = {
    startAttack: function (username, army, defender, block_num, key, cb) {
        var now = new Date();
        var query = []
        var timer = (1 * 100) * 1 ^ 2 / 1

        var next_update_time = new Date(now.getTime() + (timer * 1000)).toISOString().slice(0, 19).replace('T', ' ')
        var target_block = block_num + (timer*3)
        console.log('block num : ' + block_num +'target num : ' + target_block)
        query.push(`INSERT INTO battles (username, defender, next_update, battle_key, target_block) 
                    VALUES ('${username}','${defender}','${next_update_time}','${key}',${target_block})`)
        for(i=0;i<army.length;i++)
        {
            query.push(`UPDATE users_units SET amount=amount-${army[i].amount} WHERE unit='${army[i].unit}' AND username='${username}'`)
            query.push(`INSERT INTO battles_units (username, unit, amount, battle_key) 
                        VALUES ('${username}','${army[i].unit}',${army[i].amount},'${key}')`)
        }
        query = query.join(';')
        db.query(query, [username], function (err, result) {
            if (err) {
                console.log(err)
                return cb(null);
            }
            var attack ={}
            attack.key = key
            attack.target_block = target_block
            console.log('created battle and moved units from users_units > to battles_units')
            cb(attack)
        })  
    },
    loadAttacks:function(){
        let query = "SELECT * FROM battles";
        db.query(query, function (err, result) {
            if (err || !result || !result[0]) {
                console.log('no attack to load')
            }
            else {
                for(i=0;i<result.length;i++)
                {
                    var attack = {key:result[i].battle_key,target_block:result[i].target_block}
                    attackblocks.push(attack)
                }
            }
        });
    },
    addAttack:function(key,target_block){
        var attack = {key:key,target_block:target_block}
        attackblocks.push(attack)
    },
    checkAttacks:function(block_num){
        for(i=0;i<attackblocks.length;i++)
        {
            if(attackblocks[i].target_block === block_num)
            {
                console.log('this block bro')
                resolveAttack(attackblocks[i])
            }
        }
    }
}

module.exports = battle_handler;