# Tweakpane plugin audio player
A mini audio player for [Tweakpane][tweakpane]. Sometimes you just want all of your UI in one place.

![tweakpane-plugin-audio-player-title](https://github.com/brunoimbrizi/tweakpane-plugin-audio-player/assets/880280/09c51ecb-869e-4650-9f78-74e6b1cedce5)


## Demo

[Plugin demo on StackBlitz](https://stackblitz.com/edit/js-cgprrp)



## Installation


### Browser
```html
<script src="tweakpane.min.js"></script>
<script src="tweakpane-plugin-audio-player.min.js"></script>
<script>
  const pane = new Tweakpane.Pane();
  pane.registerPlugin(TweakpaneAudioPlayerPlugin);
</script>
```

### Package
```js

import {Pane} from 'tweakpane';
import * as AudioPlayerPlugin from 'tweakpane-plugin-audio-player';

const pane = new Pane();
pane.registerPlugin(AudioPlayerPlugin);
```


## Usage
```js
const audioBlade = pane.addBlade({
  view: 'audio-player',
  label: 'track',
  source: 'drum-intro.mp3'
});

// access the <audio> element directly
// audioBlade.audio
```


[tweakpane]: https://github.com/cocopon/tweakpane/
