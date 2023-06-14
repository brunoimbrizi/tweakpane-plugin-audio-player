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
	sliderView: SliderView;
	props: PluginProps;
	viewProps: ViewProps;
}

const className = ClassName('plyr');

export class PluginView implements View {
	public readonly element: HTMLElement;
	public readonly audio: HTMLMediaElement;
	public readonly btnPlayPause: HTMLElement;

	private readonly sliderView_: SliderView;

	constructor(doc: Document, config: Config) {
		this.element = doc.createElement('div');
		this.element.classList.add(className());
		config.viewProps.bindClassModifiers(this.element);

		const wrapBtnSld = doc.createElement('div');
		wrapBtnSld.classList.add(className('w'));
		this.element.appendChild(wrapBtnSld);

		const wrapBtn = doc.createElement('div');
		wrapBtn.classList.add(className('wb'));
		wrapBtnSld.appendChild(wrapBtn);

		const wrapTxt = doc.createElement('div');
		wrapTxt.classList.add(className('wt'));
		this.element.appendChild(wrapTxt);

		const btn = doc.createElement('div');
		btn.classList.add(className('b'));
		btn.classList.add('play');
		wrapBtn.appendChild(btn);

		const onPlayPause = () => {
			if (this.audio.paused) {
				this.audio.play();
				btn.classList.add('pause');
			}
			else {
				this.audio.pause();
				btn.classList.remove('pause');
			}
		};

		btn.addEventListener('click', onPlayPause);


		const slider = doc.createElement('div');
		slider.classList.add(className('s'));
		this.sliderView_ = config.sliderView;
		slider.appendChild(this.sliderView_.element);
		wrapBtnSld.appendChild(slider);

		const elapsed = doc.createElement('div');
		elapsed.classList.add(className('t'));
		elapsed.innerText = '00:00';
		wrapTxt.appendChild(elapsed);


		const formatTime = (duration) => {
			const min = ~~(duration / 60);
			const sec = ~~(duration % 60);
			return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
		};	

		const source = config.props.value('source');

		this.audio = doc.createElement('audio');
		// this.audio.addEventListener('loadedmetadata', () => elapsed.innerText = formatTime(this.audio.duration));
		this.audio.addEventListener('timeupdate', () => {
			const t = this.audio.currentTime / this.audio.duration;
			this.sliderView_.value.setRawValue(t * 100);
			elapsed.innerText = formatTime(this.audio.currentTime);
		});
		this.audio.src = source.rawValue;

	}
}
