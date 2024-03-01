import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'

export default async function handler(req: Request, context: Context) {
  const url = new URL(req.url);
  const text = url.searchParams.get('base64');
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 128,
          background: 'lavender',
        }}
      >
        ${text}
      </div>
    )
  )
}