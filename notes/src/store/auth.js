import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        const auth = await getAuth()
        await signInWithEmailAndPassword(auth, email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register ({ dispatch, commit }, { username, email, password }) {
      try {
        const auth = await getAuth()
        const db = await getDatabase()
        await createUserWithEmailAndPassword(auth, email, password)
        const uid = await dispatch('getUid')
        await set(ref(db, `/users/${uid}/info`), {
          username
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getUid () {
      const auth = await getAuth()
      const user = auth.currentUser
      return user ? user.uid : null
    },
    async logout () {
      const auth = getAuth()
      try {
        await signOut(auth)
      } catch (e) {}
    }
  }
}
