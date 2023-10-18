import { DisplaySettingsState } from "../baseball/model/DisplaySettingsState.ts"
import { generateGradient } from "../service/css.ts"

export const CSS_VARIABLES = (displaySettings: DisplaySettingsState) => {
    return `
    --large-font-size: 32px;
    --primary: #e20514;
    --bg-gray: #d3d3d3;
    --default-border: 2px solid gray;
    --default-drop-shadow: drop-shadow(2px 2px 0px #00000088) drop-shadow(0px 0px 3px #00000088);
    --home-drop-shadow: drop-shadow(2px 2px 0px ${displaySettings.homeLogoShadow}88) drop-shadow(0px 0px 3px ${
        displaySettings.homeLogoShadow
    });
    --away-drop-shadow: drop-shadow(2px 2px 0px ${displaySettings.awayLogoShadow}88) drop-shadow(0px 0px 3px ${
        displaySettings.awayLogoShadow
    });
    --font-color-light: ${displaySettings.fontColorLight};
    --font-color-dark: ${displaySettings.fontColorDark};
    --home-gradient: ${generateGradient(displaySettings.homeGradient)};
    --away-gradient: ${generateGradient(displaySettings.awayGradient)};
    --layout-gradient: ${generateGradient(displaySettings.layoutGradient)};
    --background-gradient: ${generateGradient(displaySettings.backgroundGradient)};
`
}
