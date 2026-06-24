// Schema: two object stores, opened once and shared via a module-level singleton.
//   snapshots — keyPath: 'id', index on 'createdAt' for chronological listing
//   settings  — keyPath: 'key', simple key→value for preferences

import type { CellStyle } from './types';

export type SnapshotMeta = {
    id: string;
    name: string;
    cols: number;
    rows: number;
    createdAt: number;
};

export type SnapshotData = SnapshotMeta & {
    chars: string[][];
    cellStyles: Array<Array<CellStyle | null>>;
};

// ===== IDB connection =====

const DB_NAME = 'editor';
const DB_VERSION = 1;

// Module-level singleton — openDb() is called lazily on first use.
let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
    if (dbPromise) return dbPromise;

    dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // onupgradeneeded runs when the database is created for the first time,
        // or when DB_VERSION is bumped. This is where schema changes live.
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            if (!db.objectStoreNames.contains('snapshots')) {
                const store = db.createObjectStore('snapshots', { keyPath: 'id' });
                // Index lets us sort by creation time without scanning all rows.
                store.createIndex('createdAt', 'createdAt');
            }

            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'key' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    return dbPromise;
}

// Thin helper: wraps a single IDB request in a Promise.
// `mode` is 'readonly' for queries, 'readwrite' for mutations.
function idbOp<T>(
    storeName: string,
    mode: IDBTransactionMode,
    fn: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
    return openDb().then(
        (db) =>
            new Promise<T>((resolve, reject) => {
                const tx = db.transaction(storeName, mode);
                const store = tx.objectStore(storeName);
                const request = fn(store);

                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            }),
    );
}

// ===== Public API =====

export async function saveSnapshot(
    id: string,
    name: string,
    cols: number,
    rows: number,
    chars: string[][],
    cellStyles: Array<Array<CellStyle | null>>,
): Promise<void> {
    const record: SnapshotData = { id, name, cols, rows, chars, cellStyles, createdAt: Date.now() };

    // 'put' inserts or replaces — safe to call multiple times with the same id.
    await idbOp('snapshots', 'readwrite', (store) => store.put(record));
}

export async function loadSnapshot(id: string): Promise<SnapshotData | null> {
    const result = await idbOp<SnapshotData | undefined>('snapshots', 'readonly', (store) => store.get(id));

    return result ?? null;
}

export async function listSnapshots(): Promise<SnapshotMeta[]> {
    return new Promise<SnapshotMeta[]>((resolve, reject) => {
        openDb().then((db) => {
            const tx = db.transaction('snapshots', 'readonly');
            const index = tx.objectStore('snapshots').index('createdAt');

            // IDBKeyRange.lowerBound(0) covers all records; 'prev' direction = newest first.
            const request = index.openCursor(IDBKeyRange.lowerBound(0), 'prev');
            const results: SnapshotMeta[] = [];

            request.onsuccess = () => {
                const cursor = request.result;

                if (!cursor) {
                    resolve(results);
                    return;
                }

                const { id, name, cols, rows, createdAt } = cursor.value as SnapshotData;

                results.push({ id, name, cols, rows, createdAt });
                cursor.continue();
            };

            request.onerror = () => reject(request.error);
        }).catch(reject);
    });
}

export async function saveSetting(key: string, value: string): Promise<void> {
    await idbOp('settings', 'readwrite', (store) => store.put({ key, value }));
}

export async function loadSetting(key: string): Promise<string | null> {
    const result = await idbOp<{ key: string; value: string } | undefined>(
        'settings',
        'readonly',
        (store) => store.get(key),
    );

    return result?.value ?? null;
}
