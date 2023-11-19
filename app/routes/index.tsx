import type { DataFunctionArgs } from "@remix-run/node";
import {  useLoaderData } from "@remix-run/react";
import type { Frontmatter} from "~/utils/blogPost.server";
import { getPosts } from "~/utils/blogPost.server";

export async function loader(data: DataFunctionArgs) {
  const posts = await getPosts();
  return posts;
}

function ListOfBlogPosts() {
  const data = useLoaderData<Array<{
    slug: string; 
    frontmatter: Frontmatter;
  }>>(); 
  return <>
      {data.map((v) => {
          return <BlogItem item={v} key={v.slug}/>
        })}
  </>
}

function BlogItem(props: {
  item: {
    slug: string; 
    frontmatter: Frontmatter;
  }
}) {

  const {item} = props
  return <div className= "blog-item">
    <a href={`/test/${item.slug}`}> <h3>{item.frontmatter.meta?.title ?? item.slug} </h3></a>
    <p>{item.frontmatter.meta?.description}</p>

  </div>
}


export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ListOfBlogPosts/>
    </div>
  );
}
