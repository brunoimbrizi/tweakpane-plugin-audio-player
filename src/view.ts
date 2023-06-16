import {
	ClassName,
	SliderView,
	ValueMap,
	View,
	ViewProps,
} from '@tweakpane/core';

export type PluginPropsObject = {
	source: string;
};

export type PluginProps = ValueMap<PluginPropsObject>;

interface Config {
	sliderView: SliderView;
	props: PluginProps;
	viewProps: ViewProps;
	audio: HTMLMediaElement;
}

const className = ClassName('plyr');

export class PluginView implements View {
	public readonly element: HTMLElement;
	public readonly audio: HTMLMediaElement;

	private readonly btn: HTMLElement;
	private readonly wrapBtn: HTMLElement;
	private readonly elapsed: HTMLElement;
	private readonly sliderView_: SliderView;

	constructor(doc: Document, config: Config) {
		// UI
		this.element = doc.createElement('div');
		this.element.classList.add(className());
		config.viewProps.bindClassModifiers(this.element);

		const wrapBtnSld = doc.createElement('div');
		wrapBtnSld.classList.add(className('w'));
		this.element.appendChild(wrapBtnSld);

		const wrapBtn = doc.createElement('div');
		wrapBtn.classList.add(className('wb'));
		wrapBtnSld.appendChild(wrapBtn);
		this.wrapBtn = wrapBtn;

		const wrapTxt = doc.createElement('div');
		wrapTxt.classList.add(className('wt'));
		this.element.appendChild(wrapTxt);

		const btn = doc.createElement('div');
		btn.classList.add(className('b'));
		btn.classList.add('play');
		wrapBtn.appendChild(btn);
		this.btn = btn;

		const slider = doc.createElement('div');
		slider.classList.add(className('s'));
		this.sliderView_ = config.sliderView;
		slider.appendChild(this.sliderView_.element);
		wrapBtnSld.appendChild(slider);

		const elapsed = doc.createElement('div');
		elapsed.classList.add(className('t'));
		elapsed.innerText = '00:00';
		wrapTxt.appendChild(elapsed);
		this.elapsed = elapsed;

		// AUDIO
		this.audio = config.audio;

		// EVENT LISTENERS
		this.wrapBtn.addEventListener('click', this.onPlayPause_.bind(this));

		this.audio.addEventListener('loadedmetadata', this.onLoadedMetadata.bind(this));
		this.audio.addEventListener('timeupdate', this.onTimeUpdate_.bind(this));
		this.audio.addEventListener('ended', this.onEnded_.bind(this));
		this.audio.addEventListener('play', this.onPlay_.bind(this));
		this.audio.addEventListener('pause', this.onPause_.bind(this));

		this.sliderView_.value.emitter.on(
			'change',
			this.onSliderChange_.bind(this),
		);
	}

	private formatTime_(duration: number): string {
		const min = ~~(duration / 60);
		const sec = ~~(duration % 60);
		return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
	}

	private async onPlayPause_(): Promise<void> {
		if (this.audio.paused) await this.audio.play();
		else this.audio.pause();
	}

	private onSliderChange_(e: any): void {
		const isPointerDown = !e.options.forceEmit && !e.options.last;
		if (!isPointerDown) return;

		const t = e.rawValue / 100;
		this.audio.currentTime = this.audio.duration * t;
	}

	private onPlay_(): void {
		this.btn.classList.add('pause');
	}

	private onPause_(): void {
		this.btn.classList.remove('pause');
	}

	private onLoadedMetadata(): void {
		this.audio.currentTime = 0;
		this.btn.classList.remove('pause');
	}

	private onTimeUpdate_(): void {
		const t = this.audio.currentTime / this.audio.duration;
		this.sliderView_.value.setRawValue(t * 100);
		this.elapsed.innerText = this.formatTime_(this.audio.currentTime);
	}

	private onEnded_(): void {
		this.btn.classList.remove('pause');
	}
}
