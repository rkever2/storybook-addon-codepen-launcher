import type { StoryContext, Renderer } from "storybook/internal/types";
import { format as prettierFormat } from "prettier/standalone";
import * as prettierHtml from "prettier/plugins/html";
import * as prettierCss from "prettier/plugins/postcss";
import * as prettierJs from "prettier/plugins/babel";
import { Options as PrettierOptions } from "prettier";
import { CodepenSettingsModel, CodepenSettingsModelInterface } from "./Models/CodepenSettingsModel";
import { CodepenOptionsModel, CodepenOptionsModelInterface } from "./Models/CodepenOptionsModel";
import { CodepenConfigModel, CodepenConfigModelInterface } from "./Models/CodepenConfigModel";
import { CodepenPostModel, CodepenPostModelInterface } from "./Models/CodepenPostModel";

/**
 *
 * @param context - StoryContext<Renderer>
 * @returns settings ob
 */
function getCurrentCodepenConfig(context: StoryContext<Renderer>): CodepenConfigModelInterface {
    const userCodepenParams: any = context.parameters["codepenLauncher"] || {};

    const userSettingsParams: any = (userCodepenParams.config as CodepenSettingsModelInterface) || {};
    const userPostParams: any = (userCodepenParams.post as CodepenPostModelInterface) || {};
    const userOptionsParams: any = (userCodepenParams.options as CodepenOptionsModelInterface) || {};

    const codepenConfig: CodepenConfigModelInterface = new CodepenConfigModel(new CodepenSettingsModel(userSettingsParams), new CodepenPostModel(userPostParams), new CodepenOptionsModel(userOptionsParams));

    return codepenConfig;
}

/**
 *
 * @param settings - CodepenSettingsModelInterface
 * @param codepenOptions - CodepenOptionsModelInterface
 * @returns void
 */
async function sendPostData(settings: CodepenConfigModelInterface): Promise<void> {
    // build form
    const form = document.createElement("form");
    form.style.display = "none";
    form.method = "POST";
    form.action = settings.post.actionUrl;
    form.target = settings.post.target;

    // sanitizing input data
    const escapedData = JSON.stringify(settings.options).replace(/"/g, "&quot;").replace(/'/g, "&apos;");

    // build input
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = settings.post.inputName;
    input.value = escapedData;

    // put it all together and send form
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();

    return Promise.resolve();
}

// TODO: Looking into DRY for the below three functions
/**
 *
 * @param {string} htmlString - The HTML string to format
 * @param {boolean} removeComments - Whether to remove comments or not
 * @returns {string} - The formatted HTML string
 */
async function formatHtml(htmlString: string, removeComments: boolean): Promise<string> {
    let formattedCode: string = "No HTML to render";

    const prettierConfig: PrettierOptions = {
        htmlWhitespaceSensitivity: "ignore",
        parser: "html",
        plugins: [prettierHtml],
        bracketSameLine: true,
    };

    // Remove comments
    if (removeComments) {
        htmlString = htmlString.replace(/<!--[\s\S]*?-->/g, "");
    }

    const formatCode = async () => {
        formattedCode = await prettierFormat(htmlString, prettierConfig);
    };

    await formatCode().catch((e) => console.error(e));

    return Promise.resolve(formattedCode);
}

/**
 *
 * @param {string} cssString - The CSS string to format
 * @param {boolean} removeComments - Whether to remove comments or not
 * @returns {string} - The formatted CSS string
 */
async function formatCss(cssString: string, removeComments: boolean): Promise<string> {
    let formattedCode: string = "No CSS to render"; // Default message

    const prettierConfig: PrettierOptions = {
        parser: "css",
        plugins: [prettierCss],
    };

    // Remove comments
    if (removeComments) {
        cssString = cssString.replace(/\/\*[\s\S]*?\*\//g, "");
    }

    const formatCode = async () => {
        formattedCode = await prettierFormat(cssString, prettierConfig);
    };

    await formatCode().catch((e) => console.error(e));

    return Promise.resolve(formattedCode);
}

/**
 *
 * @param {string} jsString - The JS string to format
 * @param {boolean} removeComments - Whether to remove comments or not
 * @returns {string} - The formatted JS string
 */
async function formatJs(jsString: string, removeComments: boolean): Promise<string> {
    let formattedCode: string = "No JS to render"; // Default message

    const prettierConfig: PrettierOptions = {
        parser: "babel",
    };

    // Remove comments
    if (removeComments) {
        jsString = jsString.replace(/\/\*[\s\S]*?\*\//g, "");
    }

    const formatCode = async () => {
        formattedCode = await prettierFormat(jsString, prettierConfig);
    };

    await formatCode().catch((e) => console.error(e));

    return Promise.resolve(formattedCode);
}

/**
 *
 * @param codepenConfig - CodepenConfigModelInterface
 * @returns {string} - The styles from the head
 */
function buildStyles(codepenConfig: CodepenConfigModelInterface): string {
    let styles: string = codepenConfig.settings.resultsIframeBodyDefaultPadding ? `body { padding: ${codepenConfig.settings.resultsIframeBodyDefaultPadding}; /* codepenLauncher */ }\n` : "";

    if (codepenConfig.options.css) {
        styles += codepenConfig.options.css;

        return styles;
    }

    const styleElements: NodeListOf<HTMLStyleElement> = document.querySelectorAll("head > style");

    if (styleElements) {
        styleElements.forEach((styleElement) => {
            styles += styleElement.textContent;
        });
    }

    return styles;
}

/**
 *
 * @param isActivated - boolean
 * @param context - StoryContext<Renderer>
 * @param updateGlobals - any
 * @param key - string
 */
export const codepenEffect = async (isActivated: boolean, context: StoryContext<Renderer>, updateGlobals: any, key: string) => {
    if (!isActivated) return;
    const codepenConfig = getCurrentCodepenConfig(context);

    // HTML
    const html = codepenConfig.options.html && codepenConfig.options.html !== "" ? codepenConfig.options.html : (context.canvasElement as HTMLElement).innerHTML;
    const htmlFormatted = codepenConfig.settings.formatHtml ? await formatHtml(html, codepenConfig.settings.removeCommentsFromHtml) : html;
    codepenConfig.options.html = htmlFormatted;

    // CSS
    const css = buildStyles(codepenConfig);
    codepenConfig.options.css = codepenConfig.settings.formatCss ? await formatCss(css, codepenConfig.settings.removeCommentsFromCss) : css;

    // JS
    const js = codepenConfig.options.js;
    codepenConfig.options.js = codepenConfig.settings.formatJs ? await formatCss(js, false) : js;

    codepenConfig.options.title = codepenConfig.options.title ?? `${codepenConfig.settings.titlePrepend}${codepenConfig.settings.titlePrependSeperator}${context.title}`;

    await sendPostData(codepenConfig);

    updateGlobals({
        [key]: false,
    });
};
