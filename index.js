var crypto = require('crypto');
var ursa = require('ursa');

var KEY_BITS = 4096;
var PBKDF2_SALT_BITS = 256;
var PBKDF2_ITERATIONS = 20000;
var PBKDF2_LENGTH_BITS = 256;

/**
 * Create a derived key from a user password (plaintext) and salt
 *
 * @param {String} password
 * @param {Buffer} salt
 * @param {Function} cb
 */
var deriveKey = function deriveKey(password, salt, cb) {
  crypto.pbkdf2(password, salt, PBKDF2_ITERATIONS, PBKDF2_LENGTH_BITS, cb);
};

/**
 * Generate a key pair for a user.
 *
 * @return {Object}
 */
exports.generateKeyPair = function generateKeyPair() {
  var keyPair = ursa.generatePrivateKey(KEY_BITS);
  return {
    privateKey: keyPair.toPrivatePem('utf8'),
    publicKey: keyPair.toPublicPem('utf8')
  };
};

/**
 * Encrypt data with the given public key
 *
 * @param {String} publicKey
 * @param {String} data
 * @returns {String}
 */
exports.encrypt = function encrypt(publicKey, data) {
  publicKey = ursa.coercePublicKey(publicKey);
  return publicKey.encrypt(data, 'utf8', 'base64');
};

/**
 * Decrypt data with the given private key
 *
 * @param {String} privateKey
 * @param {Buffer} encData
 * @returns {String}
 */
exports.decrypt = function decrypt(privateKey, encData) {
  privateKey = ursa.coercePrivateKey(privateKey);
  return privateKey.decrypt(encData, 'base64', 'utf8');
};

/**
 * Encrypt a user's private key with their password (plaintext) for secure storage
 *
 * @param {String} privateKey
 * @param {String} password
 * @param {Function} cb
 * @return {String}
 */
exports.encryptPrivateKey = function encryptPrivateKey(privateKey, password, cb) {
  // generate random salt to create user key
  crypto.randomBytes(PBKDF2_SALT_BITS / 8, function(err, salt) {
    if (err) return cb(err);

    // create a key derived from user's password
    deriveKey(password, salt, function(err, derivedKey) {
      if (err) return cb(err);

      // encrypt the user's key using their key
      var cipher = crypto.createCipher('aes-256-ctr', derivedKey);
      var encPrivateKey = cipher.update(privateKey, 'utf8', 'base64');
      encPrivateKey += cipher.final('base64');

      // return pipe-separated salt + encrypted key
      cb(null, salt.toString('base64') + '|' + encPrivateKey);
    });

  });

};

/**
 * Decrypt a user's private key with their password (plaintext)
 *
 * @param {String} encPrivateKey
 * @param {String} password
 * @param {Function} cb
 */
exports.decryptPrivateKey = function decryptPrivateKey(encPrivateKey, password, cb) {
  var sep = encPrivateKey.indexOf('|');
  var salt = new Buffer(encPrivateKey.substr(0, sep), 'base64');
  var encKey = encPrivateKey.substr(sep);

  deriveKey(password, salt, function(err, derivedKey) {
    if (err) return cb(err);

    var decipher = crypto.createDecipher('aes-256-ctr', derivedKey);
    var privateKey = decipher.update(encKey, 'base64');
    privateKey += decipher.final('base64');
    cb(null, privateKey);
  });

};
