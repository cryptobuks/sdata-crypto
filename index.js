var crypto = require('crypto');
var assert = require('assert');
var ursa = require('ursa');

var KEY_BITS = 4096;
var PBKDF2_SALT_BYTES = 256;
var PBKDF2_ITERATIONS = 20000;
var PBKDF2_LENGTH_BITS = 256;

var deriveKey = function derivedKey(password, salt, cb) {
  crypto.pbkdf2(password, salt, PBKDF2_ITERATIONS, PBKDF2_LENGTH_BITS, cb);
};

/**
 * Generate a key pair for a user based on their password (plaintext).
 *
 * @param {String} password A user's plaintext password
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
 * Encrypt data with the given keyPair
 *
 * @param {Object|String} publicKey
 * @param {String} data
 * @returns {String}
 */
exports.encrypt = function encrypt(publicKey, data) {
  publicKey = ursa.coercePublicKey(publicKey);
  return publicKey.encrypt(data, 'utf8', 'base64');
};

/**
 * Encrypt a user's keypair with their password (plaintext) for secure storage
 *
 * @param {String} privateKey
 * @param {String} password
 * @param {Function} cb
 * @return {String}
 */
exports.encryptPrivateKey = function encryptPrivateKey(privateKey, password, cb) {
  // generate random salt to create user key
  crypto.randomBytes(PBKDF2_SALT_BYTES, function(err, salt) {
    assert.ifError(err);

    // create a key derived from user's password
    deriveKey(password, salt, function(err, derivedKey) {
      assert.ifError(err);

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
 * Decrypt a user's keypair from with their password (plaintext)
 *
 * @param {String} keyPairString
 * @param {String} password
 * @param {Function} cb
 */
exports.decryptPrivateKey = function decryptPrivateKey(keyPairString, password, cb) {
  var sep = keyPairString.indexOf('|');
  var salt = keyPairString.substr(0, sep);
  var encKey = keyPairString.substr(sep);

  deriveKey(password, salt, function(err, derivedKey) {
    assert.ifError(err);
    var decipher = crypto.createDicipher('aes-256-ctr', derivedKey);
    var keypair = decipher.update(encKey, 'base64');
    keypair += decipher.final('base64');
    cb(null, keypair);
  });

};
