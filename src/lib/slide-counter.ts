/**
 * Talk-path slide numbering — excludes backup / archive slides from the
 * displayed NN / TT counter while leaving full-deck navigation intact.
 *
 * Detection (any match → backup):
 *   • slide.backup === true
 *   • id / section / sectionId contains "backup"
 *   • title starts with "Backup" / "BACKUP"
 *   • path / file / src contains "_Archive" or ".old"
 */

export function isBackupSlide(slide) {
  if (!slide || typeof slide !== 'object') return false;
  if (slide.backup === true) return true;

  const id = String(slide.id ?? '').toLowerCase();
  const section = String(slide.section ?? slide.sectionId ?? '').toLowerCase();
  const path = String(slide.path ?? slide.file ?? slide.src ?? '').toLowerCase();
  const title = String(slide.title ?? '').trim();

  if (id.includes('backup')) return true;
  if (section.includes('backup')) return true;
  if (/^backup\b/i.test(title)) return true;
  if (path.includes('_archive') || path.includes('.old')) return true;

  return false;
}

/**
 * @returns {{
 *   isBackup: boolean,
 *   displayIndex: number,   // 1-based within main or backup set
 *   displayTotal: number,   // size of that set
 *   mainTotal: number,
 *   backupTotal: number,
 * }}
 */
export function getTalkSlideCounter(slides, absoluteIndex) {
  const list = Array.isArray(slides) ? slides : [];
  const mainIdxs = [];
  const backupIdxs = [];

  for (let i = 0; i < list.length; i += 1) {
    if (isBackupSlide(list[i])) backupIdxs.push(i);
    else mainIdxs.push(i);
  }

  const onBackup = isBackupSlide(list[absoluteIndex]);
  if (onBackup) {
    const bi = backupIdxs.indexOf(absoluteIndex);
    return {
      isBackup: true,
      displayIndex: bi >= 0 ? bi + 1 : 0,
      displayTotal: backupIdxs.length,
      mainTotal: mainIdxs.length,
      backupTotal: backupIdxs.length,
    };
  }

  const mi = mainIdxs.indexOf(absoluteIndex);
  return {
    isBackup: false,
    displayIndex: mi >= 0 ? mi + 1 : absoluteIndex + 1,
    displayTotal: mainIdxs.length || list.length,
    mainTotal: mainIdxs.length || list.length,
    backupTotal: backupIdxs.length,
  };
}

/** Pill / footer text: `04 / 50` on the talk path, `B 03 / 58` in backup. */
export function formatTalkSlideCounter(slides, absoluteIndex) {
  const c = getTalkSlideCounter(slides, absoluteIndex);
  const cur = String(c.displayIndex).padStart(2, '0');
  const tot = String(c.displayTotal).padStart(2, '0');
  if (c.isBackup) return `B ${cur} / ${tot}`;
  return `${cur} / ${tot}`;
}
