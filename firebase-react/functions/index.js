const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotif = (notif) => {
    return admin.firestore().collection('notifications').add(notif).then((doc) => {
        console.log('notification added', doc)
    });
};

exports.postCreated = functions.firestore.document('/posts/{postId}').onCreate(
    (doc) => {
        
        const post = doc.data();
        const notif =  {
            content: 'Created a new post',
            user: `${post.authorFirstName} ${post.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotif(notif);

    }
);

exports.postDeleted = functions.firestore.document('/posts/{postId}').onDelete(
  (doc) =>  {
    const post = doc.data();
    const notif = {
      content: 'Deleted a post',
      user: `${post.authorFirstName} ${post.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotif(notif);
  }
);

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notif = {
          content: 'Joined Firebase Connect!',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotif(notif);

      });
});

