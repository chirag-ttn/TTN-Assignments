const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto')
const fs = require('fs')
/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}
function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}
const PRIV_KEY = fs.readFileSync('../id_rsa_priv.pem', 'utf-8')
function issueJWT(user) {
    
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
    //jsonwebtoken requires a header but it gets it on it's own
    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

module.exports = {
    genPassword:genPassword,
    validPassword:validPassword,
    issueJWT:issueJWT

}