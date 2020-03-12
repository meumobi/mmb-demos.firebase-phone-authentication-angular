const admin = require('firebase-admin');

const serviceAccount = require('./meu-starter-firebase-adminsdk-1bu7h-ff6531a16d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://meu-starter.firebaseio.com'
});

const uid = 'XhE9Ex1XeWROMwgYKg7dHqG8w653';

admin.auth().getUser(uid)
/* admin.auth().updateUser(uid, {
  // phoneNumber: '+5521983487230',
  email: 'victor.dias+11@meumobi.com',
  emailVerified: true
}) */
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });
