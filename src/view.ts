import {
	bindValueMap,
	ClassName,
	isEmpty,
	removeChildNodes,
	ValueMap,
	View,
	ViewProps,

	NumberTextView,
	SliderView,
} from '@tweakpane/core';

export type PluginPropsObject = {
	source: string;
};

export type PluginProps = ValueMap<PluginPropsObject>;

interface Config {
	props: PluginProps;
	viewProps: ViewProps;
}

const className = ClassName('plyr');

export class PluginView implements View {
	public readonly element: HTMLElement;
	public readonly audio: HTMLMediaElement;
	public readonly btnPlayPause: HTMLElement;

	// private readonly sliderView_: SliderView;
	// private readonly textView_: NumberTextView;

	constructor(doc: Document, config: Config) {
		this.element = doc.createElement('div');
		this.element.classList.add(className());
		config.viewProps.bindClassModifiers(this.element);

		const source = config.props.value('source');

		this.audio = doc.createElement('audio');
		this.audio.src = source.rawValue;

		this.btnPlayPause = doc.createElement('button');
		this.btnPlayPause.innerText = 'PLAY';
		this.element.appendChild(this.btnPlayPause);

		const onPlayPause = () => {
			if (this.audio.paused) this.audio.play();
			else this.audio.pause();
		};

		this.btnPlayPause.addEventListener('click', onPlayPause);



		/*
		const sliderElem = doc.createElement('div');
		sliderElem.classList.add(className('s'));
		this.sliderView_ = config.sliderView;
		sliderElem.appendChild(this.sliderView_.element);
		this.element.appendChild(sliderElem);

		const textElem = doc.createElement('div');
		textElem.classList.add(className('t'));
		this.textView_ = config.textView;
		textElem.appendChild(this.textView_.element);
		this.element.appendChild(textElem);
		*/

		config.viewProps.handleDispose(() => {
			// Called when the view is disposing
		});
	}
}
