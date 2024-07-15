import { getAllPostsTitleAndDate } from '@/lib/posts';
import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET() {
    return new NextResponse(JSON.stringify(await getAllPostsTitleAndDate()));
}