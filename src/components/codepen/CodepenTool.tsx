import React, { memo, useCallback, useEffect } from "react";
import { useGlobals, type API } from "storybook/internal/manager-api";
import { IconButton } from "storybook/internal/components";
import { ADDON_ID, KEY, TOOL_ID } from "../../constants";
import CodePenIcon from "./CodepenIcon";

/**
 * CodepenLauncherSelector for Storybook Addon
 * @param {API} api - Storybook API
 * @returns {React.FC}
 */
export const CodepenTool = memo(function CodepenLauncherSelector({ api }: { api: API }) {
    const [globals, updateGlobals, storyGlobals] = useGlobals();

    const isLocked = KEY in storyGlobals;
    const isActive = !!globals[KEY];

    const launchCodePen = useCallback(() => {
        updateGlobals({
            [KEY]: true,
        });
    }, [isActive]);

    useEffect(() => {
        api.setAddonShortcut(ADDON_ID, {
            label: "CodePen Launcher [O]",
            defaultShortcut: ["O"],
            actionName: "codepen",
            showInMenu: false,
            action: launchCodePen,
        });
    }, [launchCodePen, api]);

    return (
        <IconButton key={TOOL_ID} active={isActive} disabled={isLocked} title="Test" onClick={launchCodePen}>
            <CodePenIcon />
        </IconButton>
    );
});
