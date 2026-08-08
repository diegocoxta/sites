import slugify from 'slugify';

import { Field, Note } from './types';

export function cleanName(name: string) {
  return name.replace(/\s\(\d+\)$/, '').trim();
}

export function slug(name: string) {
  return slugify(name, { lower: true });
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    timeZone: 'UTC',
    month: 'long',
    year: 'numeric',
  });
}

export function mergeNoteData(notes?: Note[], customFields?: Field[]) {
  return (
    notes &&
    notes.map((note) => {
      const field = customFields?.find((field) => field.id === note.field_id);
      return { ...note, ...field };
    })
  );
}
