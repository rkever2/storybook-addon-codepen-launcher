import codepenSettingsConfig from "../CodepenSettingsConfig.json";

export interface CodepenPostModelInterface {
    actionUrl: string;
    target: string;
    inputName: string;
}

export class CodepenPostModel {
    private _actionUrl: string;
    private _target: string;
    private _inputName: string;

    constructor(data: Partial<CodepenPostModelInterface>) {
        this._actionUrl = data.actionUrl ?? codepenSettingsConfig.POST.actionUrl;
        this._target = data.target ?? codepenSettingsConfig.POST.target;
        this._inputName = data.inputName ?? codepenSettingsConfig.POST.inputName;
    }

    get actionUrl(): string {
        return this._actionUrl;
    }

    set actionUrl(value: string) {
        this._actionUrl = value;
    }

    get target(): string {
        return this._target;
    }

    set target(value: string) {
        this._target = value;
    }

    get inputName(): string {
        return this._inputName;
    }

    set inputName(value: string) {
        this._inputName = value;
    }
}
