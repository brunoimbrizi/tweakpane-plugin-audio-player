import {
	BaseBladeParams,
	BladePlugin,
	LabelController,
	LabelPropsObject,
	ParamsParsers,
	parseParams,
	ValueMap,
} from '@tweakpane/core';

import {PluginApi} from './api';
import {PluginController} from './controller';
import {PluginPropsObject} from './view';

export interface PluginBladeParams extends BaseBladeParams {
	source: string;
	view: 'audio-player';
	label?: string;
}

export const AudioPlayerBladePlugin: BladePlugin<PluginBladeParams> = {
	id: 'blade-audio-player',
	type: 'blade',
	css: '__css__',

	accept(params) {
		const p = ParamsParsers;
		const result = parseParams<PluginBladeParams>(params, {
			view: p.required.constant('audio-player'),
			source: p.required.string,
			label: p.optional.string,
		});
		return result ? {params: result} : null;
	},

	controller(args) {
		const controller = new PluginController(args.document, {
			props: ValueMap.fromObject<PluginPropsObject>({
				source: args.params.source,
			}),
			viewProps: args.viewProps,
		});

		return new LabelController(args.document, {
			blade: args.blade,
			props: ValueMap.fromObject<LabelPropsObject>({
				label: args.params.label,
			}),
			valueController: controller,
		});
	},

	api(args) {
		if (!(args.controller instanceof LabelController)) {
			return null;
		}
		if (!(args.controller.valueController instanceof PluginController)) {
			return null;
		}
		return new PluginApi(args.controller);
	},
};
