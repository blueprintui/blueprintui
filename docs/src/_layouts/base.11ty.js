export function render(data) {
  const description = data.page.description ? data.page.description : data.site.description;

  return /* html */`<!DOCTYPE html>
  <html lang="en" bp-theme="modern modern-dark">
    ${this.headTag(data)}
    <body>
      <bp-shell>
        <bp-header>
          <bp-header-item class="heading-logo">
            <a href="/" aria-label="BlueprintUI homepage">
              <svg style="width:150px" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:400px;height:90px" viewBox="0 0 369.79 86.134"><path fill="#2473c6" d="M12.997 4c-1.512 0-2.957.31-4.271.868a11.095 11.095 0 0 0-5.858 5.858v.004a10.867 10.867 0 0 0-.645 2.054v.009c-.072.354-.13.717-.167 1.083v.004c-.038.367-.056.736-.056 1.113v46.211a2.2 2.2 0 0 0 0 .009v1.323a2.2 2.2 0 0 0 .284 1.075 2.2 2.2 0 0 0 .004.008c.145.64.328 1.268.58 1.861.152.358.367.68.554 1.019.157.282.28.584.46.85l.005.005c.395.584.844 1.127 1.34 1.624.088.088.194.152.284.237.425.398.862.785 1.345 1.113h.004c.585.396 1.21.739 1.866 1.018h.004c.656.28 1.346.498 2.058.645h.005c.355.073.716.13 1.083.168h.004c.367.037.74.06 1.117.06H21.8a2.2 2.2 0 0 0 .073-.005H68.01a2.2 2.2 0 0 0 2.2-2.2V12.806a2.2 2.2 0 0 0-2.2-2.205H23.07c-1.236-2.802-3.622-4.963-6.54-5.965-.264-.094-.53-.18-.804-.254-.335-.086-.664-.18-1.01-.236-.067-.011-.134-.02-.202-.03A10.935 10.935 0 0 0 13.024 4h-.027zm0 4.4h.005c.416 0 .818.049 1.212.121.17.032.332.084.498.129.21.055.418.114.619.189.205.078.406.169.602.266a6.522 6.522 0 0 1 1.044.64c.058.044.111.093.167.138.238.194.47.394.68.62a6.607 6.607 0 0 1 1.555 2.848 2.2 2.2 0 0 0 .069.22c.1.458.159.931.159 1.422V52.48c-1.85-1.403-4.124-2.269-6.61-2.269-2.48 0-4.752.862-6.596 2.26V14.994a6.577 6.577 0 0 1 .516-2.57 6.548 6.548 0 0 1 3.502-3.507 6.65 6.65 0 0 1 2.578-.515zm11.01 6.602H65.81v52.807H13.002a6.578 6.578 0 0 1-4.676-1.92c-.164-.164-.297-.357-.443-.538-.12-.148-.254-.284-.36-.442a6.558 6.558 0 0 1-.607-1.118v-.004a6.587 6.587 0 0 1-.382-1.238v-.004a6.79 6.79 0 0 1-.133-1.332v-.009a6.577 6.577 0 0 1 .215-1.603 6.537 6.537 0 0 1 6.381-4.99c3.672 0 6.61 2.921 6.61 6.593v1.35a2.2 2.2 0 1 0 4.4-.018V61.3a2.2 2.2 0 0 0 0-.095V15.002z"/><path fill="currentColor" d="M103.208 63.41H88V22.653h14.649c7.38-.112 13.139 3.69 13.139 10.231 0 .95-.056 1.79-.56 3.355-.223.783-.559 1.454-1.006 2.125-.839 1.342-2.516 2.907-4.64 3.858 2.851.726 5.143 2.46 6.317 4.416s1.678 3.914 1.678 5.592c0 3.801-1.622 6.765-4.305 8.554-2.684 1.733-6.15 2.628-10.064 2.628zm-.895-36.844H92.25v14.2h9.729c3.187 0 5.535-.67 7.1-2.068s2.349-3.13 2.349-5.311c0-4.976-4.473-6.821-9.114-6.821zm.168 18.003H92.249v14.928h11.07c4.417 0 9.897-1.79 9.897-7.548 0-3.522-2.18-5.48-4.92-6.43-1.901-.727-3.746-.95-5.815-.95zm22.588 18.842V20.974h4.081v42.437h-4.081zm12.915-27.788h4.026v16.158c0 2.572.67 4.64 2.013 6.15 1.285 1.566 3.186 2.293 5.702 2.293 2.405 0 4.361-.839 5.927-2.516S158 53.962 158 51.446V35.623h4.026v27.788h-3.97v-5.088c-2.236 3.746-5.367 5.647-9.56 5.647-3.3 0-5.871-1.063-7.772-3.075-1.845-2.069-2.74-4.753-2.74-8.107V35.623zm57.756 15.152h-22.476c.168 2.74 1.174 4.976 3.075 6.765 1.9 1.845 4.193 2.74 6.877 2.74 4.193 0 7.324-2.069 8.61-5.927l3.578 1.118c-.782 2.628-2.292 4.697-4.528 6.206-2.237 1.454-4.753 2.237-7.604 2.237-2.628 0-5.032-.671-7.213-1.957s-3.857-3.02-5.032-5.256c-1.23-2.18-1.845-4.584-1.845-7.212 0-2.516.56-4.864 1.734-7.045 1.118-2.236 2.74-3.97 4.864-5.311 2.068-1.342 4.417-2.013 6.933-2.013 2.74 0 5.143.615 7.156 1.9a11.278 11.278 0 0 1 4.473 5.089c1.007 2.124 1.454 4.528 1.454 7.324 0 .28 0 .727-.056 1.342zm-22.42-3.467h18.394c-.28-2.571-1.23-4.64-2.795-6.262-1.566-1.565-3.634-2.348-6.206-2.348-2.404 0-4.417.839-6.206 2.516-1.79 1.733-2.852 3.746-3.187 6.094zm57.308 2.18c0 5.033-2.18 9.562-6.206 12.301-2.013 1.342-4.305 2.013-6.877 2.013-4.529 0-8.107-2.013-10.679-6.094v19.4h-4.081V35.624h3.97v6.038c2.85-4.36 6.429-6.541 10.79-6.541 3.858 0 7.324 1.733 9.56 4.473 2.181 2.683 3.523 6.262 3.523 9.896zM216.762 60.28c2.964 0 5.312-1.063 7.101-3.075 1.733-2.07 2.628-4.585 2.628-7.604 0-3.914-1.51-7.325-4.529-9.337-1.454-1.007-3.243-1.51-5.2-1.51-5.647-.112-10.12 5.144-9.952 10.679 0 2.907.895 5.48 2.796 7.604 1.9 2.18 4.249 3.243 7.156 3.243zm21.023-24.657h3.97v5.48c1.341-2.74 3.578-4.585 5.702-5.368 1.063-.391 2.18-.56 3.299-.56.615 0 1.062 0 1.342.113v4.305c-.447-.112-1.007-.112-1.566-.112-6.597 0-8.666 5.423-8.666 10.343v13.587h-4.081V35.623zm19.68-7.772c-.559-.615-.894-1.341-.894-2.18s.335-1.566.894-2.18c.56-.56 1.342-.895 2.18-.895s1.566.335 2.125.894c.615.615.895 1.342.895 2.181s-.28 1.565-.895 2.18c-.559.56-1.286.895-2.124.895s-1.622-.335-2.18-.895zm.112 35.56V35.623h4.082v27.788h-4.082zm37.348 0h-4.081V47.253c0-2.572-.615-4.585-1.957-6.15-1.286-1.51-3.187-2.293-5.703-2.293-2.404 0-4.417.839-5.982 2.516-1.51 1.677-2.293 3.746-2.293 6.262v15.823h-4.081V35.623h3.97v5.088c2.236-3.746 5.423-5.591 9.616-5.591 3.299 0 5.87 1.006 7.772 3.02 1.789 2.068 2.74 4.751 2.74 8.106v17.165zm18.563.223c-6.039 0-7.884-3.354-7.884-7.436V39.201h-5.143v-3.578h5.143v-7.995h4.026v7.995h7.045v3.578h-7.045v16.941c0 2.572 1.51 3.914 4.529 3.914.95 0 1.789-.112 2.516-.224v3.355c-.895.28-1.957.447-3.187.447zm36.957-40.982h4.305v24.824c0 5.144-1.398 9.17-4.026 12.02-2.683 2.852-6.485 4.306-11.35 4.306-4.808 0-8.61-1.454-11.238-4.361-2.683-2.907-4.025-6.765-4.025-11.685V22.652h4.25v24.88c0 4.305 1.23 7.604 3.242 9.449 2.069 1.9 4.696 2.795 7.995 2.795 3.467 0 6.15-1.006 8.051-3.13 1.845-2.125 2.796-5.032 2.796-8.89V22.652zm15.04 40.759V22.65h4.305v40.76h-4.305z"/></svg>  
            </a>
          </bp-header-item>
          <bp-header-item id="theme-btn" bp-layout="inline:end" aria-label="theme"><bp-icon shape="color-palette"></bp-icon></bp-header-item>
          <bp-header-item id="drawer-btn" bp-shell="drawer-button" aria-label="menu" style="--padding: 8px"><bp-icon size="lg"></bp-icon></bp-header-item>
          <bp-dropdown id="theme-dropdown" anchor="theme-btn" position="bottom-start" hidden style="--width: 250px; --min-width: auto;">
            <div bp-layout="block gap:sm">
              <bp-field>
                <label>Color Theme</label>
                <bp-select id="theme-color">
                  <bp-option value="light">system</bp-option>
                  <bp-option value="dark">system dark</bp-option>
                  <bp-option value="modern">modern</bp-option>
                  <bp-option value="modern modern-dark" selected>modern-dark</bp-option>
                </bp-select>
              </bp-field>
              <bp-field>
                <label>Spacing Theme</label>
                <bp-select id="theme-space">
                  <bp-option value="" selected>default</bp-option>
                  <bp-option value="compact">compact</bp-option>
                </bp-select>
              </bp-field>
            </div>
          </bp-dropdown>
        </bp-header>
        <bp-nav expanded>
          <bp-nav-item ${data.page.url === '/docs/getting-started.html' ? 'selected' : ''}><a href="/getting-started.html">Getting Started</a></bp-nav-item>
          <bp-nav-item ${data.page.url === '/about.html' ? 'selected' : ''}><a href="/about.html">About</a></bp-nav-item>
          <bp-nav-group expanded>
            <bp-nav-item><a href="/docs/foundation/design-tokens.html">Foundation</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/foundation/design-tokens.html' ? 'selected' : ''}><a href="/docs/foundation/design-tokens.html">Design Tokens</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/foundation/i18n.html' ? 'selected' : ''}><a href="/docs/foundation/i18n.html">Internationalization</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/foundation/typography.html' ? 'selected' : ''}><a href="/docs/foundation/typography.html">Typography</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/foundation/icons.html' ? 'selected' : ''}><a href="/docs/foundation/icons.html">Icons</a></bp-nav-item>
            <bp-nav-item><a href="https://layout.blueprintui.dev" target="_blank">Layout</a></bp-nav-item>
          </bp-nag-group>
          <bp-nav-group expanded>
            <bp-nav-item><a href="/docs/components/button.html">Buttons</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/button.html' ? 'selected' : ''}><a href="/docs/components/button.html">Button</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/button-expand.html' ? 'selected' : ''}><a href="/docs/components/button-expand.html">Button Expand</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/button-handle.html' ? 'selected' : ''}><a href="/docs/components/button-handle.html">Button Handle</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/button-icon.html' ? 'selected' : ''}><a href="/docs/components/button-icon.html">Button Icon</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/button-icon-group.html' ? 'selected' : ''}><a href="/docs/components/button-icon-group.html">Button Icon Group</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/button-sort.html' ? 'selected' : ''}><a href="/docs/components/button-sort.html">Button Sort</a></bp-nav-item>
          </bp-nav-group>
          <bp-nav-group expanded>
            <bp-nav-item><a href="/docs/components/accordion.html">Navigation</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/accordion.html' ? 'selected' : ''}><a href="/docs/components/accordion.html">Accordion</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/header.html' ? 'selected' : ''}><a href="/docs/components/header.html">Header</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/menu.html' ? 'selected' : ''}><a href="/docs/components/menu.html">Menu</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/nav.html' ? 'selected' : ''}><a href="/docs/components/nav.html">Nav</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/shell.html' ? 'selected' : ''}><a href="/docs/components/shell.html">Shell</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/tabs.html' ? 'selected' : ''}><a href="/docs/components/tabs.html">Tabs</a></bp-nav-item>
          </bp-nav-group>
          <bp-nav-group expanded>
            <bp-nav-item><a href="/docs/components/alert.html">Feedback</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/alert.html' ? 'selected' : ''}><a href="/docs/components/alert.html">Alert</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/alert-group.html' ? 'selected' : ''}><a href="/docs/components/alert-group.html">Alert Group</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/badge.html' ? 'selected' : ''}><a href="/docs/components/badge.html">Badge</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/progress-bar.html' ? 'selected' : ''}><a href="/docs/components/progress-bar.html">Progress Bar</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/progress-circle.html' ? 'selected' : ''}><a href="/docs/components/progress-circle.html">Progress Circle</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/tag.html' ? 'selected' : ''}><a href="/docs/components/tag.html">Tag</a></bp-nav-item>
          </bp-nav-group>
          <bp-nav-group expanded>
            <bp-nav-item><a href="/docs/components/card.html">Content</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/card.html' ? 'selected' : ''}><a href="/docs/components/card.html">Card</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/pagination.html' ? 'selected' : ''}><a href="/docs/components/pagination.html">Pagination</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/divider.html' ? 'selected' : ''}><a href="/docs/components/divider.html">Divider</a></bp-nav-item>
          </bp-nav-group>
          <bp-nav-group expanded>
            <bp-nav-item><a href="/docs/components/dialog.html">Popovers</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/dialog.html' ? 'selected' : ''}><a href="/docs/components/dialog.html">Dialog</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/drawer.html' ? 'selected' : ''}><a href="/docs/components/drawer.html">Drawer</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/dropdown.html' ? 'selected' : ''}><a href="/docs/components/dropdown.html">Dropdown</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/tooltip.html' ? 'selected' : ''}><a href="/docs/components/tooltip.html">Tooltip</a></bp-nav-item>
            <!-- <bp-nav-item ${data.page.url === '/docs/components/popover.html' ? 'selected' : ''}><a href="/docs/components/popover.html">Popover</a></bp-nav-item> -->
          </bp-nav-group>
          <bp-nav-group expanded>
            <bp-nav-item><a href="/docs/components/forms.html">Forms</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/forms.html' ? 'selected' : ''}><a href="/docs/components/forms.html">Forms</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/form-validation.html' ? 'selected' : ''}><a href="/docs/components/form-validation.html">Validation</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/form-interactions.html' ? 'selected' : ''}><a href="/docs/components/form-interactions.html">Interactions</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/input.html' ? 'selected' : ''}><a href="/docs/components/input.html">Input</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/checkbox.html' ? 'selected' : ''}><a href="/docs/components/checkbox.html">Checkbox</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/color.html' ? 'selected' : ''}><a href="/docs/components/color.html">Color</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/date.html' ? 'selected' : ''}><a href="/docs/components/date.html">Date</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/file.html' ? 'selected' : ''}><a href="/docs/components/file.html">File</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/month.html' ? 'selected' : ''}><a href="/docs/components/month.html">Month</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/password.html' ? 'selected' : ''}><a href="/docs/components/password.html">Password</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/radio.html' ? 'selected' : ''}><a href="/docs/components/radio.html">Radio</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/range.html' ? 'selected' : ''}><a href="/docs/components/range.html">Range</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/search.html' ? 'selected' : ''}><a href="/docs/components/search.html">Search</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/select.html' ? 'selected' : ''}><a href="/docs/components/select.html">Select</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/shell.html' ? 'selected' : ''}><a href="/docs/components/shell.html">Shell</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/switch.html' ? 'selected' : ''}><a href="/docs/components/switch.html">Switch</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/textarea.html' ? 'selected' : ''}><a href="/docs/components/textarea.html">Textarea</a></bp-nav-item>
            <bp-nav-item ${data.page.url === '/docs/components/time.html' ? 'selected' : ''}><a href="/docs/components/time.html">Time</a></bp-nav-item>
          </bp-nav-group>
        </bp-nav>
        <div class="shell-content">${data.content}</div>
      </bp-shell>
      <script type="module" src="/index.js"></script>
    </body>
  </html>`
}