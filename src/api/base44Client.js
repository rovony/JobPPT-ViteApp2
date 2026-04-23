/**
 * STANDALONE / OFFLINE STUB.
 *
 * The original base44 SDK client is replaced with a no-op mock so the
 * deck runs locally without a base44 backend. All entity CRUD returns
 * empty arrays / null. All functions no-op. Auth is always "ok, public".
 *
 * Swap this file out (git checkout -- src/api/base44Client.js) if/when
 * reconnecting to a real base44 backend.
 */

const makeEntityMock = (name) => ({
  list: async () => [],
  filter: async () => [],
  get: async () => null,
  create: async (data) => ({ id: `mock-${name}-${Date.now()}`, ...data }),
  update: async (id, data) => ({ id, ...data }),
  delete: async () => true,
  bulkCreate: async () => [],
  // Realtime subscription — return an unsubscribe function no-op.
  // Callers (useAudienceQuestions, etc.) expect (callback) => unsubscribe.
  subscribe: (..._args) => {
    return () => null; // no-op unsubscribe
  },
  onSnapshot: (..._args) => {
    return () => null;
  },
});

const makeFunctionMock = (name) => async (payload) => {
  console.warn(`[stub base44] function '${name}' invoked with`, payload, '— returning empty result');
  return { ok: true, stub: true, data: null };
};

// Consumers use base44.functions.invoke(name, payload). Route to the
// per-name mock so any unknown names also return the empty shape.
const functionsInvokeMock = async (name, payload) => {
  console.warn(`[stub base44] functions.invoke('${name}')`, payload);
  return { ok: true, stub: true, data: null };
};

// File upload integration — returns an empty file_url so DeckSourcesDialog
// doesn't crash when the admin tries to attach a PDF. The ingest function
// (which would actually process it) is already stubbed.
const integrationsMock = {
  Core: {
    UploadFile: async ({ file }) => {
      console.warn('[stub base44] integrations.Core.UploadFile — returning empty url', file);
      return { file_url: '' };
    },
  },
};

const authMock = {
  me: async () => ({
    id: 'local-user',
    full_name: 'Malek Okour (local)',
    email: 'local@standalone',
    role: 'admin',
  }),
  login: async () => null,
  logout: () => null,
  redirectToLogin: () => null,
  isAuthenticated: () => true,
};

const storageMock = {
  upload: async () => ({ url: '' }),
  uploadFile: async () => ({ url: '' }),
};

export const base44 = {
  auth: authMock,
  entities: {
    AudienceQuestion: makeEntityMock('AudienceQuestion'),
    SlideView: makeEntityMock('SlideView'),
    SpeakerNote: makeEntityMock('SpeakerNote'),
    DeckSource: makeEntityMock('DeckSource'),
  },
  functions: {
    // Direct access per function name (in case any consumer uses this shape)
    askPresenter: makeFunctionMock('askPresenter'),
    ingestDeckSource: makeFunctionMock('ingestDeckSource'),
    deleteDeckSource: makeFunctionMock('deleteDeckSource'),
    transcribeAudio: makeFunctionMock('transcribeAudio'),
    // Canonical SDK shape: invoke(name, payload)
    invoke: functionsInvokeMock,
  },
  storage: storageMock,
  integrations: integrationsMock,
  // Some SDK consumers call base44.{entityName} directly
  AudienceQuestion: makeEntityMock('AudienceQuestion'),
  SlideView: makeEntityMock('SlideView'),
  SpeakerNote: makeEntityMock('SpeakerNote'),
  DeckSource: makeEntityMock('DeckSource'),
};
