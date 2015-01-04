var assert = require('assert');
var sdata = require('../');

describe('sdata', function() {

  var PRIVATE_KEY = '-----BEGIN RSA PRIVATE KEY-----\nMIIJJwIBAAKCAgEA5sD+XO6+9VLoF75W4OhaICuWfz+z5zskASZ1904j2nFj2yuT\n60YGnzvT70YsV1GoxaUeUNWmWerwyHKdGpRLcWXhS4qUEC5RbGiZ1jyCrwEss3+r\nkP4ChLUuiUiyhxRm0DWNjyhPsYSv12HQVNJ38pJvCfx9MVzhuZObrSamZhFPh79B\nD/5vEKpsqel9HwLLs183uxcGmc7Rq2BndbFBePTM3S8kNULRcZ/TC9o0sXtBFb5A\n3yJdO1RaW5HE1ALBb/MTKs5IJvl8yEDoqqGO9xmKolgwyItQmoaEZSVHFoRAdCbF\nPuPH5EEtTRQUy2TDC49SE3OxBMobv4aBKgZlD9oKjLnX104Rnx/jDGaqvmTPhL8K\nHDRyApqknuX5TMJJ5tRA2CaADxiDYd/KRT8dj/zMGjOq7wSerxAcHzkj7SHJ+M3v\noQTu+tsdMJ2Zzo0Btm4T27pyWATdhxxgbTG9kKUeZoSnYxS3RbFcZEwpm9poYxHm\n9V3/uHT2GHbnhE0QtB6BGuFaDXS2ocsjxvpxTJWOZAZyP/OpfsI95nzqew5IrpMe\nVcGDomE+ENlCDs5g3titmbOqGmH1MZxPnlHlENWW85OG48tGYMYFdj88rbyrSdsj\n9xYYvhSK1GFxgDwI99l9LBnjq7KXAXJvHdtn2Qftj3xbP8WLAdvYzD9+KtcCAwEA\nAQKCAgAq1D9h+F4xIoY5gfaWIAo6VlzEmYpGrM9t9zmGAVbeQJWMJHZ8AK9R9sTL\ncHbibiGpLZCG6GDL57NxQPSv7j5iecprPvlkV3R9bpy/CtQmr00gs92gN8U35HkS\nug+IytyaYJY5r/26sSoCDAGi/L2OpGc/r0F9XAP5cdA/PyE7aJMeWv00fsEWkstA\nbjnu+5HbZRzu+MMc4SpBaM9LJO9GCAnOM+XAjPpa4JNHa+TD3GCkLH/V6obrcCil\nPlUOFMTahn9UPp1dvojOkl2c7gefDXqRz1SepFz9kWIZc+XR5BIifN+3YIfFceN6\nnvONHNKm3p8ZRSvh+7FSxyBKMI2pHVGyrZha77nZSSyqqqR4Q9mdMJKQXWGNPUa4\nT41uApj88QbQEaPI5ZzfJ6mjpNQnV931Xmu4pPAFVaaghqPXsJVyB1NcucdYRL5X\nEBiP9RRSgtA1iT+5+eLXW3sEvJ8DVMMUx4flFAgIeQYUh43cNIA0iIntAxDdXnC+\n9RSC2eZiELOajvbwa0xP0/HpP3X7ILZwML9vKUBkCceaTJGaicax9aaWJqtnfHYO\nAI0QR8Lk/M3lFcp+JgsHDAla2bNQsxTgXzgxxDUUV2P7lV+to47v8TBBYqghyVBC\nEaBhZ141l2YFw6376nnB8osnqIO7MHHTQLVXPzMKkcDadNUxoQKCAQEA9DiAbYaj\nhxKm5u20PdCmg8jGjh00xAbKAGq6vyCOsb97ghRx2nyeiA/L94mvS21oicLHg5BI\nOi4pOtUh4qFwcQ7dVN7wo84Dp8lM2vaqLo3dbICSdCq+CiOEKyfPPXhTUJ7OU3V/\niJH9EgABNjMa83pMiwkbVt7nKWULNFtCxXHMaV30lK5eUJnRPeNQPTleCLpaOIu+\nwjntsoILmzhajhw8l2QdLXsgAGOypMvAQjl0VTwyPlghffkQ7yL2f6rtssUNPk4t\nIMjcHKvNVYnj/IiFJQm76dPi3n8giOHiQnGh9Sl2rVnIUC/D8i0MASYD1yEPQzkK\nInPK9nWGUisMywKCAQEA8eI2EVNLrvzCc0GIfryRbqqgAfTht0KsjAAGMq4HYyUo\nL1Ownu/FjzxYcUkExM1yNApOo59CWMdaBdoC3glMh1+LrCKI36dyW6440WCNZQNN\nyTMkXyvWY4RcYTfwYHNfbclj8Z9l3TC40OQOnbMUAQSgki32CjQWFlGMa/ods4nG\npJozIBs9R16p/Zlrg5HI3RsR0ZzDLZKkzHqyIi6RZyU2CbC2Z7hn8qAPxp+J9pQU\nkbGC/iBOPZ1mJaGxcBvH6mJedbRF78wMm1561hltgJDOTjd4/GvS2LplGGd7dx2r\nzwlvWRkB7t6Etp3zeDJu/SxkOJ206P+bJB271OtEpQKCAQBePQNJwD+P2qGu0KDR\njZcDmVEM+7YlwlzmZkjjgaOucS4ulscMQTRHWpkhTu7mkzRYnGGyodVNJgzg1+d4\ndUVXSx4bJuACxXdhomrWv4IR7so3mTFqRCgK74OLx5PPq4Oyw2TojZmF0Jev/3J4\nQKYwt8ubhwsWrXLT5Vq6fFC6sdvn+MptKQ/Z2FEGqZWH2oAvrAEuerZEamgPjuD9\np3RCDCFRZd9gcnd5zv7bWog4xcTfMxhMOGPMIXToYjxuLT4F0sX2eeIuGXPeWGkm\njcv84Y1HKodphkqwAqxCRa+yZfjSCorx/4gtcRESfVF5i/rFY8to7DS98KKsEdOg\nF16bAoIBACuuOStZynIYTRk5PWf9r5m3kFuqGFTa4oQJwRTH3qel3yLkzyF0lU2v\njR0wHX9YxoXlUpwzt2yG25fw7dGhBkPwGi4EsokJGRq7VKFi+UXDmfl6ldfl97pS\n/cfErVENpK8TzkulCGUwVj/K32TVIQiqCEE9sY/YJiDzqxMYwOJaQBgbjJ4ArUlF\nLBeS7Bp/ajGboNUkpQ6Gy+HtSlvn4vQogSCw28/ROlxTUWYCC40O4sQItWok9Vwl\nH3wuPffL3IdUKlDBNFwAkkpAfphJUUAFZmwzklKrOhFPX9BPZ7l0D0G9J3GElZfI\ncVj1HzGWkfqAWLzspe3pst+Lyw7BSc0CggEAXF9oE+2R9jylrbaSSRGHSXvk7Xsd\n3HEFZTD45f/hKFj4w00iHAz6XQNgRMPtSQDc6P4a2+lMfTR482Dcqk/nq5fGyIcK\naxMEvfIGNDM0AB+V4ZuzAtAZbw3KeDeV590iKqOXwD3we2W7p+PaxVZxr4dBDbwR\nlZOjRqoxsHnvWYXyEUph0CSW13Jc91b0J8EjsWxYfS3Jgq6yXETbdfl83KaZ1Rk/\niBGWooyoiEzn52w2l8geojaMsKgxg2kM/RjJYjQoMLpPCEf3TKHKM0JxRQS5eN7Z\nhWrSMZBa38BwUexPSQL4rMbYcMeOh+WsWdg3g8goxsT/N8ipLkWj4adBlg==\n-----END RSA PRIVATE KEY-----\n';
  var PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA5sD+XO6+9VLoF75W4Oha\nICuWfz+z5zskASZ1904j2nFj2yuT60YGnzvT70YsV1GoxaUeUNWmWerwyHKdGpRL\ncWXhS4qUEC5RbGiZ1jyCrwEss3+rkP4ChLUuiUiyhxRm0DWNjyhPsYSv12HQVNJ3\n8pJvCfx9MVzhuZObrSamZhFPh79BD/5vEKpsqel9HwLLs183uxcGmc7Rq2BndbFB\nePTM3S8kNULRcZ/TC9o0sXtBFb5A3yJdO1RaW5HE1ALBb/MTKs5IJvl8yEDoqqGO\n9xmKolgwyItQmoaEZSVHFoRAdCbFPuPH5EEtTRQUy2TDC49SE3OxBMobv4aBKgZl\nD9oKjLnX104Rnx/jDGaqvmTPhL8KHDRyApqknuX5TMJJ5tRA2CaADxiDYd/KRT8d\nj/zMGjOq7wSerxAcHzkj7SHJ+M3voQTu+tsdMJ2Zzo0Btm4T27pyWATdhxxgbTG9\nkKUeZoSnYxS3RbFcZEwpm9poYxHm9V3/uHT2GHbnhE0QtB6BGuFaDXS2ocsjxvpx\nTJWOZAZyP/OpfsI95nzqew5IrpMeVcGDomE+ENlCDs5g3titmbOqGmH1MZxPnlHl\nENWW85OG48tGYMYFdj88rbyrSdsj9xYYvhSK1GFxgDwI99l9LBnjq7KXAXJvHdtn\n2Qftj3xbP8WLAdvYzD9+KtcCAwEAAQ==\n-----END PUBLIC KEY-----\n';

  describe('generateKeyPair()', function() {
    it('should be able to generate a key pair', function() {
      var keyPair = sdata.generateKeyPair();
      assert.ok(keyPair);
      assert.ok(keyPair.privateKey);
      assert.ok(keyPair.publicKey);
      //console.log(keyPair);
    });
  });

  describe('encrypt()', function() {
    it('should be able to encrypt data', function() {
      var mydata = JSON.stringify({
        name: 'John Smith',
        ssn4: '1234',
        dob: '1952-12-31'
      });

      var encdata = sdata.encrypt(PUBLIC_KEY, mydata);
      assert.ok(encdata);
      assert.equal(typeof encdata, 'string');
    });
  });

  describe('encryptPrivateKey()', function() {
    it('should be able to encrypt private key with user password', function(done) {
      sdata.encryptPrivateKey(PRIVATE_KEY, 'mypassword', function(err, encPrivateKey) {
        assert.ifError(err);
        assert.ok(encPrivateKey);
        assert.equal(typeof encPrivateKey, 'string');
        assert.ok(encPrivateKey.indexOf('|') >= 0);
        done();
      });
    });
  });

  /*
  describe('decryptPrivateKey()', function() {
    it('should be able to decrypt private key with user password', function(done) {
      sdata.decryptPrivateKey(encKeyPair, 'mypassword', function(err, privateKey) {
        assert.ifError(err);
        assert.strictEqual(privateKey, PRIVATE_KEY);
      });
    });
  });
  */

});
