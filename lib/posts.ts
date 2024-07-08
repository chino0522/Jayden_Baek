import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostFiles() {
    return fs.readdirSync(postsDirectory).reverse();
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
        const postData = getPostData(postFile);
        const postContent = postData.content ? postData.content.split('\n') : [];

        const postTitle = postContent[0] ? postContent[0].replace(/# /, '') : '';
        const hashTags = postContent[2] ? postContent[2].replace(/#### /, '') : [];
        const postCreatedAt = (fs.statSync(path.join(postsDirectory, postFile)).birthtime).toISOString().replace(/T.*/, '');

        return {
            slug: postSlug,
            title: postTitle,
            hashTags: hashTags,
            createdAt: postCreatedAt,
        }
    });

    return titleAndDates;
}
