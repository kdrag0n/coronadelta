import path from "path";
import fs from "fs";
import grayMatter from "gray-matter";
import marked from "marked";
import { pageDir } from "./_config.js";

function getPost(fileName) {
    return fs.readFileSync(path.resolve(pageDir, `${fileName}.md`), "utf-8");
}

const renderer = new marked.Renderer();

export function get(req, res, next) {
    // Available due to "[slug]" filename
    const { slug } = req.params;

    // Get markdown text
    const post = getPost(slug);

    // Parse front matter and content
    const { data, content } = grayMatter(post);
    const html = marked(content, { renderer });

    if (html) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            html,
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
