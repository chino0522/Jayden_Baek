import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostFiles() {
    return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string) {
    const postSlug = postIdentifier.replace(/\.md$/, ''); // Removes the file extension
    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    return {
        slug: postSlug,
        content: fileContent,
    };
}

export function getAllPostsTitleAndDate() {
    const postFiles = getPostFiles();

    const titleAndDates = postFiles.map((postFile) => {
        const postSlug = postFile.replace(/\.md$/, '');
        const postTitle = getPostData(postFile).content.split('\n')[0].replace(/# /, '');
        const postCreatedAt = (fs.statSync(path.join(postsDirectory, postFile)).birthtime).toISOString().replace(/T.*/, '');

        return {
            slug: postSlug,
            title: postTitle,
            createdAt: postCreatedAt,
        }
    })

    return titleAndDates;
}
