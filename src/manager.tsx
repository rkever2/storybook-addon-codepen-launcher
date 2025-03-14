import React from "react";
import { addons, types } from "storybook/internal/manager-api";
import { CodepenTool } from "./components/codepen/CodepenTool";
import { ADDON_ID, TOOL_ID } from "./constants";

// Register the addon
addons.register(ADDON_ID, (api) => {
    // Register a tool
    addons.add(TOOL_ID, {
        type: types.TOOL,
        title: "Codepen Addon",
        match: ({ viewMode }) => viewMode === "story",
        render: () => <CodepenTool api={api} />,
    });
});
