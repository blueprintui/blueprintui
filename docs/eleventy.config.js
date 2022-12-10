import * as syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import headTag from './src/_includes/shortcodes/head-tag.js';
import markdownIt from 'markdown-it';
import decache from 'decache';

export default function (config) {
  const md = markdownIt({
    html: true,
    // breaks: true,
    linkify: true
  });

  // heading_open

  // const defaultRender = md.renderer.rules.heading_open;
  // md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
  //   console.log(tokens)
  //   // If you are sure other plugins can't add `target` - drop check below
  //   // var aIndex = tokens[idx].attrIndex('target');
  
  //   // if (aIndex < 0) {
  //   //   tokens[idx].attrPush(['target', '_blank']); // add new attribute
  //   // } else {
  //   //   tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
  //   // }
  
  //   // pass token to default renderer.
  //   return defaultRender(tokens, idx, options, env, self);
  // };

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
    if (tokens[idx].type === 'heading_open' || tokens[idx].type === 'paragraph_open' || tokens[idx].type === 'link_open') {
      tokens[idx].attrSet('bp-text', textFormat[tokens[idx].tag]);

      if (tokens[idx].tag.includes('h')) {
        tokens[idx].attrSet('docs-heading', '');
      }
    }

    return slf.renderToken(tokens, idx, options, env, slf);
  }

  md.renderer.rules.heading_open = bpText;
  md.renderer.rules.paragraph_open = bpText;
  md.renderer.rules.link_open = bpText;

  config.setLibrary('md', md);
  config.addPlugin(syntaxHighlight);
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

  config.on('eleventy.beforeWatch', (files) => {
    files.forEach(file => decache(file));
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
    },
  };
}
