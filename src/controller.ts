import {Controller, ViewProps, Value, SliderController, SliderProps} from '@tweakpane/core';

import {PluginProps, PluginView} from './view';

interface Config {
	props: PluginProps;
	viewProps: ViewProps;

	baseStep: number;
	sliderProps: SliderProps;
	value: Value<number>;
}

export class PluginController implements Controller<PluginView> {
	public readonly props: PluginProps;
	public readonly view: PluginView;
	public readonly viewProps: ViewProps;

	public readonly value: Value<number>;
	private readonly sliderC_: SliderController;

	constructor(doc: Document, config: Config) {
		this.props = config.props;
		this.viewProps = config.viewProps;
		this.value = config.value;
		

		this.sliderC_ = new SliderController(doc, {
			baseStep: config.baseStep,
			props: config.sliderProps,
			value: config.value,
			viewProps: this.viewProps,
		});

		this.view = new PluginView(doc, {
			sliderView: this.sliderC_.view,
			props: this.props,
			viewProps: this.viewProps,
		});
	}
}
