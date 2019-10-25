const firebase = require('firebase-admin')
const serviceAccount = require('../serviceAccountKey.json')

const { DATABASE } = process.env

class FirebaseService {
  constructor() {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: DATABASE
    })
    this.db = firebase.database()
  }

  findMaster () {
    return this.db.ref('master').once('value')
  }
}

module.exports = new FirebaseService()