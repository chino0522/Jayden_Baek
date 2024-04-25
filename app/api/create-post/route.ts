import getDatabase from '../hooks/getDatabase';

export async function POST(req: Request) {
    const supabase = await getDatabase()
    const { title, content } = await req.json()
    
}