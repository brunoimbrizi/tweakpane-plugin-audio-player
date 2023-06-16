# Tweakpane plugin audio player
A mini audio player for [Tweakpane][tweakpane]. Sometimes you just want all of your UI in one place.

## Demo

[TODO]



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
pane.addBlade({
  view: 'audio-player',
  label: 'track',
  source: 'drum-intro.mp3'
});
```


[tweakpane]: https://github.com/cocopon/tweakpane/
