# You Can Only Read This Once Blog

A unique blog platform built with Next.js where each post can only be read once per device. This project creates a more mindful and focused reading experience by encouraging readers to fully engage with content in a single sitting.

## Features

- **One-time Reading**: Each blog post can only be read once per device
- **Device Fingerprinting**: Uses ThumbmarkJS for secure device identification
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Responsive Design**: Fully responsive layout using Tailwind CSS
- **MDX Support**: Write blog posts using MDX for rich content
- **RSS Feed**: Automated RSS feed generation
- **SEO Optimized**: Built-in SEO features with proper meta tags and sitemap
- **MongoDB Integration**: Tracks read status of posts per device

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- MongoDB
- Tailwind CSS
- MDX
- ThumbmarkJS
- React

## Prerequisites

- Node.js 16+
- MongoDB instance
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/read-once-blog.git
cd read-once-blog
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── blog/            # Blog pages and posts
│   ├── components/      # React components
│   ├── utils/           # Utility functions
│   └── layout.tsx       # Root layout
├── public/             # Static assets
└── tailwind.config.js  # Tailwind configuration
```

## Writing Blog Posts

1. Create a new MDX file in `app/blog/posts/`
2. Add frontmatter with required metadata:
```mdx
---
title: 'Your Post Title'
publishedAt: '2024-01-01'
summary: 'Brief description of your post'
---

Your content here...
```

## Key Components

### FingerprintChecker
Manages the one-time read functionality by:
- Generating a unique device fingerprint
- Checking if the current device has read the post
- Managing the read status in MongoDB

### BlogContent
Handles the rendering of blog posts with:
- MDX processing
- Metadata display
- Schema.org markup
- Responsive layout

## Styling

The project uses Tailwind CSS with custom configurations for:
- Typography via `@tailwindcss/typography`
- Dark mode support
- Custom color schemes
- Responsive design utilities

## MongoDB Schema

```javascript
{
  slug: String,           // Unique identifier for the post
  createdAt: Date,       // When the post was first read
  readers: [String],     // Array of device fingerprints
  lastReadAt: Date       // Last time the post was read
}
```

## Deployment

This project is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is MIT licensed.

## Acknowledgments

- [Next.js](https://nextjs.org)
- [ThumbmarkJS](https://github.com/thumbmarkjs/thumbmarkjs)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB](https://www.mongodb.com)
