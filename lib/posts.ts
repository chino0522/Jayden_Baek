import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

// Helper function to recursively get all files in a directory
async function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): Promise<string[]> {
    const files = await fs.promises.readdir(dirPath);

    await Promise.all(files.map(async (file) => {
        const filePath = path.join(dirPath, file);
        const stat = await fs.promises.stat(filePath);
        if (stat.isDirectory()) {
            arrayOfFiles = await getAllFiles(filePath, arrayOfFiles);
        } else {
            arrayOfFiles.push(filePath);
        }
    }));

    return arrayOfFiles;
}

// Returns an array of file paths for all markdown files in the posts directory
export async function getPostFiles(): Promise<string[]> {
    const allFiles = await getAllFiles(postsDirectory);
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
    const postFiles = await getPostFiles();

    const postMetadata: PostData[] = await Promise.all(postFiles.map(async (postFile) => {
        const postData = await getPostData(postFile);
        const postContent = postData.content ? postData.content.split('\n') : [];

        // assuming that the first line is the title, the third line is the hashtags, and the fourth line is the created date (must follow this format for now)
        const postTitle = postContent[0] ? postContent[0].replace(/# /, '') : '';
        const hashTags = postContent[2] ? postContent[2].replace(/#### /, '').split(', ').toString() : "";
        const createdDate = postContent[3] ? postContent[3].replace(/#### /, '') : "";

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
            postCreatedDate: createdDate,
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
