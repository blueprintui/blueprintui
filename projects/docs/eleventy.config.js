import * as syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import headTag from './src/_includes/shortcodes/head-tag.js';
import markdownIt from 'markdown-it';

export default function (config) {
  const md = markdownIt({
    html: true,
    // breaks: true,
    linkify: true
  });

  const textFormat = {
    h1: 'heading',
    h2: 'subheading',
    h3: 'section',
    h4: 'subsection',
    h5: 'message',
    h6: 'caption',
    p: 'content',
    ul: 'list',
    a: 'link'
  };

  function bpText(tokens, idx, options, env, slf) {
    if (
      tokens[idx].type === 'bullet_list_open' ||
      tokens[idx].type === 'heading_open' ||
      tokens[idx].type === 'paragraph_open' ||
      tokens[idx].type === 'link_open'
    ) {
      tokens[idx].attrSet('bp-text', textFormat[tokens[idx].tag]);

      if (tokens[idx].tag.includes('h')) {
        tokens[idx].attrSet('docs-heading', idx);
      }
    }

    return slf.renderToken(tokens, idx, options, env, slf);
  }

  md.renderer.rules.heading_open = bpText;
  md.renderer.rules.paragraph_open = bpText;
  md.renderer.rules.link_open = bpText;
  md.renderer.rules.bullet_list_open = bpText;

  config.setLibrary('md', md);
  config.addPlugin(syntaxHighlight.default);
  config.setDataDeepMerge(true);
  config.addPassthroughCopy('./src/index.js');
  config.addPassthroughCopy('./src/assets');
  config.addPassthroughCopy('./src/**/*.css');
  config.addWatchTarget('./src/**/*.css');
  config.addWatchTarget('./src/**/*.js');

  // config.setBrowserSyncConfig({
  //   server: {
  //     baseDir: './dist',
  //     serveStaticOptions: {
  //       extensions: ['html']
  //     },
  //   }
  // });

  headTag(config);

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data'
    }
  };
}
