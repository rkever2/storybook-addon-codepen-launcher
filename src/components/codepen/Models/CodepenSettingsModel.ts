/* See https!://blog.codepen.io/documentation/prefill/ for CodePen option object details for POST Prefill */
import codepenSettingsConfig from "../CodepenSettingsConfig.json";

export interface CodepenSettingsModelInterface {
    titlePrepend: string;
    titlePrependSeperator: string;
    resultsIframeBodyDefaultPadding: string;
    removeCommentsFromHtml: boolean;
    removeCommentsFromCss: boolean;
    removeCommentsFromJs: boolean;
    formatHtml: boolean;
    formatCss: boolean;
    formatJs: boolean;
}

export class CodepenSettingsModel {
    private _titlePrepend: string;
    private _titlePrependSeperator: string;
    private _resultsIframeBodyDefaultPadding: string;
    private _removeCommentsFromHtml: boolean;
    private _removeCommentsFromCss: boolean;
    private _removeCommentsFromJs: boolean;
    private _formatHtml: boolean;
    private _formatCss: boolean;
    private _formatJs: boolean;

    constructor(data: Partial<CodepenSettingsModelInterface>) {
        this._titlePrepend = data.titlePrepend ?? codepenSettingsConfig.settings.titlePrepend;
        this._titlePrependSeperator = data.titlePrependSeperator ?? codepenSettingsConfig.settings.titlePrependSeperator;
        this._resultsIframeBodyDefaultPadding = data.resultsIframeBodyDefaultPadding ?? codepenSettingsConfig.settings.resultsIframeBodyDefaultPadding;
        this._removeCommentsFromHtml = data.removeCommentsFromHtml ?? codepenSettingsConfig.settings.removeCommentsFromHtml;
        this._removeCommentsFromCss = data.removeCommentsFromCss ?? codepenSettingsConfig.settings.removeCommentsFromCss;
        this._removeCommentsFromJs = data.removeCommentsFromJs ?? codepenSettingsConfig.settings.removeCommentsFromJs;
        this._formatHtml = data.formatHtml ?? codepenSettingsConfig.settings.formatHtml;
        this._formatCss = data.formatCss ?? codepenSettingsConfig.settings.formatCss;
        this._formatJs = data.formatJs ?? codepenSettingsConfig.settings.formatJs;
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

    get removeCommentsFromCss(): boolean {
        return this._removeCommentsFromCss;
    }

    set removeCommentsFromCss(value: boolean) {
        this._removeCommentsFromCss = value;
    }

    get removeCommentsFromJs(): boolean {
        return this._removeCommentsFromJs;
    }

    set removeCommentsFromJs(value: boolean) {
        this._removeCommentsFromJs = value;
    }

    get formatHtml(): boolean {
        return this._formatHtml;
    }

    set formatHtml(value: boolean) {
        this._formatHtml = value;
    }

    get formatCss(): boolean {
        return this._formatCss;
    }

    set formatCss(value: boolean) {
        this._formatCss = value;
    }

    get formatJs(): boolean {
        return this._formatJs;
    }

    set formatJs(value: boolean) {
        this._formatJs = value;
    }
}
