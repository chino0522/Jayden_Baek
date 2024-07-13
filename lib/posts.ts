import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

// same folder as the posts directory, but for images since the image paths are idicated in the markdown files (ex. ![image](/posts/[name]/name.png))
const imagesDirectory = path.join(process.cwd(), 'public');
const placeholderImage = path.join(process.cwd(), 'public', 'placeholder.png');

// Helper function to recursively get all files in a directory
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
}

// Returns an array of file paths for all markdown files in the posts directory
export function getPostFiles(): string[] {
    const allFiles = getAllFiles(postsDirectory);
    return allFiles.filter(file => file.endsWith('.md'));
}

export function getPostDataBySlug(slug: string) {
    const postFilePath = path.join(postsDirectory, `${slug}/${slug}.md`);
    return getPostData(postFilePath);
}

export function getPostData(postFilePath: string) {
    const postSlug = path.basename(postFilePath, '.md');
    const fileContent = fs.readFileSync(postFilePath, 'utf-8');

    return {
        slug: postSlug,
        content: fileContent,
    };
}

function getImageBase64(imageFilePath: string): string {
    const imageData = fs.readFileSync(imageFilePath);
    return imageData.toString('base64');
}

interface PostData {
    slug: string;
    title: string;
    hashTags: string[];
    coverImageBase64: string | null;
    postCreatedDate: string;
}

export function getAllPostsTitleAndDate(): PostData[] {
    const postFiles = getPostFiles();

    const postMetadata: PostData[] = postFiles.map((postFile) => {
        const postData = getPostData(postFile);
        const postContent = postData.content ? postData.content.split('\n') : [];

        // assuming that the first line is the title and the third line is the hashtags (must follow this format for now)
        const postTitle = postContent[0] ? postContent[0].replace(/# /, '') : '';
        const hashTags = postContent[2] ? postContent[2].replace(/#### /, '').split(', ') : [];

        // get the creation date of the post
        const postBirthTime = fs.statSync(postFile).birthtime.toISOString();
        const postCreatedDate = postBirthTime.replace(/T.*/, '');

        // get the cover image of the post if it exists
        let imageUrl = postContent.find(line => line.startsWith('!'));
        let imageBase64: string | null = null;

        if (imageUrl) {
            imageUrl = imageUrl.replace(/!\[.*\]\(/, '').replace(/\)/, '');
            const imagePath = path.join(imagesDirectory, imageUrl);
            if (fs.existsSync(imagePath)) {
                imageBase64 = getImageBase64(imagePath);
            }
        } else {
            imageBase64 = getImageBase64(placeholderImage);
        }

        return {
            slug: postData.slug,
            title: postTitle,
            hashTags: hashTags,
            coverImageBase64: imageBase64,
            postCreatedDate: postCreatedDate,
        };
    });

    return postMetadata;
}
