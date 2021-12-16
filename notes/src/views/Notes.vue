<template>
  <div class="main-container">
    <loader v-if="loading"/>
    <div v-else class="notes">
      <note-card
        v-for="note in notes"
        :key="note.id"
        :title="note.title"
        @click.native="editNote(note.id)"
        @deleteNote="deleteNote(note.id)"
      />
      <div class="new-note material-icons" @click="createNote">add</div>
    </div>
  </div>
</template>

<script>
import NoteCard from '../components/NoteCard'
import messages from '../utils/messages'
export default {
  name: 'Notes',
  components: { NoteCard },
  data: function () {
    return {
      loading: true,
      notes: null
    }
  },
  async mounted () {
    try {
      this.notes = await this.$store.dispatch('fetchNotes')
    } catch (e) {}
    this.loading = false
  },
  methods: {
    async createNote () {
      try {
        const noteId = await this.$store.dispatch('createNote')
        await this.$router.push(`/notes/${noteId}`)
        this.loading = false
      } catch (e) {}
    },
    editNote (id) {
      this.$router.push(`/notes/${id}`)
    },
    async deleteNote (id) {
      try {
        await this.$store.dispatch('deleteNoteById', id)
        this.notes = this.notes.filter(el => el.id !== id)
        this.$notify({
          text: messages.note_delete,
          type: 'notify',
          duration: 3000
        })
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss">
  .notes {
    display: flex;
    flex-wrap: wrap;
  }
  .new-note{
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    min-height: 200px;
    font-size: 100px;
    border-radius: 8px;
    margin: 0 30px 30px 0;
    padding: 20px;
    color: $main-color;
    cursor: pointer;
  }
</style>
