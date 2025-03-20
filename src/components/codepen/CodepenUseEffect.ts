import type { StoryContext, Renderer } from "storybook/internal/types";
import { format as prettierFormat } from "prettier/standalone";
import * as prettierPluginHtml from "prettier/plugins/html";
import * as prettierPluginCss from "prettier/plugins/postcss";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { Options as PrettierOptions } from "prettier";
import { CodepenSettingsModel, CodepenSettingsModelInterface } from "./Models/CodepenSettingsModel";
import { CodepenOptionsModel, CodepenOptionsModelInterface } from "./Models/CodepenOptionsModel";
import { CodepenConfigModel, CodepenConfigModelInterface } from "./Models/CodepenConfigModel";
import { CodepenPostModel, CodepenPostModelInterface } from "./Models/CodepenPostModel";

/**
 *  *
 * @param str - string
 * @param type - "html" | "css" | "js"
 * @returns string
 */
export function removeComments(str: string, type: "html" | "css" | "js"): string {
    switch (type) {
        case "html":
            return str.replace(/<!--[\s\S]*?-->/g, "");
        case "css":
        case "js":
            return str.replace(/\/\*[\s\S]*?\*\//g, "");
        default:
            return str;
    }
}

/**
 *  *
 * @param context - StoryContext<Renderer>
 * @returns settings ob
 */
function getCurrentCodepenConfig(context: StoryContext<Renderer>): CodepenConfigModelInterface {
    const userCodepenParams: any = context.parameters["codepenLauncher"] || {};

    const userSettingsParams: any = (userCodepenParams.settings as CodepenSettingsModelInterface) || {};
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

/**
 *
 * @param {string} htmlString - The HTML string to format
 */
async function formatCode(codeString: string, parser: "html" | "css" | "babel"): Promise<string> {
    let formattedCode: string = "No code to render"; // Default message

    const prettierConfig: PrettierOptions = {
        parser,
        plugins: parser === "html" ? [prettierPluginHtml] : parser === "css" ? [prettierPluginCss] : [prettierPluginBabel, prettierPluginEstree],
        ...(parser === "html" && { htmlWhitespaceSensitivity: "ignore", bracketSameLine: true }),
    };

    const format = async () => {
        formattedCode = await prettierFormat(codeString, prettierConfig);
    };

    await format().catch((e) => console.error(e));

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
    let html = codepenConfig.options.html || (context.canvasElement as HTMLElement).innerHTML;
    if (codepenConfig.settings.removeCommentsFromHtml) html = removeComments(html, "html");
    codepenConfig.options.html = codepenConfig.settings.formatHtml ? await formatCode(html, "html") : html;

    // CSS
    let css = buildStyles(codepenConfig);
    if (codepenConfig.settings.removeCommentsFromHtml) css = removeComments(css, "css");
    codepenConfig.options.css = codepenConfig.settings.formatCss ? await formatCode(css, "css") : css;

    // JS
    let js = codepenConfig.options.js;
    if (codepenConfig.settings.removeCommentsFromJs) js = removeComments(js, "js");
    codepenConfig.options.js = codepenConfig.settings.formatJs ? await formatCode(js, "babel") : js;

    // title
    codepenConfig.options.title = codepenConfig.options.title || `${codepenConfig.settings.titlePrepend}${codepenConfig.settings.titlePrependSeperator}${context.title}`;

    await sendPostData(codepenConfig);

    updateGlobals({
        [key]: false,
    });
};
