import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');
const imagesDirectory = path.join(process.cwd(), 'public');

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

function getImageBase64(imagePath: string) {
    const imageFilePath = path.join(imagesDirectory, imagePath);
    const imageData = fs.readFileSync(imageFilePath);
    return imageData.toString('base64');
}
export function getAllPostsTitleAndDate() {
    const postFiles = getPostFiles();

    const titleAndDates = postFiles.map((postFile) => {
        const postSlug = postFile.replace(/\.md$/, '');
        const postData = getPostData(postFile);
        const postContent = postData.content ? postData.content.split('\n') : [];

        const postTitle = postContent[0] ? postContent[0].replace(/# /, '') : '';
        const hashTags = postContent[2] ? postContent[2].replace(/#### /, '') : [];
        const postBirthTime = fs.statSync(path.join(postsDirectory, postFile)).birthtime.toISOString();
        const postCreatedDate = postBirthTime.replace(/T.*/, '');
        const postCreatedTime = null;

        let imageUrl = postContent.find(line => line.startsWith('!'));
        let imageBase64 = null;

        if (imageUrl) {
            imageUrl = imageUrl.replace(/!\[.*\]\(/, '').replace(/\)/, '');
            if (fs.existsSync(path.join(imagesDirectory, imageUrl))) {
                imageBase64 = getImageBase64(imageUrl);
            }
        }

        if (!imageBase64) {
            imageBase64 = getImageBase64('/posts/placeholder.png');
        }

        return {
            slug: postSlug,
            title: postTitle,
            hashTags: hashTags,
            coverImageBase64: imageBase64,
            postCreatedDate: postCreatedDate,
            postCreatedTime: postCreatedTime,
        }
    });

    return titleAndDates;
}
