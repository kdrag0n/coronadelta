import { promises as fs } from "fs";
import path from "path";
import grayMatter from "gray-matter";
import { pageDir } from "./_config.js";

async function getPages() {
    let files = await fs.readdir(pageDir);
    let pages = [];

    for (const fileName of files) {
        if (!fileName.endsWith(".md")) {
            continue;
        }

        const post = await fs.readFile(path.resolve(pageDir, fileName), "utf-8");
        const slug = fileName.replace(/\.md$/, "");
        const frontMatter = grayMatter(post);

        // default true
        if (frontMatter.data.index !== false) {
            pages.push({
                slug,
                ...frontMatter.data
            });
        }
    }

    return pages;
}

export async function get(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    let pages = await getPages();
    res.end(JSON.stringify(pages));
}
