/**
 * transcribeAudio — OpenAI Whisper transcription for push-to-talk input.
 *
 * Input:  { file_url: string }  — URL of a previously uploaded audio file
 *                                  (webm/ogg/wav/mp3). Uploaded via
 *                                  base44.integrations.Core.UploadFile on the client.
 * Output: { text: string }      — the transcribed text
 *
 * Called by PresenterAssistant when the user releases push-to-talk.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const OPENAI_URL = 'https://api.openai.com/v1/audio/transcriptions';
const MODEL = 'whisper-1';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    // auth.me() THROWS a 401 Base44Error when there's no session, it
    // doesn't return null. Catching it here so a missing session
    // returns a clean 401 JSON instead of bubbling up as a 500.
    let user = null;
    try {
      user = await base44.auth.me();
    } catch (_authErr) {
      user = null;
    }
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { file_url } = await req.json();
    if (!file_url) return Response.json({ error: 'file_url required' }, { status: 400 });

    const key = Deno.env.get('OPENAI_API_KEY');
    if (!key) return Response.json({ error: 'OPENAI_API_KEY not set' }, { status: 500 });

    // Fetch the audio bytes from storage
    const audioRes = await fetch(file_url);
    if (!audioRes.ok) {
      return Response.json({ error: `Failed to fetch audio: ${audioRes.status}` }, { status: 500 });
    }
    const blob = await audioRes.blob();

    // Whisper rejects <0.1s clips with a cryptic 400. Catch small/empty blobs early
    // with a clear message so the UI can tell the user to hold the mic longer.
    if (blob.size < 1024) {
      return Response.json(
        { error: 'Recording too short — hold the mic for at least half a second.' },
        { status: 400 },
      );
    }

    // Derive a filename Whisper will accept (it needs an extension)
    const urlPath = new URL(file_url).pathname;
    const ext = urlPath.split('.').pop()?.toLowerCase() || 'webm';
    const filename = `audio.${ext}`;

    const form = new FormData();
    form.append('file', blob, filename);
    form.append('model', MODEL);
    form.append('response_format', 'json');

    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}` },
      body: form,
    });
    if (!res.ok) {
      const text = await res.text();
      return Response.json({ error: `Whisper failed (${res.status}): ${text.slice(0, 300)}` }, { status: 500 });
    }
    const data = await res.json();
    return Response.json({ text: (data?.text || '').trim() });
  } catch (error) {
    console.error('transcribeAudio failed:', error);
    return Response.json({ error: String(error?.message || error) }, { status: 500 });
  }
});