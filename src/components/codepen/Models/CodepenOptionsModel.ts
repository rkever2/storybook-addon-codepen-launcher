/* See https!://blog.codepen.io/documentation/prefill/ for CodePen option object details for POST Prefill */
import * as types from "./CodepenConfigTypes";
import codepenSettingsConfig from "../CodepenSettingsConfig.json";

export interface CodepenOptionsModelInterface {
    title: string;
    description: string;
    private: boolean;
    parent: string;
    tags: Array<string>;
    editors: types.Editors;
    layout: types.Layout;
    html: string;
    html_pre_processor: types.HtmlPreProcessor;
    css: string;
    css_pre_processor: types.CssPreProcessor;
    css_starter: types.CssStarter;
    css_prefix: types.CssPrefix;
    js: string;
    js_pre_processor: types.JsPreProcessor;
    html_classes: string;
    head: string;
    css_external: string;
    js_external: string;
    // NOTE: Not including depreciated CodePen prefill attributes
}

export class CodepenOptionsModel implements CodepenOptionsModelInterface {
    private _title: string;
    private _description: string;
    private _private: boolean;
    private _parent: string;
    private _tags: Array<string>;
    private _editors: types.Editors;
    private _layout: types.Layout;
    private _html: string;
    private _html_pre_processor: types.HtmlPreProcessor;
    private _css: string;
    private _css_pre_processor: types.CssPreProcessor;
    private _css_starter: types.CssStarter;
    private _css_prefix: types.CssPrefix;
    private _js: string;
    private _js_pre_processor: types.JsPreProcessor;
    private _html_classes: string;
    private _head: string;
    private _css_external: string;
    private _js_external: string;

    constructor(data: Partial<CodepenOptionsModelInterface>) {
        this._title = data.title ?? codepenSettingsConfig.options.title;
        this._description = data.description ?? codepenSettingsConfig.options.description;
        this._private = data.private ?? codepenSettingsConfig.options.private;
        this._parent = data.parent ?? codepenSettingsConfig.options.parent;
        this._tags = data.tags ?? codepenSettingsConfig.options.tags;
        this._editors = data.editors ?? (codepenSettingsConfig.options.editors as types.Editors);
        this._layout = data.layout ?? (codepenSettingsConfig.options.layout as types.Layout);
        this._html = data.html ?? codepenSettingsConfig.options.html;
        this._html_pre_processor = data.html_pre_processor ?? (codepenSettingsConfig.options.html_pre_processor as types.HtmlPreProcessor);
        this._css = data.css ?? codepenSettingsConfig.options.css;
        this._css_pre_processor = data.css_pre_processor ?? (codepenSettingsConfig.options.css_pre_processor as types.CssPreProcessor);
        this._css_starter = data.css_starter ?? (codepenSettingsConfig.options.css_starter as types.CssStarter);
        this._css_prefix = data.css_prefix ?? (codepenSettingsConfig.options.css_prefix as types.CssPrefix);
        this._js = data.js ?? codepenSettingsConfig.options.js;
        this._js_pre_processor = data.js_pre_processor ?? (codepenSettingsConfig.options.js_pre_processor as types.JsPreProcessor);
        this._html_classes = data.html_classes ?? codepenSettingsConfig.options.html_classes;
        this._head = data.head ?? codepenSettingsConfig.options.head;
        this._css_external = data.css_external ?? codepenSettingsConfig.options.css_external;
        this._js_external = data.js_external ?? codepenSettingsConfig.options.js_external;
    }

    // Setters
    set title(value: string) {
        this._title = value;
    }
    set description(value: string) {
        this._description = value;
    }
    set private(value: boolean) {
        this._private = value;
    }
    set parent(value: string) {
        this._parent = value;
    }
    set tags(value: Array<string>) {
        this._tags = value;
    }
    set editors(value: types.Editors) {
        this._editors = value;
    }
    set layout(value: types.Layout) {
        this._layout = value;
    }
    set html(value: string) {
        this._html = value;
    }
    set html_pre_processor(value: types.HtmlPreProcessor) {
        this._html_pre_processor = value;
    }
    set css(value: string) {
        this._css = value;
    }
    set css_pre_processor(value: types.CssPreProcessor) {
        this._css_pre_processor = value;
    }
    set css_starter(value: types.CssStarter) {
        this._css_starter = value;
    }
    set css_prefix(value: types.CssPrefix) {
        this._css_prefix = value;
    }
    set js(value: string) {
        this._js = value;
    }
    set js_pre_processor(value: types.JsPreProcessor) {
        this._js_pre_processor = value;
    }
    set html_classes(value: string) {
        this._html_classes = value;
    }
    set head(value: string) {
        this._head = value;
    }
    set css_external(value: string) {
        this._css_external = value;
    }
    set js_external(value: string) {
        this._js_external = value;
    }

    // Getters
    get title(): string {
        return this._title;
    }
    get description(): string {
        return this._description;
    }
    get private(): boolean {
        return this._private;
    }
    get parent(): string {
        return this._parent;
    }
    get tags(): Array<string> {
        return this._tags;
    }
    get editors(): types.Editors {
        return this._editors;
    }
    get layout(): types.Layout {
        return this._layout;
    }
    get html(): string {
        return this._html;
    }
    get html_pre_processor(): types.HtmlPreProcessor {
        return this._html_pre_processor;
    }
    get css(): string {
        return this._css;
    }
    get css_pre_processor(): types.CssPreProcessor {
        return this._css_pre_processor;
    }
    get css_starter(): types.CssStarter {
        return this._css_starter;
    }
    get css_prefix(): types.CssPrefix {
        return this._css_prefix;
    }
    get js(): string {
        return this._js;
    }
    get js_pre_processor(): types.JsPreProcessor {
        return this._js_pre_processor;
    }
    get html_classes(): string {
        return this._html_classes;
    }
    get head(): string {
        return this._head;
    }
    get css_external(): string {
        return this._css_external;
    }
    get js_external(): string {
        return this._js_external;
    }

    // Need to implement toJSON() method to remove private fields starting with '_' so we can easily send the data to CodePen
    // Note that this is available automagically when used in a class and allows customization of the JSON.stringify() method
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    toJSON(): any {
        let clone: any = Object.assign({}, this);

        const descriptors = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this));

        Object.keys(descriptors).forEach((key) => {
            if (descriptors[key] && descriptors[key].get) {
                delete clone[key];
                clone[key] = (this as any)[key];
            }
        });

        //Remove any left over private fields starting with '_'
        Object.keys(clone).forEach((key) => {
            if (key.indexOf("_") == 0) {
                delete clone[key];
            }
        });

        return clone;
    }
}
