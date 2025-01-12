# hexo-generator-json-website

Hexo (<https://hexo.io/>) plugin to generate a JSON file for generic use or consumption with the contents of posts and pages.

It's useful to serve compact and agile content data for microservices like AJAX site search, or you can do anything that you want.😌

<!-- vscode-markdown-toc -->
* [News](#News)
* [Installation](#Installation)
* [Usage](#Usage)
* [Settings](#Settings)
	* [Defaults](#Defaults)
	* [Keywords](#Keywords)
	* [Date formats](#Dateformats)
* [Output](#Output)
	* [Sections](#Sections)
	* [Excluding fields](#Excludingfields)
	* [Drafts](#Drafts)
	* [Skip indexing](#Skipindexing)
    * [_data](#_data)
	* [Custom file name](#Customfilename)

## <a name='News'></a>News

To know new features and bugfixes, please visit [releases index](https://github.com/JayHrn/hexo-generator-json-website/releases).

## <a name='Installation'></a>Installation

```bash
npm install hexo-generator-json-website --save
```

## <a name='Usage'></a>Usage

Hexo will run the generator _automagically_ when you run `hexo serve` or `hexo generate`. :smirk:

Using the default settings, the `website.json` file looks like the following structure:

```javascript
meta: {
  title: hexo.config.title,
  subtitle: hexo.config.subtitle,
  description: hexo.config.description,
  author: hexo.config.author,
  url: hexo.config.url
},
pages: [{ //-> all pages
  title: page.title,
  slug: page.slug,
  date: page.date,
  updated: page.updated,
  comments: page.comments,
  permalink: page.permalink,
  path: page.path,
  excerpt: page.excerpt, //-> only text ;)
  keywords: null, //-> it needs settings
  text: page.content, //-> only text minified ;)
  raw: page.raw, //-> original MD content
  content: page.content, //-> final HTML content
  author: page.author,
  categories: [{
    name: category.name,
    slug: category.slug,
    permalink: category.permalink
  }],
  tags: [{
    name: tag.name,
    slug: tag.slug,
    permalink: tag.permalink
  }]
}],
posts: [{ //-> only published posts
  title: post.title,
  slug: post.slug,
  date: post.date,
  updated: post.updated,
  comments: post.comments,
  permalink: post.permalink,
  path: post.path,
  excerpt: post.excerpt, //-> only text minified ;)
  description: post.description, //-> only text minified ;)
  keywords: null, //-> it needs settings
  text: post.content, //-> only text minified ;)
  raw: post.raw, //-> original MD content
  content: post.content, //-> final HTML content
  author: post.author,
  categories: [{
    name: category.name,
    slug: category.slug,
    permalink: category.permalink
  }],
  tags: [{
    name: tag.name,
    slug: tag.slug,
    permalink: tag.permalink
  }]
}],
categories: [{ //-> Posts categories index ;)
  name: category.name,
  slug: category.slug,
  permalink: category.permalink
}],
tags: [{ //-> Posts tags index ;)
  name: tag.name,
  slug: tag.slug,
  permalink: tag.permalink
}]
...
```

`hexo.util.stripHTML` is used to get only clean text for `excerpt` and `text` fields.

## <a name='Settings'></a>Settings

You can customize settings in `_config.yml`.

### <a name='Defaults'></a>Defaults

Default settings are:

```yaml
# you can set `enable: true` to use plugin，and you can see Hi, hexo-generator-json-website! when using command like 'hexo g' or 'hexo generate'
jsonGenerator:
  enable: true
  meta: true
  drafts: false
  file: website.json
  keywords: 
  dateFormat: 
  pages:
    title: true
    path: true
    link: true
    permalink: true
    slug: true
    keywords: false
    date: true
    updated: true
    comments: true
    excerpt: true
    text: true
    raw: false
    content: false
    author: true
  posts:
    title: true
    path: true
    link: false
    permalink: false
    slug: false
    categories: true
    tags: true
    keywords: false
    date: true
    updated: true
    excerpt: false
    text: false
    raw: false
    content: false
    comments: false
    author: false
  _data:
    enable: false
    files: []    
```

### <a name='Keywords'></a>Keywords

`keywords` options extracts keywords from excerpt.

Setting the root `keywords` option will automatically reflect to `pages.keywords` and `posts.keywords`. But you can ignore one by setting it to `false` explicitly.

It is powered by [michaeldelorenzo/keyword-extractor](https://github.com/michaeldelorenzo/keyword-extractor), NPM package to create a keywords array from a string by removing stopwords.

So, the setting value should be a valid language from its [options parameters](https://github.com/michaeldelorenzo/keyword-extractor#options-parameters).

```yaml
# exemple
jsonGenerator:
  meta: true
  keywords: french
```

If it don't support your language, no worry! It's disabled by default.

### <a name='Dateformats'></a>Date formats

`dateFormat` option sets an output format for datetime objects `date` and `updated`.

It is powered by [moment](https://github.com/moment/moment/), so any string accepted by [format](http://momentjs.com/docs/#/displaying/format/) method can be used.

```yaml
# exemple
jsonGenerator:
  meta: true
  dateFormat: DD/MM/YYYY
```

If not defined, default format is the `JSON.stringify` result for `Date` objects.

## <a name='Output'></a>Output

### <a name='Sections'></a>Sections

By default, the JSON output includes `meta`, `pages` and `posts` sections. If only one of these sections is enabled by config, the json output will consist of a single array.

For example, the following config enables only `posts`, showing title, date, path, and text fields:

```yaml
# exemple
jsonGenerator:
  meta: false
  pages: false
  posts:
    title: true
    path: true
    link: false
    permalink: false
    slug: false
    categories: false
    tags: false
    keywords: false
    date: true
    updated: false
    excerpt: false
    text: true
    raw: false
    content: false
    comments: false
    author: false
```

The result JSON will look like this:

```javascript
[{ //-> only published posts
  title: post.title,
  date: post.date,
  text: post.content, //-> only text minified ;)
  path: post.path
}]
```

### <a name='Excludingfields'></a>Excluding fields

You can exclude `meta`, `pages` or `posts` contents from output JSON by setting `meta`, `pages`, or `posts` to `false`.

To exclude individual fields from `pages` or `posts` output, set its config values to `false`.

### <a name='Drafts'></a>Drafts

By default, drafts are automatically skipped from indexing.

If you want to include drafts, set `drafts: true`:

```yaml
# exemple
jsonGenerator:
  drafts: true
```

### <a name='Skipindexing'></a>Skip indexing

Any `post` or `page` protected with password will be automatically skipped from indexing.

You can also exclude a specific `post` or `page` by setting `hidden: true` on front-matter.

To exclude specific paths or tags, use `ignore` lists. Any path or tag which contains at least one of the listed substrings will be skipped from indexing. For example:

```yaml
# exemple
jsonGenerator:
  ignore:
    paths:
      - path/to/a/page
      - url/to/one/post
      - an-entire-category
      - specific.file
      - .ext # a file extension
    tags:
      - tag1
      - tag2
```

Also, you can set `hidden: false` to override all the rules mentioned above.

### <a name='_data'></a>_data
This is used to generate any yml file information in the _data folder, such as reading friendly link information, where you can configure the reference as follows:

```yaml
_data:
  enable: true # Open Configuration
  files:  [{name: 'link1',data: 'link1_list'},{name: 'link2',data: 'link2_list'}] 
```
- name: The file name corresponding to the yml file. For example, if the file name is `link.yml`, you can fill in `link`, and the final output object will also be this name

- data: The configuration that needs to be read, such as the `name`, `link`, etc. of the friendly links stored in link_list, which will be read out

The following content is finally generated

```json
"link": [
    {
        "name": "Hexo",
        "link": "https://hexo.io/zh-tw/",
        "avatar": "https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg",
        "descr": "快速、簡單且強大的網誌框架"
    },
]
```

### <a name='Customfilename'></a>Custom file name

By default, the output file is `website.json`, but is possible to customize the file name:

```yaml
# exemple
jsonGenerator:
  file: custom-file-name.json
```
