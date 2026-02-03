const PALETTES = [
	['#0f172a', '#1e293b', '#3b82f6'],
	['#0f172a', '#1f2937', '#8b5cf6'],
	['#111827', '#1f2937', '#22c55e'],
	['#0f172a', '#1e293b', '#f59e0b'],
	['#111827', '#1f2937', '#ef4444'],
	['#0f172a', '#1e293b', '#14b8a6'],
];

const hashString = (value = '') => {
	let hash = 0;
	for (let i = 0; i < value.length; i += 1) {
		hash = (hash << 5) - hash + value.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
};

const wrapText = (text = '', maxChars = 18, maxLines = 2) => {
	const words = text.split(' ');
	const lines = [];
	let current = '';
	words.forEach((word) => {
		const next = current ? `${current} ${word}` : word;
		if (next.length <= maxChars) {
			current = next;
		} else if (current) {
			lines.push(current);
			current = word;
		} else {
			lines.push(word.slice(0, maxChars));
			current = word.slice(maxChars);
		}
	});
	if (current) lines.push(current);
	return lines.slice(0, maxLines);
};

const svgToDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const buildCoverSvg = ({ title = 'Library Classic', author = 'Unknown Author', category = 'General', palette }) => {
	const [base, mid, accent] = palette;
	const lines = wrapText(title, 20, 2);
	const categoryText = category.toUpperCase();
	return `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${base}" />
      <stop offset="55%" stop-color="${mid}" />
      <stop offset="100%" stop-color="${accent}" />
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.15)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </linearGradient>
  </defs>
  <rect width="400" height="600" rx="28" fill="url(#bg)" />
  <rect x="24" y="24" width="352" height="552" rx="22" fill="rgba(255,255,255,0.06)" />
  <path d="M20 120 C120 40 280 40 380 120" stroke="rgba(255,255,255,0.15)" stroke-width="2" fill="none" />
  <circle cx="320" cy="90" r="36" fill="rgba(255,255,255,0.18)" />
  <circle cx="320" cy="90" r="28" fill="rgba(255,255,255,0.3)" />
	<rect x="36" y="410" width="328" height="150" rx="18" fill="rgba(255,255,255,0.75)" />
	<text x="60" y="450" fill="#0f172a" font-size="24" font-family="'Segoe UI', sans-serif" font-weight="700">
    ${lines[0] || ''}
  </text>
	${lines[1] ? `<text x="60" y="482" fill="#0f172a" font-size="24" font-family="'Segoe UI', sans-serif" font-weight="700">${lines[1]}</text>` : ''}
	<text x="60" y="520" fill="rgba(15,23,42,0.75)" font-size="16" font-family="'Segoe UI', sans-serif">
    ${author}
  </text>
  <text x="60" y="110" fill="rgba(255,255,255,0.8)" font-size="14" font-family="'Segoe UI', sans-serif" letter-spacing="2">
    ${categoryText}
  </text>
  <rect x="0" y="0" width="400" height="600" fill="url(#shine)" />
</svg>`;
};

export const getBookCover = (book) => {
	const key = book?.id || book?.title || 'book';
	const palette = PALETTES[hashString(key) % PALETTES.length];
	const svg = buildCoverSvg({
		title: book?.title || 'Library Classic',
		author: book?.author || 'Unknown Author',
		category: book?.category || 'General',
		palette,
	});
	const fallbackSvg = buildCoverSvg({
		title: 'Library Classic',
		author: 'LibraTech Library',
		category: 'General',
		palette: PALETTES[0],
	});
	const src = book?.coverUrl || svgToDataUri(svg);
	const fallbackSrc = svgToDataUri(fallbackSvg);
	const alt = book?.title && book?.author
		? `${book.title} by ${book.author} cover`
		: 'Book cover';
	return { src, alt, fallbackSrc };
};
