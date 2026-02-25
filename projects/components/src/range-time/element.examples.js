export const metadata = {
  name: 'range-time',
  elements: ['bp-range-time']
};

export function example() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/range-time.js';
    </script>
    <bp-range-time value="30" max="120" aria-label="video progress"></bp-range-time>
  `;
}

export function buffered() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/range-time.js';

      const scrubber = document.getElementById('buffered-example');
      scrubber.buffered = [
        { start: 0, end: 30 },
        { start: 45, end: 90 }
      ];
    </script>
    <bp-range-time id="buffered-example" value="45" max="120" aria-label="buffered video progress"></bp-range-time>
  `;
}

export function disabled() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/range-time.js';
    </script>
    <bp-range-time disabled value="0" max="100" aria-label="disabled video progress"></bp-range-time>
  `;
}

export function readonly() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/range-time.js';
    </script>
    <bp-range-time readonly value="45" max="180" aria-label="readonly video progress"></bp-range-time>
  `;
}

export function videoPlayer() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/range-time.js';
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/icons/shapes/play.js';
      import '@blueprintui/icons/shapes/pause.js';
      import '@blueprintui/icons/shapes/volume.js';

      const video = document.getElementById('demo-video');
      const scrubber = document.getElementById('video-scrubber');
      const playBtn = document.getElementById('play-btn');
      const timeDisplay = document.getElementById('time-display');

      let isScrubbing = false;

      // Initialize duration
      video.addEventListener('loadedmetadata', () => {
        scrubber.max = video.duration;
        updateTimeDisplay();
      });

      // Update scrubber position
      video.addEventListener('timeupdate', () => {
        if (!isScrubbing) {
          scrubber.value = video.currentTime;
          updateTimeDisplay();
        }
      });

      // Update buffered ranges
      video.addEventListener('progress', () => {
        scrubber.setBufferedRanges(video.buffered);
      });

      // Handle scrubbing
      scrubber.addEventListener('input', (e) => {
        isScrubbing = true;
        updateTimeDisplay();
      });

      scrubber.addEventListener('change', (e) => {
        video.currentTime = e.target.value;
        isScrubbing = false;
      });

      // Play/Pause
      playBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          playBtn.querySelector('bp-icon').setAttribute('shape', 'pause');
        } else {
          video.pause();
          playBtn.querySelector('bp-icon').setAttribute('shape', 'play');
        }
      });

      function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return \`\${m}:\${s.toString().padStart(2, '0')}\`;
      }

      function updateTimeDisplay() {
        const current = formatTime(scrubber.value);
        const duration = formatTime(video.duration || 0);
        timeDisplay.textContent = \`\${current} / \${duration}\`;
      }
    </script>

    <div bp-layout="block gap:md" style="max-width: 600px;">
      <video id="demo-video" src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" style="width: 100%; display: block; background: black;">
      </video>

      <div bp-layout="block gap:sm">
        <bp-range-time
          id="video-scrubber"
          aria-label="video progress">
        </bp-range-time>

        <div bp-layout="inline gap:md" style="align-items: center;">
          <bp-button-icon id="play-btn" aria-label="play">
            <bp-icon shape="play"></bp-icon>
          </bp-button-icon>

          <span id="time-display" style="font-size: 0.875rem; color: var(--bp-text-200);">0:00 / 0:00</span>

          <bp-button-icon aria-label="volume">
            <bp-icon shape="volume"></bp-icon>
          </bp-button-icon>
        </div>
      </div>
    </div>
  `;
}

export function customStyles() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/range-time.js';
    </script>
    <style>
      #custom-scrubber {
        --height: 8px;
        --track-color: #2196f3;
        --track-buffer-color: #b0bec5;
        --thumb-size: 20px;
        --thumb-background: #2196f3;
        --thumb-hover-scale: 1.3;
      }
    </style>
    <bp-range-time id="custom-scrubber" value="60" max="120" aria-label="custom styled progress"></bp-range-time>
  `;
}

export function form() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/range-time.js';
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/components/include/field.js';

      const form = document.getElementById('playback-form');
      const output = document.getElementById('form-output');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        output.textContent = JSON.stringify(Object.fromEntries(formData), null, 2);
      });
    </script>

    <form id="playback-form" bp-layout="block gap:md">
      <bp-field>
        <label>Resume from position</label>
        <bp-range-time
          name="resume-time"
          value="120"
          max="300"
          aria-label="resume position">
        </bp-range-time>
        <bp-field-message>Drag to set resume point</bp-field-message>
      </bp-field>

      <bp-button type="submit">Save Position</bp-button>

      <pre id="form-output" style="background: var(--bp-layer-background-100); padding: 1rem; border-radius: 4px;"></pre>
    </form>
  `;
}

export function longDuration() {
  return /* html */ `
    <script type="module">
      import '@blueprintui/components/include/range-time.js';
    </script>
    <div bp-layout="block gap:sm">
      <label>2 hour video (1:30:45 current position)</label>
      <bp-range-time value="5445" max="7200" aria-label="long video progress"></bp-range-time>
    </div>
  `;
}
