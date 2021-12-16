<template>
  <div class="main-container">
    <Loader v-if="loading"/>
    <div v-else class="note-wrapper">
      <label class="note__title-label" for="title">
        <input
          id="title"
          type="text"
          v-model="note.title"
          class="note__title"
          maxlength="25"
        >
        <div class="note-menu">
          <base-button-icon
            :kind="'main'"
            @click.native="saveNote"
          >
            save
          </base-button-icon>
          <base-button-icon
            :kind="'red'"
            @click.native="deleteNote"
          >
            delete
          </base-button-icon>
        </div>
      </label>
      <div class="note">
        <div class="note__editor">
          <note-editor
            :id="this.$route.params.id"
            :html="this.note.html"
            ref="editor"
            @getContent="getContent"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteEditor from '../components/NoteEditor'
import BaseButtonIcon from '../components/BaseButtonIcon'
import messages from '../utils/messages'
export default {
  name: 'AppNote',
  components: { NoteEditor, BaseButtonIcon },
  data: function () {
    return {
      note: {},
      loading: true
    }
  },
  methods: {
    saveContent () {
      this.$refs.editor.saveContent()
    },
    getContent (html) {
      this.note.html = html
    },
    async saveNote () {
      this.saveContent()
      await this.$store.dispatch('saveNoteById', {
        id: this.$route.params.id,
        note: this.note
      })
      this.$notify({
        text: messages.note_saved,
        type: 'notify',
        duration: 3000
      })
    },
    async deleteNote () {
      await this.$store.dispatch('deleteNoteById', this.$route.params.id)
      this.$notify({
        text: messages.note_delete,
        type: 'notify',
        duration: 3000
      })
      await this.$router.push('/notes')
    }
  },
  async mounted () {
    this.note = await this.$store.dispatch('fetchNoteById', this.$route.params.id)
    this.loading = false
  }
}
</script>

<style lang="scss">
  .note {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .note__title {
    font-size: 32px;
    background: var(--background-block-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 5px 10px 5px 10px;
    width: 100%;
  }
  .note__title-label{
    display: flex;
    margin-bottom: 30px;
    max-width: 800px;
    width: 100%;
  }
  .note-menu {
    display: flex;
  }
  .note-menu__save-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
  }
  .note-menu__delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
  }
</style>
