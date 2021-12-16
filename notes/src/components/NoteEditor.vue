<template>
  <div class="note-editor-wrapper">
    <div class="editor" v-if="editor" @click="focusEditor">
      <menu-bar class="editor__header" :editor="editor" />
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import MenuBar from './NoteEditorMenuBar'

export default {
  name: 'NoteEditor',
  props: {
    id: String,
    html: String
  },
  components: { EditorContent, MenuBar },
  data () {
    return {
      editor: null,
      onFocusContent: '',
      timeoutTimer: 0,
      noteSaved: true
    }
  },
  methods: {
    saveContent () {
      this.$emit('getContent', this.editor.getHTML())
    },
    focusEditor () {
      if (this.editor.getText() === '') {
        this.editor.commands.focus()
      }
    }
  },
  async mounted () {
    this.editor = new Editor({
      content: this.html,
      extensions: [
        StarterKit,
        Highlight,
        TaskList,
        TaskItem
      ]
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>

<style lang="scss">
  button.is-active {
    background: $main-color;
  }
  .ProseMirror {
    outline: none;
    padding: 10px;
    > * + * {
      margin-top: 0.75em;
    }
    ul, ol {
      padding: 0 1rem;
    }
    h1, h2, h3, h4, h5, h6 {
      line-height: 1.1;
    }
    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }
    pre {
      background: $main-color;
      font-family: 'JetBrainsMono', monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }
    mark {
      background-color: $main-color;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    hr {
      margin: 1rem 0;
    }
    blockquote {
      padding-left: 1rem;
      border-left: 2px solid var(--border-color);
    }
    hr {
      border: none;
      border-top: 2px solid var(--border-color);
      margin: 2rem 0;
    }
    ul[data-type="taskList"] {
      list-style: none;
      padding: 0;
      li {
        display: flex;
        align-items: center;
        > label {
          flex: 0 0 auto;
          margin-right: 0.5rem;
          user-select: none;
          > input {
            accent-color: $main-color;
          }
        }
        > div {
          flex: 1 1 auto;
        }
      }
    }
  }
  .editor {
    display: flex;
    flex-direction: column;
    color: var(--text-color);
    background-color: var(--background-block-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    max-width: 800px;
    min-height: 300px;
    &__header {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      flex-wrap: wrap;
      padding: 0.25rem;
      border-bottom: 1px solid var(--border-color);
    }
    &__content {
      padding: 1.25rem 1rem;
      flex: 1 1 auto;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>
