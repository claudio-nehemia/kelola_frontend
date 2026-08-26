// utils/imageHelper.ts

export function createTextPlaceholder(title: string) {
  // Ambil 2 huruf pertama dari judul produk sebagai inisial
  const initials = title ? title.trim().substring(0, 2).toUpperCase() : "PR";

  // Buat kode SVG dengan teks di tengahnya
  const svg = `
    <svg xmlns="http://w3.org" width="300" height="300" viewBox="0 0 300 300">
      <rect width="100%" height="100%" fill="#e2e8f0"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32" font-weight="bold" fill="#64748b">
        ${initials}
      </text>
    </svg>
  `;

  // Ubah SVG menjadi format Data URL agar bisa dibaca oleh src Next.js Image
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
