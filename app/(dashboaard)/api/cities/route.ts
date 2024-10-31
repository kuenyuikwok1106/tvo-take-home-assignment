'use server';
import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest){
    const queryString = request.nextUrl.searchParams.get('queryString');
    const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${queryString}&limit=5&appid=${process.env.OPEN_MAP_API as string}`
    );
    const data = await res.json();
    return NextResponse.json(data);
}