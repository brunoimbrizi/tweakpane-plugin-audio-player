import {BladeApi, LabelController} from '@tweakpane/core';

import {PluginController} from './controller';

export class PluginApi extends BladeApi<LabelController<PluginController>> {
	get label(): string | null | undefined {
		return this.controller_.props.get('label');
	}

	set label(label: string | null | undefined) {
		this.controller_.props.set('label', label);
	}

	get audio(): HTMLMediaElement {
		return this.controller_.valueController.audio;
	}

	get source(): string {
		return this.controller_.valueController.props.get('source');
	}

	set source(value: string) {
		this.controller_.valueController.props.set('source', value);
		this.audio.src = value;
	}
}
