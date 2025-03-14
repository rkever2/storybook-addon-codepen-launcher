/* See https!://blog.codepen.io/documentation/prefill/ for CodePen option object details for POST Prefill */
import codepenSettingsConfig from "../CodepenSettingsConfig.json";

export interface CodepenGlobalsModelInterface {
    titlePrepend: string;
    titlePrependSeperator: string;
    resultsIframeBodyDefaultPadding: string;
    removeCommentsFromHtml: boolean;
}

export class CodepenGlobalsModel {
    private _titlePrepend: string;
    private _titlePrependSeperator: string;
    private _resultsIframeBodyDefaultPadding: string;
    private _removeCommentsFromHtml: boolean;

    constructor(data: Partial<CodepenGlobalsModelInterface>) {
        this._titlePrepend = data.titlePrepend ?? codepenSettingsConfig.global.titlePrepend;
        this._titlePrependSeperator = data.titlePrependSeperator ?? codepenSettingsConfig.global.titlePrependSeperator;
        this._resultsIframeBodyDefaultPadding = data.resultsIframeBodyDefaultPadding ?? codepenSettingsConfig.global.resultsIframeBodyDefaultPadding;
        this._removeCommentsFromHtml = data.removeCommentsFromHtml ?? codepenSettingsConfig.global.removeCommentsFromHtml;
    }

    get titlePrepend(): string {
        return this._titlePrepend;
    }

    set titlePrepend(value: string) {
        this._titlePrepend = value;
    }

    get titlePrependSeperator(): string {
        return this._titlePrependSeperator;
    }

    set titlePrependSeperator(value: string) {
        this._titlePrependSeperator = value;
    }

    get resultsIframeBodyDefaultPadding(): string {
        return this._resultsIframeBodyDefaultPadding;
    }

    set resultsIframeBodyDefaultPadding(value: string) {
        this._resultsIframeBodyDefaultPadding = value;
    }

    get removeCommentsFromHtml(): boolean {
        return this._removeCommentsFromHtml;
    }

    set removeCommentsFromHtml(value: boolean) {
        this._removeCommentsFromHtml = value;
    }
}
