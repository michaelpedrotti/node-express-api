const bcrypt = require('bcrypt');

const shuffle = str => [...str].sort(()=>Math.random()-.5).join('');

exports.passwordGenerator = (password = '') => {

    if(!password){

        const [ today ] = new Date().toISOString().split('T');

        password = String(today).replaceAll('-', '');
        password = shuffle(password);
    }

    let encrypt = bcrypt.hashSync(password, Number(process.env.SALT || 10));

    return [password, encrypt];
};

exports.passwordCompare = (password, encrypt) => {

    return bcrypt.compareSync(password, encrypt);
}