import { useMemo } from "react";


import {  useLoaderData, } from "@remix-run/react"

import type { DataFunctionArgs, LoaderFunction} from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getMDXComponent } from "mdx-bundler/client/index.js";
import type { Frontmatter} from "../utils/blogPost.server";
import { getPost } from "../utils/blogPost.server";
import type { V1_MetaFunction } from "@remix-run/react/dist/routeModules";


type LoaderData = {
    frontmatter: any;
    code: string;
};

export const loader: LoaderFunction = async ({ params, request }: DataFunctionArgs) => {
    const slug = params["*"];
    if (!slug) throw new Response("Not found", { status: 404 });

    const post = await getPost(slug);
    if (post) {
        const { frontmatter, code } = post;

        console.log(post)
        return json({ frontmatter, code });
    } else {
        throw new Response("Not found", { status: 404 });
    }

    return  null;
};

export const meta: V1_MetaFunction = (arg) => {
    const frontmatter = arg.data.frontmatter as Frontmatter; 
    const title = frontmatter.meta?.title ?? "Black Sheep Code"; 
    const description = frontmatter.meta?.description ?? undefined

    return {
      title,
      description, 
      "og:twitter:title": title, 
      "og:twitter:description": description,
    };
  };


function PostHeader(props: {
    frontmatter: Frontmatter;
}) {

    const { frontmatter } = props;
   

    // We can implement whatever we want here
    return <>
        {JSON.stringify(frontmatter, null, 2)}
    </>
}

export default function Post() {
    const { code, frontmatter } = useLoaderData<LoaderData>();
    const Component = useMemo(() => getMDXComponent(code), [code]);


    return (
        <>
            <PostHeader frontmatter={frontmatter} />
            <Component />  
        </>
    );
}


