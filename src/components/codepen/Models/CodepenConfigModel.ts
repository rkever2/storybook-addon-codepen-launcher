/* See https!://blog.codepen.io/documentation/prefill/ for CodePen option object details for POST Prefill */
import { CodepenSettingsModelInterface } from "./CodepenSettingsModel";
import { CodepenPostModelInterface } from "./CodepenPostModel";
import { CodepenOptionsModelInterface } from "./CodepenOptionsModel";

export interface CodepenConfigModelInterface {
    settings: Partial<CodepenSettingsModelInterface>;
    post: Partial<CodepenPostModelInterface>;
    options: Partial<CodepenOptionsModelInterface>;
}

export class CodepenConfigModel {
    private _settings: Partial<CodepenSettingsModelInterface>;
    private _post: Partial<CodepenPostModelInterface>;
    private _options: Partial<CodepenOptionsModelInterface>;

    constructor(global: Partial<CodepenSettingsModelInterface>, post: Partial<CodepenPostModelInterface>, options: Partial<CodepenOptionsModelInterface>) {
        this._settings = global;
        this._post = post;
        this._options = options;
    }

    get settings(): Partial<CodepenSettingsModelInterface> {
        return this._settings;
    }

    set settings(value: Partial<CodepenSettingsModelInterface>) {
        this._settings = value;
    }

    get post(): Partial<CodepenPostModelInterface> {
        return this._post;
    }

    set post(value: Partial<CodepenPostModelInterface>) {
        this._post = value;
    }

    get options(): Partial<CodepenOptionsModelInterface> {
        return this._options;
    }

    set options(value: Partial<CodepenOptionsModelInterface>) {
        this._options = value;
    }
}
