import { useState } from 'react'
import '@mdxeditor/editor/style.css'

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  linkPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
  InsertCodeBlock,
  ChangeCodeMirrorLanguage,
  ConditionalContents
} from '@mdxeditor/editor'

function App() {
  const [content, setContent] = useState(`# Aula de Programação

Bem-vindo ao editor.

## Exemplo

Selecione um texto e clique em **Negrito**.
`)

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}
    >
      <h1>Editor de Materiais</h1>

      <MDXEditor
        markdown={content}
        onChange={setContent}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          tablePlugin(),
          linkPlugin(),
          codeBlockPlugin({
            defaultCodeBlockLanguage: 'csharp'
          }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              csharp: 'C#',
              javascript: 'JavaScript',
              typescript: 'TypeScript',
              html: 'HTML',
              css: 'CSS',
              sql: 'SQL'
            }
          }),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <ListsToggle />
                <CreateLink />
                <InsertTable />

                <ConditionalContents
                  options={[
                    {
                      when: (editor) =>
                        editor?.editorType === 'codeblock',
                      contents: () => (
                        <ChangeCodeMirrorLanguage />
                      )
                    },
                    {
                      fallback: () => (
                        <InsertCodeBlock />
                      )
                    }
                  ]}
                />
              </>
            )
          })
        ]}
      />

      <button
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem'
        }}
        onClick={() => {
          console.log(content)

          // Aqui você envia para a API
          // fetch('/api/materials', ...)
        }}
      >
        Salvar Material
      </button>

      <h2 style={{ marginTop: '2rem' }}>
        Markdown Gerado
      </h2>

      <pre
        style={{
          padding: '1rem',
          background: '#f5f5f5',
          overflow: 'auto'
        }}
      >
        {content}
      </pre>
    </div>
  )
}

export default App