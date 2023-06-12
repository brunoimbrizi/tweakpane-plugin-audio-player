import {BladeApi, LabelController} from '@tweakpane/core';

import {PluginController} from './controller';

export class PluginApi extends BladeApi<LabelController<PluginController>> {
	get label(): string | null | undefined {
		return this.controller_.props.get('label');
	}

	set label(label: string | null | undefined) {
		this.controller_.props.set('label', label);
	}
}
