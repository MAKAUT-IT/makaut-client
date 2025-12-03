// src/pages/Gallery.tsx
import React, { useEffect, useMemo, useState } from "react";

type Album = {
  id: string;
  name: string;
  category?: string;
  coverUrl?: string;
  photoCount?: number;
};

type Photo = {
  id: string;
  title?: string;
  url: string;
  albumId?: string;
  category?: string;
  tags?: string[];
};

export default function Gallery() {
  // Change apiBaseUrl if your API lives at a different path
  const apiBaseUrl = "http://localhost:3000/api";

  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
  let cancelled = false;
  async function load() {
    setLoading(true);
    setError(null);

    try {
      // try fetch albums
      const aRes = await fetch(`${apiBaseUrl}/albums`);
      let aJson: Album[] = [];

      if (aRes.ok) {
        const aType = aRes.headers.get('content-type') || '';
        if (aType.includes('application/json')) {
          aJson = (await aRes.json()) as Album[];
        } else {
          // server returned HTML (likely index.html) or plain text
          throw new Error(`Expected JSON from ${apiBaseUrl}/albums but got ${aType || 'non-json response'}`);
        }
      } else {
        // non-OK status
        throw new Error(`Albums request failed: ${aRes.status} ${aRes.statusText}`);
      }

      // try fetch photos
      const pRes = await fetch(`${apiBaseUrl}/photos`);
      let pJson: Photo[] = [];
      if (pRes.ok) {
        const pType = pRes.headers.get('content-type') || '';
        if (pType.includes('application/json')) {
          pJson = (await pRes.json()) as Photo[];
        } else {
          throw new Error(`Expected JSON from ${apiBaseUrl}/photos but got ${pType || 'non-json response'}`);
        }
      } else {
        throw new Error(`Photos request failed: ${pRes.status} ${pRes.statusText}`);
      }

      if (cancelled) return;
      setAlbums(aJson || []);
      setPhotos(pJson || []);
    } catch (e: any) {
      console.error(e);
      // Provide clearer message for the UI
      setError(
        e?.message?.includes('Expected JSON') 
          ? `${e.message}. Check your backend URL and that the server returns JSON.`
          : `Failed to load gallery data: ${e?.message || 'unknown error'}`
      );

      // fallback sample data so UI still shows something
      setAlbums([
        { id: 'sample-album-1', name: 'Campus Life', category: 'General' },
      ]);
      setPhotos([
        { id: 'p1', title: 'Sample Photo 1', url: 'https://via.placeholder.com/800x600?text=Photo+1', albumId: 'sample-album-1' },
      ]);
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  load();
  return () => { cancelled = true; };
}, [apiBaseUrl]);


  const categories = useMemo(() => {
    const s = new Set<string>();
    albums.forEach(a => s.add(a.category ?? "Uncategorized"));
    photos.forEach(p => { if (p.category) s.add(p.category); });
    return ["All", ...Array.from(s)];
  }, [albums, photos]);

  const filteredAlbums = useMemo(() => {
    const q = search.trim().toLowerCase();
    return albums.filter(a => {
      if (selectedCategory && selectedCategory !== "All" && a.category !== selectedCategory) return false;
      if (!q) return true;
      return a.name.toLowerCase().includes(q) || (a.id && a.id.toLowerCase().includes(q));
    });
  }, [albums, selectedCategory, search]);

  const photosByAlbum = useMemo(() => {
    const map = new Map<string, Photo[]>();
    photos.forEach(p => {
      if (selectedCategory && selectedCategory !== "All" && p.category !== selectedCategory) return;
      const arr = map.get(p.albumId ?? "") || [];
      arr.push(p);
      map.set(p.albumId ?? "", arr);
    });

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      for (const [k, arr] of Array.from(map.entries())) {
        map.set(k, arr.filter(p => (p.title ?? "").toLowerCase().includes(q) || (p.tags || []).some(t => t.toLowerCase().includes(q))));
      }
    }

    return map;
  }, [photos, selectedCategory, search]);

  const allFilteredPhotos = useMemo(() => {
    const out: Photo[] = [];
    photosByAlbum.forEach(arr => out.push(...arr));
    return out;
  }, [photosByAlbum]);

  function openLightbox(index: number) { setLightboxIndex(index); }
  function closeLightbox() { setLightboxIndex(null); }
  function prevLightbox() { if (lightboxIndex === null) return; setLightboxIndex((lightboxIndex + allFilteredPhotos.length - 1) % allFilteredPhotos.length); }
  function nextLightbox() { if (lightboxIndex === null) return; setLightboxIndex((lightboxIndex + 1) % allFilteredPhotos.length); }

  if (loading) return <div className="p-6">Loading gallery...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <p className="text-sm text-gray-600">Browse albums and photos — data is loaded from your backend.</p>
      </header>

      <div className="flex gap-3 items-center mb-4 flex-wrap">
        <div className="flex gap-2 items-center flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              className={`px-3 py-1 rounded-full border ${selectedCategory === c || (selectedCategory === null && c === 'All') ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setSelectedCategory(c === 'All' ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="ml-auto w-full sm:w-auto">
          <input
            aria-label="Search photos or albums"
            className="w-full sm:w-72 px-3 py-2 border rounded-md"
            placeholder="Search albums, photos or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <main>
        {/* Albums */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Albums</h2>
            <div className="text-sm text-gray-600">{filteredAlbums.length} albums</div>
          </div>

          {filteredAlbums.length === 0 ? (
            <div className="p-6 text-gray-500">No albums found for this filter.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredAlbums.map(a => (
                <article key={a.id} className="border rounded-lg overflow-hidden shadow-sm">
                  <button className="w-full text-left" onClick={() => setSelectedCategory(a.category ?? null)}>
                    <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {a.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={a.coverUrl} alt={a.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="p-4 text-center text-sm text-gray-500">No cover</div>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="font-medium">{a.name}</div>
                      <div className="text-xs text-gray-500">{a.category ?? "Uncategorized"} • {a.photoCount ?? (photosByAlbum.get(a.id)?.length ?? 0)} photos</div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Photos */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium">Photos</h2>
            <div className="text-sm text-gray-600">{allFilteredPhotos.length} photos</div>
          </div>

          {allFilteredPhotos.length === 0 ? (
            <div className="p-6 text-gray-500">No photos found.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {allFilteredPhotos.map((p, idx) => (
                <div key={p.id} className="bg-white border rounded overflow-hidden">
                  <button onClick={() => openLightbox(idx)} className="w-full h-36 block overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt={p.title ?? 'photo'} className="w-full h-full object-cover" />
                  </button>
                  <div className="p-2 text-xs">
                    <div className="truncate" title={p.title}>{p.title}</div>
                    <div className="text-gray-400 text-[11px]">Album: {albums.find(a => a.id === p.albumId)?.name ?? '—'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && allFilteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-w-4xl w-full bg-white rounded shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-2 border-b">
              <div className="text-sm">{allFilteredPhotos[lightboxIndex].title}</div>
              <div className="flex gap-2">
                <button onClick={prevLightbox} className="px-3 py-1 rounded border">Prev</button>
                <button onClick={nextLightbox} className="px-3 py-1 rounded border">Next</button>
                <button onClick={closeLightbox} className="px-3 py-1 rounded border">Close</button>
              </div>
            </div>
            <div className="p-4 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={allFilteredPhotos[lightboxIndex].url} alt={allFilteredPhotos[lightboxIndex].title} className="max-h-[70vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
