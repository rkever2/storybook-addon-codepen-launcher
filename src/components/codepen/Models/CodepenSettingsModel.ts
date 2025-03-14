/* See https!://blog.codepen.io/documentation/prefill/ for CodePen option object details for POST Prefill */
import { CodepenGlobalsModelInterface } from "./CodepenGlobalsModel";
import { CodepenPostModelInterface } from "./CodepenPostModel";
import { CodepenOptionsModelInterface } from "./CodepenOptionsModel";

export interface CodepenSettingsModelInterface {
    global: Partial<CodepenGlobalsModelInterface>;
    post: Partial<CodepenPostModelInterface>;
    options: Partial<CodepenOptionsModelInterface>;
}

export class CodepenSettingsModel {
    private _global: Partial<CodepenGlobalsModelInterface>;
    private _post: Partial<CodepenPostModelInterface>;
    private _options: Partial<CodepenOptionsModelInterface>;

    constructor(global: Partial<CodepenGlobalsModelInterface>, post: Partial<CodepenPostModelInterface>, options: Partial<CodepenOptionsModelInterface>) {
        this._global = global;
        this._post = post;
        this._options = options;
    }

    get global(): Partial<CodepenGlobalsModelInterface> {
        return this._global;
    }

    set global(value: Partial<CodepenGlobalsModelInterface>) {
        this._global = value;
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
