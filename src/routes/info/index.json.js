import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";
import { pageDir } from "./_config.js";

function getPages() {
    return fs.readdirSync(pageDir).map(fileName => {
        const post = fs.readFileSync(path.resolve(pageDir, fileName), "utf-8");
        return grayMatter(post).data;
    });
}

const pages = JSON.stringify(getPages());

export function get(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(pages);
}
