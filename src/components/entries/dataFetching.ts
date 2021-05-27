import { GetStaticProps } from "next";
import { getEntryPageList } from "../../constants/EntryPageList";
import { EntryListProps } from "./types";
import { FrontMatter } from "../../@types/mdx";

export const getEntryPageStaticProps: GetStaticProps<EntryListProps> =
  async () => {
    const entryPageList = await getEntryPageList();
    return { props: { entryPageList } };
  };

const DEFAULT_FRONTMATTER: FrontMatter = {
  title: "",
};

export const getEntryMeta: GetStaticProps<{ frontMatter: FrontMatter }> =
  async (ctx) => {
    if (!ctx.params) return { props: { frontMatter: DEFAULT_FRONTMATTER } };
    const { pid } = ctx.params;

    if (typeof pid !== "string")
      return { props: { frontMatter: DEFAULT_FRONTMATTER } };
    /*
          if (!(pid in (await getEntryPageList())))
            return { props: { frontMatter: DEFAULT_FRONTMATTER } };
          const { frontMatter } = await import(`../../entries/${pid}.mdx`);
    
           */
    return { props: { frontMatter: { title: pid } } };
  };
