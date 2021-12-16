<template>
  <div class="note-card-wrapper">
    <div class="note-card">
      <h3 class="note-card__title">{{title}}</h3>
    </div>
    <span
      class="material-icons note-card__delete-btn"
      @click.stop="deleteNote"
    >
      close
    </span>
  </div>
</template>

<script>
export default {
  name: 'NoteCard',
  props: {
    title: String
  },
  methods: {
    deleteNote () {
      this.$emit('deleteNote')
    }
  }
}
</script>

<style lang="scss">
  .note-card-wrapper {
    min-width: 200px;
    min-height: 200px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    margin: 0 30px 30px 0;
    padding: 20px;
    background: var(--background-block-color);
    cursor: pointer;
    position: relative;
  }
  .note-card__title {
    font-weight: 500;
  }
  .note-card__delete-btn {
    position: absolute;
    right: 5px;
    top: 5px;
    color: var(--text-color);
  }
</style>
