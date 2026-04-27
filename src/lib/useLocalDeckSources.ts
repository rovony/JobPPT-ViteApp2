// @ts-nocheck
/**
 * useLocalDeckSources — localStorage-backed deck source management.
 *
 * Replaces the base44 DeckSource entity for local/offline operation.
 * Stores uploaded file text content in localStorage so the AI assistant
 * can ground its answers in user-provided reference material.
 *
 * Supports: .txt, .md, .csv, .tsv (read via FileReader.readAsText)
 * Future: .pdf (requires pdf.js), .docx (requires mammoth.js)
 */
import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY_PREFIX = 'deck-sources:';

export interface LocalDeckSource {
  id: string;
  deck_id: string;
  title: string;
  file_type: string;
  size_bytes: number;
  content: string;
  status: 'ready' | 'failed';
  error?: string;
  chunk_count: number;
  created_date: string;
}

const TEXT_EXTENSIONS = new Set(['txt', 'md', 'csv', 'tsv', 'json', 'xml', 'html', 'htm']);

function storageKey(deckId: string) {
  return `${STORAGE_KEY_PREFIX}${deckId}`;
}

function loadSources(deckId: string): LocalDeckSource[] {
  try {
    const raw = localStorage.getItem(storageKey(deckId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSources(deckId: string, sources: LocalDeckSource[]) {
  localStorage.setItem(storageKey(deckId), JSON.stringify(sources));
}

function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
    reader.readAsText(file);
  });
}

function estimateChunks(content: string): number {
  const CHUNK_SIZE = 600;
  return Math.max(1, Math.ceil(content.length / CHUNK_SIZE));
}

export function useLocalDeckSources(deckId: string) {
  const [sources, setSources] = useState<LocalDeckSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!deckId) return;
    setSources(loadSources(deckId));
    setLoading(false);
  }, [deckId]);

  const refresh = useCallback(() => {
    if (!deckId) return;
    setSources(loadSources(deckId));
    setLoading(false);
  }, [deckId]);

  const uploadFiles = useCallback(async (files: File[]) => {
    if (!deckId || !files.length) return;
    setUploading(true);
    const current = loadSources(deckId);

    for (const file of files) {
      const ext = (file.name.split('.').pop() || '').toLowerCase();
      const isText = TEXT_EXTENSIONS.has(ext);

      if (!isText) {
        current.push({
          id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          deck_id: deckId,
          title: file.name,
          file_type: ext || 'bin',
          size_bytes: file.size,
          content: '',
          status: 'failed',
          error: `Unsupported file type (.${ext}). Use .txt or .md files.`,
          chunk_count: 0,
          created_date: new Date().toISOString(),
        });
        continue;
      }

      try {
        const content = await readTextFile(file);
        current.push({
          id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          deck_id: deckId,
          title: file.name,
          file_type: ext,
          size_bytes: file.size,
          content,
          status: 'ready',
          chunk_count: estimateChunks(content),
          created_date: new Date().toISOString(),
        });
      } catch (err) {
        current.push({
          id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          deck_id: deckId,
          title: file.name,
          file_type: ext,
          size_bytes: file.size,
          content: '',
          status: 'failed',
          error: err instanceof Error ? err.message : 'Read failed',
          chunk_count: 0,
          created_date: new Date().toISOString(),
        });
      }
    }

    saveSources(deckId, current);
    setSources([...current]);
    setUploading(false);
  }, [deckId]);

  const deleteSource = useCallback((sourceId: string) => {
    if (!deckId) return;
    const current = loadSources(deckId).filter((s) => s.id !== sourceId);
    saveSources(deckId, current);
    setSources(current);
  }, [deckId]);

  return { sources, loading, uploading, uploadFiles, deleteSource, refresh };
}

/**
 * getLocalDeckSources — non-hook accessor for use in aiLocalClient.
 * Returns all ready sources for a given deck as an array of { title, content }.
 */
export function getLocalDeckSources(deckId: string): Array<{ title: string; content: string }> {
  if (!deckId) return [];
  return loadSources(deckId)
    .filter((s) => s.status === 'ready' && s.content)
    .map((s) => ({ title: s.title, content: s.content }));
}
