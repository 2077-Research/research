export function calculateReadingTime(content: string) {
	if (!content) return 0;

	const wordsPerMinute = 200;
	const textContent = content.replace(/<[^>]*>/g, '');
	const wordCount = textContent.split(/\s+/).length;
	const minutes = Math.ceil(wordCount / wordsPerMinute);

	return minutes;
}
