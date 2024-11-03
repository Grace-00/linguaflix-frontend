import { NextResponse } from 'next/server';
import axios from 'axios';
import { TMDB_API_KEY } from '@/app/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  if (!TMDB_API_KEY) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/tv`, {
      params: {
        query,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
