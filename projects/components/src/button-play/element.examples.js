export const metadata = {
  name: 'button-play',
  elements: ['bp-button-play']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-play.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-play aria-label="play audio"></bp-button-play>
      <bp-button-play checked aria-label="pause audio"></bp-button-play>
    </div>
  `;
}

export function disabled() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-play.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-play disabled aria-label="play audio"></bp-button-play>
      <bp-button-play checked disabled aria-label="pause audio"></bp-button-play>
    </div>
  `;
}

export function readonly() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-play.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-play readonly aria-label="play audio"></bp-button-play>
      <bp-button-play checked readonly aria-label="pause audio"></bp-button-play>
    </div>
  `;
}

export function form() {
  return /* html */`
    <form id="media-form" bp-layout="block gap:md">
      <bp-field>
        <label>Media Playback</label>
        <bp-button-play name="media-state" aria-label="play audio"></bp-button-play>
      </bp-field>
      <span bp-layout="block:center">Playing: false</span>
      <bp-button type="submit" action="secondary">Submit</bp-button>
    </form>
    <script type="module">
      import '@blueprintui/components/include/button-play.js';
      import '@blueprintui/components/include/field.js';
      import '@blueprintui/components/include/button.js';

      const button = document.querySelector('#media-form bp-button-play');
      const form = document.querySelector('#media-form');
      button.addEventListener('change', (e) => {
        document.querySelector('#media-form span').innerHTML = 'Playing: ' + e.target.checked;
      });
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submit', Object.fromEntries(new FormData(form)));
      });
    </script>
  `;
}

export function customValue() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/button-play.js';
    </script>

    <div bp-layout="inline gap:lg">
      <bp-button-play name="playback" value="playing" aria-label="play audio"></bp-button-play>
    </div>
  `;
}

export function audioPlayer() {
  return /* html */`
    <div class="audio-player" bp-layout="block gap:md">
      <bp-button-play id="audio-toggle" aria-label="play audio"></bp-button-play>
      <audio id="audio-element" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></audio>
    </div>

    <script type="module">
      import '@blueprintui/components/include/button-play.js';

      const button = document.querySelector('#audio-toggle');
      const audio = document.querySelector('#audio-element');

      button.addEventListener('change', (e) => {
        if (e.target.checked) {
          audio.play();
        } else {
          audio.pause();
        }
      });

      // Sync button state with audio events
      audio.addEventListener('play', () => button.checked = true);
      audio.addEventListener('pause', () => button.checked = false);
      audio.addEventListener('ended', () => button.checked = false);
    </script>
  `;
}
