import { ParseOutput, Parser } from '@asyncapi/parser';
// import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'
// import base64Decoder from 'js-base64';

const parser = new Parser();

async function fetchResource(url: string | null, base64: string | null): Promise<ParseOutput | null> {
  if (!url && !base64) {
    return null;
  }

  let content = '';
  if (url) {
    content = await fetch(url).then((res) => res.text());
  } else if (base64) {
    // content = base64Decoder.decode(base64);
    content = base64;
  }

  return await parser.parse(content);
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const output = await fetchResource(url.searchParams.get('url'), url.searchParams.get('base64'));

  if (!output || output &&output?.diagnostics.length > 0) {
    // failed to parse, return default image
  } else {
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
          {output.document?.info().title() || 'AsyncAPI'}
        </div>
      )
    )
  }
}

