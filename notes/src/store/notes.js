import { getDatabase, ref, set, push, child, get, remove } from 'firebase/database'

export default {
  actions: {
    async createNote ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        const newNoteId = push(child(ref(db), `/users/${uid}/notes`)).key
        await set(ref(db, `/users/${uid}/notes/${newNoteId}`), {
          title: 'New note'
        })
        return newNoteId
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchNotes ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const dbRef = ref(getDatabase())
        let notes = []
        await get(child(dbRef, `/users/${uid}/notes/`)).then((snapshot) => {
          notes = snapshot.val()
        })
        if (notes !== null) {
          notes = Object.keys(notes).map(key => ({ ...notes[key], id: key }))
        }
        return notes
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchNoteById ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const dbRef = ref(getDatabase())
        let note = {}
        await get(child(dbRef, `/users/${uid}/notes/${id}`)).then((snapshot) => {
          note = snapshot.val()
        })
        return note
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async saveNoteById ({ dispatch, commit }, { id, note }) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        await set(ref(db, `/users/${uid}/notes/${id}`), note)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteNoteById ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const db = getDatabase()
        await remove(ref(db, `/users/${uid}/notes/${id}`))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
