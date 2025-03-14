import type { StoryContext, Renderer } from "storybook/internal/types";
import { format as prettierFormat } from "prettier/standalone";
import * as prettierHtml from "prettier/plugins/html";
import { Options as PrettierOptions } from "prettier";
import { CodepenGlobalsModel, CodepenGlobalsModelInterface } from "./Models/CodepenGlobalsModel";
import { CodepenOptionsModel, CodepenOptionsModelInterface } from "./Models/CodepenOptionsModel";
import { CodepenSettingsModel, CodepenSettingsModelInterface } from "./Models/CodepenSettingsModel";
import { CodepenPostModel, CodepenPostModelInterface } from "./Models/CodepenPostModel";

/**
 *
 * @param context - StoryContext<Renderer>
 * @returns settings ob
 */
function getCurrentCopenSettings(context: StoryContext<Renderer>): CodepenSettingsModelInterface {
    const userCodepenParams: any = context.parameters["codepenLauncher"] || {};

    const userGlobalParams: any = (userCodepenParams.global as CodepenGlobalsModelInterface) || {};
    const userPostParams: any = (userCodepenParams.post as CodepenPostModelInterface) || {};
    const userOptionsParams: any = (userCodepenParams.options as CodepenOptionsModelInterface) || {};

    const codepenSettings: CodepenSettingsModelInterface = new CodepenSettingsModel(new CodepenGlobalsModel(userGlobalParams), new CodepenPostModel(userPostParams), new CodepenOptionsModel(userOptionsParams));

    return codepenSettings;
}

/**
 *
 * @param settings - CodepenSettingsModelInterface
 * @param codepenOptions - CodepenOptionsModelInterface
 * @returns void
 */
async function sendPostData(settings: CodepenSettingsModelInterface): Promise<void> {
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
 * @param codepenSettings - CodepenSettingsModelInterface
 * @returns {string} - The styles from the head
 */
function buildStyles(codepenSettings: CodepenSettingsModelInterface): string {
    let styles: string = codepenSettings.global.resultsIframeBodyDefaultPadding ? `body { padding: ${codepenSettings.global.resultsIframeBodyDefaultPadding}; /* codepenLauncher */ }\n` : "";

    if (codepenSettings.options.css) {
        styles += codepenSettings.options.css;

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
    const codepenSettings = getCurrentCopenSettings(context);
    const html = codepenSettings.options.html && codepenSettings.options.html !== "" ? codepenSettings.options.html : (context.canvasElement as HTMLElement).innerHTML;
    const htmlFormatted = await formatHtml(html, codepenSettings.global.removeCommentsFromHtml);

    codepenSettings.options.html = htmlFormatted;
    codepenSettings.options.css = buildStyles(codepenSettings);
    codepenSettings.options.title = codepenSettings.options.title ?? `${codepenSettings.global.titlePrepend}${codepenSettings.global.titlePrependSeperator}${context.title}`;

    await sendPostData(codepenSettings);

    updateGlobals({
        [key]: false,
    });
};
