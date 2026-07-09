import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./App.css";


const defaultMarkdown = `
# Meu Markdown

Texto com **negrito**, *itálico* e ~~riscado~~.

---

## Lista

- React
- TypeScript
- Markdown


## Checklist

- [x] Instalar react-markdown
- [x] Criar preview
- [ ] Publicar projeto


## Tabela

| Tecnologia | Uso |
|---|---|
| React | Frontend |
| TS | Tipagem |


## Código

\`\`\`tsx
function App() {
  return (
    <h1>Hello World</h1>
  );
}
\`\`\`

> Exemplo de bloco de citação.

[Abrir Google](https://google.com)
`;


export default function App() {

  const [markdown, setMarkdown] =
    useState(defaultMarkdown);


  return (
    <main className="container">

      <section className="editor">
        <h2>Editor</h2>

        <textarea
          value={markdown}
          onChange={(e) =>
            setMarkdown(e.target.value)
          }
        />
      </section>


      <section className="preview">

        <h2>Preview</h2>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}

          components={{

            h1({ children }) {
              return (
                <h1 className="title">
                  {children}
                </h1>
              );
            },


            a({ href, children }) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {children}
                </a>
              );
            },


            blockquote({ children }) {
              return (
                <blockquote className="quote">
                  {children}
                </blockquote>
              );
            },


            code({
              children,
              className
            }) {

              const match =
                /language-(\w+)/
                .exec(className || "");


              return match ? (

                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children)}
                </SyntaxHighlighter>

              ) : (

                <code className="inline-code">
                  {children}
                </code>

              );
            }

          }}

        >
          {markdown}

        </ReactMarkdown>

      </section>

    </main>
  );
}