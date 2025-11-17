export const metadata = {
  name: 'format-relative-time',
  elements: ['bp-format-relative-time']
};

export function example() {
  // Create dates for examples
  const now = new Date();
  const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-relative-time.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-relative-time>${twoHoursAgo.toISOString()}</bp-format-relative-time>

      <bp-format-relative-time>${yesterday.toISOString()}</bp-format-relative-time>

      <bp-format-relative-time>${threeDaysFromNow.toISOString()}</bp-format-relative-time>
    </div>
    `;
}

export function numericFormat() {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-relative-time.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-relative-time numeric="auto">${yesterday.toISOString()}</bp-format-relative-time>

      <bp-format-relative-time numeric="always">${yesterday.toISOString()}</bp-format-relative-time>
    </div>
    `;
}

export function styleVariations() {
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-relative-time.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-relative-time format-style="long">${twoHoursAgo.toISOString()}</bp-format-relative-time>

      <bp-format-relative-time format-style="short">${twoHoursAgo.toISOString()}</bp-format-relative-time>

      <bp-format-relative-time format-style="narrow">${twoHoursAgo.toISOString()}</bp-format-relative-time>
    </div>
    `;
}

export function specificUnit() {
  const pastDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 days ago

  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-relative-time.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-relative-time unit="auto">${pastDate.toISOString()}</bp-format-relative-time>

      <bp-format-relative-time unit="hour">${pastDate.toISOString()}</bp-format-relative-time>

      <bp-format-relative-time unit="day">${pastDate.toISOString()}</bp-format-relative-time>
    </div>
    `;
}

export function liveSync() {
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-relative-time.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-relative-time>${oneMinuteAgo.toISOString()}</bp-format-relative-time>

      <bp-format-relative-time sync>${oneMinuteAgo.toISOString()}</bp-format-relative-time>
    </div>
    `;
}

export function inlineText() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-relative-time.js';
    </script>

    <p bp-text="content">
      Last updated <bp-format-relative-time format-style="short">${oneHourAgo.toISOString()}</bp-format-relative-time>
    </p>
    `;
}

export function futureDate() {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/format-relative-time.js';
    </script>

    <div bp-layout="block gap:md">
      <bp-format-relative-time>${tomorrow.toISOString()}</bp-format-relative-time>

      <bp-format-relative-time>${nextWeek.toISOString()}</bp-format-relative-time>
    </div>
    `;
}
