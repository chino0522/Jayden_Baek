import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

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

export async function getPostDataBySlug(slug: string) {
    const postFilePath = path.join(postsDirectory, `${slug}/${slug}.md`);
    return await getPostData(postFilePath);
}

export async function getPostData(postFilePath: string) {
    const postSlug = path.basename(postFilePath, '.md');
    const fileContent = await new Promise<string>((resolve, reject) => {
        fs.readFile(postFilePath, 'utf-8', (err, data) => {
            if (err) {
                // Handle the error
                console.error(err);
                reject(err);
                return;
            }
        
            const fileContent = data;
            resolve(fileContent);
        });
    });

    return {
        slug: postSlug,
        content: fileContent,
    };
}

export async function getAllPostsTitleAndDate(): Promise<PostData[]> {
    const postFiles = getPostFiles();

    const postMetadata: PostData[] = await Promise.all(postFiles.map(async (postFile) => {
        const postData = await getPostData(postFile);
        const postContent = postData.content ? postData.content.split('\n') : [];

        // assuming that the first line is the title and the third line is the hashtags (must follow this format for now)
        const postTitle = postContent[0] ? postContent[0].replace(/# /, '') : '';
        const hashTags = postContent[2] ? postContent[2].replace(/#### /, '').split(', ').toString() : "";

        // get the creation date of the post
        const postBirthTime = fs.statSync(postFile).birthtime.toISOString();
        const postCreatedDate = postBirthTime.replace(/T.*/, '');

        // get the cover image of the post if it exists
        let imageUrl = postContent.find(line => line.startsWith('!'));

        if (imageUrl) {
            imageUrl = imageUrl.replace(/!\[.*\]\(/, '').replace(/\)/, '');
        }

        return {
            slug: postData.slug,
            title: postTitle,
            hashTags: hashTags,
            coverImagePath: imageUrl ? imageUrl : '/placeholder.png',
            postCreatedDate: postCreatedDate,
        };
    }));

    console.log(postMetadata);

    return postMetadata;
}

interface PostData {
    slug: string;
    title: string;
    hashTags: string;
    coverImagePath: string | null;
    postCreatedDate: string;
}
