import { child, get, getDatabase, ref, set } from 'firebase/database'
import { getAuth, updatePassword } from 'firebase/auth'

export default {
  actions: {
    async getUserInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const dbRef = ref(getDatabase())
        let userInfo = ''
        await get(child(dbRef, `/users/${uid}/info`)).then((snapshot) => {
          userInfo = snapshot.val()
        })
        return userInfo
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async changeUsername ({ dispatch, commit }, username) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        await set(ref(db, `/users/${uid}/info/username`), username)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async changePassword ({ dispatch, commit }, password) {
      try {
        const auth = getAuth()
        const user = auth.currentUser
        await updatePassword(user, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async changeTheme ({ dispatch, commit }, theme) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        await set(ref(db, `/users/${uid}/info/theme`), theme)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
