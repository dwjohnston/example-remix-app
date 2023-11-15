import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
      <li>
          <Link to ="/test/basic_mdx">Basic MDX</Link>
        </li>
        <li>
        <Link to ="/test/external_component">External Component</Link>

        </li>
        <li>
        <Link to ="/test/frontmatter">Frontmatter</Link>

        </li>
        <li>
        <Link to ="/test/images">Images</Link>
        </li>
      </ul>
    </div>
  );
}
