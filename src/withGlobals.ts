import { useEffect, useGlobals } from "storybook/internal/preview-api";
import { global } from "@storybook/global";
import type { Renderer, StoryContext, PartialStoryFn as StoryFunction } from "storybook/internal/types";
import { codepenEffect } from "./components/codepen/CodepenUseEffect";
import { KEY } from "./constants";

export const withGlobals = (StoryFn: StoryFunction<Renderer>, context: StoryContext<Renderer>) => {
    const [globals, updateGlobals] = useGlobals();
    const codepenLauncherAddon = globals[KEY];
    const canvas = context.canvasElement as ParentNode;

    // Is the addon being used in the docs panel
    const isInDocs = context.viewMode === "docs";
    const isCodepenActivated = globals[KEY] && !isInDocs;

    useEffect(() => {
        codepenEffect(isCodepenActivated, context, updateGlobals, KEY);
    }, [codepenLauncherAddon, isInDocs]);

    return StoryFn();
};
