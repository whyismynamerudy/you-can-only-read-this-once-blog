const STORAGE_KEY = 'readBlogPosts';

export const getReadBlogPosts = (): string[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const markBlogPostAsRead = (slug: string): void => {
  if (typeof window === 'undefined') return;
  const readPosts = getReadBlogPosts();
  if (!readPosts.includes(slug)) {
    readPosts.push(slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readPosts));
  }
};

export const isBlogPostRead = (slug: string): boolean => {
  return getReadBlogPosts().includes(slug);
};