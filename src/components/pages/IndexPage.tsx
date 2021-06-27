import { Box, Button } from "@chakra-ui/react";
import { EditorState, EditorView } from "@codemirror/basic-setup";
import { lineNumbers } from "@codemirror/gutter";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState, VFC } from "react";

export const Editor: VFC<{ doc: string }> = ({ doc }) => {
  const [view, setView] = useState<EditorView | null>(null);
  const editorRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (editorRef.current === null) return;
    const view = new EditorView({
      state: EditorState.create({
        doc,
        extensions: [
          lineNumbers({}),
          EditorView.lineWrapping,
          markdown(),
          oneDark,
        ],
      }),
      parent: editorRef.current,
    });
    setView(view);
    return () => {
      view.destroy();
      setView(null);
    };
  }, [editorRef, doc]);
  return (
    <Box>
      <section ref={editorRef} />
      <Button onClick={() => console.log(view?.state.doc.toJSON())}>
        書き出し
      </Button>
    </Box>
  );
};

const doc = `
Markdown: Basics
================

Getting the Gist of Markdown's Formatting Syntax
------------------------------------------------

This page offers a brief overview of what it's like to use Markdown.
The [syntax page] [s] provides complete, detailed documentation for
every feature, but Markdown should be very easy to pick up simply by
looking at a few examples of it in action. The examples on this page
are written in a before/after style, showing example syntax and the
HTML output produced by Markdown.

It's also helpful to simply try Markdown out; the [Dingus] [d] is a
web application that allows you type your own Markdown-formatted text
and translate it to XHTML.

**Note:** This document is itself written using Markdown; you
can [see the source for it by adding '.text' to the URL] [src].

  [s]: /projects/markdown/syntax  "Markdown Syntax"
  [d]: /projects/markdown/dingus  "Markdown Dingus"
  [src]: /projects/markdown/basics.text


## Paragraphs, Headers, Blockquotes ##
`;
export const IndexPage: NextPage = () => (
  <article>
    <Head>
      <title>kani.tech</title>
    </Head>
    <h1>カニのページ🦀</h1>
    <Editor doc={doc} />
    <Link href={"/entries"}>
      <a>ページ一覧</a>
    </Link>
  </article>
);
