import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { baseStyles, interactionTextChange } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/format-token.js';
 * ```
 *
 * ```html
 * <bp-format-token format="word-piece">Hello world!</bp-format-token>
 * ```
 *
 * @summary The format token component visualizes text tokenization for language models, displaying how text is split into tokens using various tokenization strategies like WordPiece, BPE, SentencePiece, and LLaMA.
 * @element bp-format-token
 * @since 2.8.0
 * @slot - Provide text content to be tokenized
 * @cssprop --padding
 * @cssprop --border-radius
 * @cssprop --border
 * @cssprop --font-family
 * @cssprop --line-height
 * @cssprop --gap
 */
@interactionTextChange()
export class BpFormatToken extends LitElement {
  static styles = [baseStyles, styles];

  /** Specifies the tokenization strategy used to split text into tokens for language model visualization */
  @property({ type: String, reflect: true }) accessor format:
    | 'bpe'
    | 'word-piece'
    | 'sentence-piece'
    | 'llama'
    | 'character'
    | 'whitespace' = 'bpe';

  @state() private accessor _text = '';

  get tokens(): string[] {
    return this.#tokens;
  }

  #tokens: string[] = [];

  #colors = [
    'var(--bp-color-red-100)',
    'var(--bp-color-blue-100)',
    'var(--bp-color-green-100)',
    'var(--bp-color-yellow-100)',
    'var(--bp-color-violet-100)'
  ];

  render() {
    if (!this.#tokens.length) {
      return html`
        <div part="internal">
          <div part="placeholder">
            <slot></slot>
          </div>
        </div>
      `;
    }

    return html`
      <div part="internal">
        ${this.#tokens.map(
          (token, index) => html`
            <span part="token" style="background-color: ${this.#colors[index % this.#colors.length]}"> ${token} </span>
          `
        )}
      </div>
    `;
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);

    if (props.has('format')) {
      this.#updateTokens();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._text = this.textContent?.trim() ?? '';
    this.#updateTokens();
    this.addEventListener('bp-textchange', () => {
      this._text = this.textContent?.trim() ?? '';
      this.#updateTokens();
    });
  }

  #updateTokens() {
    const text = this._text ?? '';
    this.#tokens = this.#tokenize(text);
    this.requestUpdate();
  }

  #tokenize(text: string): string[] {
    if (!text || text.trim() === '') return [];

    switch (this.format) {
      case 'sentence-piece':
        return this.#tokenizeSentencePiece(text);
      case 'bpe':
        return this.#tokenizeBPE(text);
      case 'llama':
        return this.#tokenizeLLaMA(text);
      case 'character':
        return this.#tokenizeCharacter(text);
      case 'whitespace':
        return this.#tokenizeWhitespace(text);
      default:
        return this.#tokenizeWordPiece(text);
    }
  }

  #tokenizeWordPiece(text: string): string[] {
    const tokens: string[] = [];
    let i = 0;

    while (i < text.length) {
      let token = '';

      // Handle whitespace - WordPiece treats spaces as separate tokens
      if (/\s/.test(text[i])) {
        while (i < text.length && /\s/.test(text[i])) {
          token += text[i];
          i++;
        }
        tokens.push(token);
        continue;
      }

      // Handle punctuation
      if (/[^\w\s]/.test(text[i])) {
        token = text[i];
        i++;
        tokens.push(token);
        continue;
      }

      // Handle words/subwords
      if (/\w/.test(text[i])) {
        while (i < text.length && /\w/.test(text[i])) {
          token += text[i];
          i++;
        }

        if (token.length > 6) {
          const subTokens = this.#splitIntoSubwords(token, 'word-piece');
          tokens.push(...subTokens);
        } else {
          tokens.push(token);
        }
        continue;
      }

      // Fallback
      token = text[i];
      i++;
      tokens.push(token);
    }

    return tokens;
  }

  #tokenizeLLaMA(text: string): string[] {
    const tokens: string[] = [];
    let i = 0;

    while (i < text.length) {
      // Handle whitespace - mark next non-space token with ▁
      if (/\s/.test(text[i])) {
        while (i < text.length && /\s/.test(text[i])) {
          i++;
        }
        // Mark the next token with ▁ (space boundary)
        if (i < text.length) {
          let token = this.#extractNextToken(text, i);
          if (token.length > 5) {
            const subTokens = this.#splitIntoSubwords(token, 'llama');
            if (subTokens.length > 0) {
              subTokens[0] = '▁' + subTokens[0];
              tokens.push(...subTokens);
            }
          } else {
            tokens.push('▁' + token);
          }
          i += token.length;
        }
        continue;
      }

      // Handle numbers
      if (/\d/.test(text[i])) {
        let token = '';
        while (i < text.length && /\d/.test(text[i])) {
          token += text[i];
          i++;
        }
        if (tokens.length === 0 || this.#isAfterSpace(text, i - token.length)) {
          token = '▁' + token;
        }
        tokens.push(token);
        continue;
      }

      // Handle punctuation
      if (/[^\w\s]/.test(text[i])) {
        let token = text[i];
        if (tokens.length === 0 || this.#isAfterSpace(text, i)) {
          token = '▁' + token;
        }
        tokens.push(token);
        i++;
        continue;
      }

      // Handle regular words
      if (/\w/.test(text[i])) {
        let token = this.#extractNextToken(text, i);

        if (token.length > 5) {
          const subTokens = this.#splitIntoSubwords(token, 'llama');
          if (tokens.length === 0 || this.#isAfterSpace(text, i)) {
            subTokens[0] = '▁' + subTokens[0];
          }
          tokens.push(...subTokens);
        } else {
          if (tokens.length === 0 || this.#isAfterSpace(text, i)) {
            token = '▁' + token;
          }
          tokens.push(token);
        }
        i += token.replace('▁', '').length;
        continue;
      }

      // Fallback
      let token = text[i];
      if (tokens.length === 0 || this.#isAfterSpace(text, i)) {
        token = '▁' + token;
      }
      tokens.push(token);
      i++;
    }

    return tokens;
  }

  #tokenizeCharacter(text: string): string[] {
    return text.split('');
  }

  #tokenizeWhitespace(text: string): string[] {
    return text.split(/\s+/).filter(token => token.length > 0);
  }

  #tokenizeBPE(text: string): string[] {
    const tokens: string[] = [];
    const words = text.split(/(\s+)/);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      if (/^\s+$/.test(word)) {
        continue;
      }

      let tokenToProcess = word;
      if (i > 0 && /^\s+$/.test(words[i - 1])) {
        tokenToProcess = words[i - 1] + word;
      }

      if (tokenToProcess.length > 6) {
        const subTokens = this.#splitIntoSubwords(tokenToProcess, 'bpe');
        tokens.push(...subTokens);
      } else {
        tokens.push(tokenToProcess);
      }
    }

    return tokens;
  }

  #tokenizeSentencePiece(text: string): string[] {
    const tokens: string[] = [];
    const words = text.split(/(\s+)/);

    for (const word of words) {
      if (/^\s+$/.test(word)) {
        continue;
      }

      if (word.length > 6) {
        const subTokens = this.#splitIntoSubwords(word, 'sentence-piece');
        if (subTokens.length > 0) {
          subTokens[0] = '▁' + subTokens[0];
        }
        tokens.push(...subTokens);
      } else {
        tokens.push('▁' + word);
      }
    }

    return tokens;
  }

  #splitIntoSubwords(
    word: string,
    format: 'word-piece' | 'bpe' | 'sentence-piece' | 'llama' | 'character' | 'whitespace'
  ): string[] {
    const subTokens: string[] = [];
    const maxLength = format === 'llama' ? 3 : 4;

    for (let i = 0; i < word.length; i += maxLength) {
      let subToken = word.slice(i, i + maxLength);

      if (format === 'word-piece' && i > 0) {
        subToken = '##' + subToken;
      }

      subTokens.push(subToken);
    }

    return subTokens;
  }

  #extractNextToken(text: string, startIndex: number): string {
    let token = '';
    let i = startIndex;
    while (i < text.length && /\w/.test(text[i])) {
      token += text[i];
      i++;
    }
    return token;
  }

  #isAfterSpace(text: string, index: number): boolean {
    return index === 0 || /\s/.test(text[index - 1]);
  }
}
