export default {
  pages: {
    title: true,
    path: true,
    link: true,
    permalink: true,
    slug: true,
    keywords: false,
    date: true,
    updated: true,
    comments: true,
    excerpt: true,
    text: true,
    raw: false,
    content: false,
    author: true,
  },

  posts: {
    title: true,
    path: true,
    link: false,
    permalink: false,
    slug: false,
    categories: true,
    tags: true,
    keywords: false,
    date: true,
    updated: true,
    excerpt: false,
    text: false,
    raw: false,
    content: false,
    comments: false,
    author: false,
  },

  _data: {
    enable: false,
    files: [],
  },
}
