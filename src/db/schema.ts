import { pgTable, uuid, varchar, text, timestamp, boolean, integer, jsonb, primaryKey, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const itemStatusEnum = pgEnum('item_status', ['draft', 'review', 'locked', 'archived']);
export const deckVariantEnum = pgEnum('deck_variant', ['clinical_pharmacology', 'pharmacometrics']);
export const userRoleEnum = pgEnum('user_role', ['admin', 'presenter', 'reviewer', 'viewer']);

// Users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: userRoleEnum('role').default('viewer'),
  isEmailVerified: boolean('is_email_verified').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  lastLogin: timestamp('last_login', { withTimezone: true }),
});

// Verification Tokens
export const verificationTokens = pgTable('verification_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'email_verification' or 'password_reset'
});

// Active Sessions
export const activeSessions = pgTable('active_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  refreshToken: varchar('refresh_token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});


// Folders
export const folders = pgTable('folders', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  parentId: uuid('parent_id'),
  ownerId: uuid('owner_id').references(() => users.id, { onDelete: 'cascade' }),
  icon: varchar('icon', { length: 50 }),
  colorBadge: varchar('color_badge', { length: 50 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Decks
export const decks = pgTable('decks', {
  id: uuid('id').primaryKey().defaultRandom(),
  folderId: uuid('folder_id').references(() => folders.id, { onDelete: 'set null' }),
  ownerId: uuid('owner_id').references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  versionId: varchar('version_id', { length: 50 }),
  variant: deckVariantEnum('variant').default('clinical_pharmacology'),
  status: itemStatusEnum('status').default('draft'),
  layoutEnabled: boolean('layout_enabled').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Slides
export const slides = pgTable('slides', {
  id: uuid('id').primaryKey().defaultRandom(),
  deckId: uuid('deck_id').references(() => decks.id, { onDelete: 'cascade' }),
  slideIdentifier: varchar('slide_identifier', { length: 100 }).notNull(),
  assertionTitle: text('assertion_title').notNull(),
  componentPath: varchar('component_path', { length: 255 }),
  orderIndex: integer('order_index').notNull(),
  isTitleSlide: boolean('is_title_slide').default(false),
  contentPayload: jsonb('content_payload'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Notes
export const slideNotes = pgTable('slide_notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  slideId: uuid('slide_id').references(() => slides.id, { onDelete: 'cascade' }).unique(),
  spokenText: text('spoken_text'),
  cuesText: text('cues_text'),
  bridgeText: text('bridge_text'),
});

// Q&A
export const slideQa = pgTable('slide_qa', {
  id: uuid('id').primaryKey().defaultRandom(),
  slideId: uuid('slide_id').references(() => slides.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  difficulty: integer('difficulty'),
  tagTopic: varchar('tag_topic', { length: 100 }),
  ifPressed: text('if_pressed'),
});

// Tags
export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  color: varchar('color', { length: 50 }).default('slate'),
});

// Slide Tags Junction
export const slideTags = pgTable('slide_tags', {
  slideId: uuid('slide_id').notNull().references(() => slides.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.slideId, table.tagId] })
}));

// Relations
export const foldersRelations = relations(folders, ({ many, one }) => ({
  children: many(folders, { relationName: 'folderToFolder' }),
  parent: one(folders, {
    fields: [folders.parentId],
    references: [folders.id],
    relationName: 'folderToFolder',
  }),
  decks: many(decks),
}));

export const decksRelations = relations(decks, ({ one, many }) => ({
  folder: one(folders, {
    fields: [decks.folderId],
    references: [folders.id],
  }),
  slides: many(slides),
}));

export const slidesRelations = relations(slides, ({ one, many }) => ({
  deck: one(decks, {
    fields: [slides.deckId],
    references: [decks.id],
  }),
  notes: one(slideNotes, {
    fields: [slides.id],
    references: [slideNotes.slideId],
  }),
  qa: many(slideQa),
  tags: many(slideTags),
}));

export const slideTagsRelations = relations(slideTags, ({ one }) => ({
  slide: one(slides, {
    fields: [slideTags.slideId],
    references: [slides.id],
  }),
  tag: one(tags, {
    fields: [slideTags.tagId],
    references: [tags.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  folders: many(folders),
  decks: many(decks),
  sessions: many(activeSessions),
  verificationTokens: many(verificationTokens),
}));

export const verificationTokensRelations = relations(verificationTokens, ({ one }) => ({
  user: one(users, {
    fields: [verificationTokens.userId],
    references: [users.id],
  }),
}));

export const activeSessionsRelations = relations(activeSessions, ({ one }) => ({
  user: one(users, {
    fields: [activeSessions.userId],
    references: [users.id],
  }),
}));
