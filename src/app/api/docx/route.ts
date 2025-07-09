// src/app/api/docx/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const remoteUrl = 'https://calibre-ebook.com/downloads/demos/demo.docx';

  try {
    const response = await fetch(remoteUrl);

    console.log('response ---', response);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch .docx' }, { status: 500 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'inline; filename="demo.docx"',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
