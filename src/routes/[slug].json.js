import path from "path";
import { promises as fs } from "fs";
import grayMatter from "gray-matter";
import marked from "marked";
import { pageDir } from "./_config.js";

async function getPost(slug) {
    return await fs.readFile(path.resolve(pageDir, `${slug}.md`), "utf-8");
}

const renderer = new marked.Renderer();

export async function get(req, res, next) {
    // Available due to "[slug]" filename
    const { slug } = req.params;

    // Get markdown text
    const post = await getPost(slug);

    // Parse front matter and content
    const { data, content } = grayMatter(post);
    const html = marked(content, { renderer });

    if (html) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            html,
            slug,
            ...data
        }));
    } else {
        res.writeHead(404, {
            "Content-Type": "application/json"
        });

        res.end(
            JSON.stringify({
                message: `Page '${slug}' not found`
            })
        );
    }
}
