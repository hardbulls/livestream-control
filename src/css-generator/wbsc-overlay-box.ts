import { State } from "../baseball/model/State"
import { CSS_VARIABLES } from "./variables.ts"

export const WBSC_OVERLAY_BOX = (state: State) => `

:root {
    ${CSS_VARIABLES(state.displaySettings)}
}

@font-face {
    font-family: ${state.displaySettings.font?.name};
    src: url("${state.displaySettings.font?.data}") format("woff2");
}

html {
    line-height: ${state.displaySettings.fontLineHeight}; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
}

body {
    margin: 0;
}

.box-score-top-bar>div.left-box>div>div:nth-child(1)::before {
    content: "${state.away}";
    margin-right: 10px;
    padding-left: 70px;
    margin-left: 4px;
    color: var(--font-color-light);
    filter: var(--default-drop-shadow);
}

div.box-score-top-bar > div.left-box > div.actual-teams > div:nth-child(1)::after {
    position: absolute;
    content: "";
    margin-right: 10px;
    background-image: url("${state.awayLogo?.data}");
    background-size: contain;
    background-repeat: no-repeat;
    padding: 21px;
    padding-left: 78px;
    margin-left: 4px;
    color: var(--font-color-light);
    filter: var(--away-drop-shadow);
}

.outs-indicator strong {
  font-weight: normal !important;
}

.box-score-top-bar>div.left-box>div>div:nth-child(3)::before {
    content: "${state.home}";
    margin-right: 10px;
    padding-left: 70px;
    margin-left: 4px;
    color: var(--font-color-light);
    filter: var(--default-drop-shadow);
}

div.box-score-top-bar > div.left-box > div.actual-teams > div:nth-child(3)::after {
    position: absolute;
    content: "";
    margin-right: 10px;
    background-image: url("${state.homeLogo?.data}");
    background-size: contain;
    background-repeat: no-repeat;
    padding: 21px;
    padding-left: 78px;
    margin-left: 4px;
    color: var(--font-color-light);
    filter: var(--home-drop-shadow);
}

body {
    background-color: ${state.displaySettings.filterColor} !important;
    font-family: ${state.displaySettings.font?.name}, sans-serif;
    color: var(--font-color-dark);
}

#app>div {
    background-image: none !important;
    background-color: ${state.displaySettings.filterColor} !important;
}


.box-score-top-bar p,
.box-score-top-bar span,
.box-score-top-bar a,
.box-score-top-bar div::before {
    font-family: ${state.displaySettings.font?.name}, sans-serif;
}

.box-score-top-bar .game-over-marquee {
    display: none;
}

.box-score-top-bar .actual-teams {
    display: flex !important;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

.box-score-top-bar .actual-teams > div:nth-child(1) {
    background: var(--away-gradient);
}

.box-score-top-bar .actual-teams > div:nth-child(3) {
    background: var(--home-gradient);
}


.center-box {
    display: none !important;
}

.right-box {
    display: none !important;
}

.box-score-top-bar .live-bar-toggle {
    display: none !important;
}

.box-score-top-bar {
    font-size: var(--large-font-size);
    background-color: ${state.displaySettings.filterColor} !important;
}

.box-score-top-bar .left-box {
    background-color: #ffffff;
    width: max-content !important;
    grid-gap: revert !important;
    grid-template-columns: revert !important;
    grid-template-rows: revert !important;
    display: flex !important;
    padding: 0;
    border: var(--default-border);
    background: var(--background-gradient);
}

.box-score-top-bar .divider {
    display: none;
}

.box-score-top-bar>div.left-box>a.back-to-schedule {
    display: none !important;
}

.box-score-top-bar .game-team {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.box-score-top-bar>div.left-box>div>div:nth-child(1)>span {
    width: 52px;
    background: var(--layout-gradient);
    justify-content: center;
    display: flex;
}

.box-score-top-bar>div.left-box>div>div:nth-child(3)>span {
    width: 52px;
    background: var(--layout-gradient);
    justify-content: center;
    display: flex;
}

.box-score-top-bar>div.left-box>div.indicators-container {
    padding: 0 !important;
}

.box-score-top-bar>div.left-box>div.indicators-container>span {
    display: none;
}

.box-score-top-bar>div.left-box>div.indicators-container>div {
    height: 100%;
}


.box-score-top-bar>div.left-box>div.indicators-container>div>div.inning-indicator {
    margin-left: 10px;
    margin-right: 10px;
    background: var(--layout-gradient);
    padding: 5px;
    height: 100%;
    display: flex;
    align-items: center;
}

.box-score-top-bar>div.left-box>div.indicators-container>div>div.inning-indicator>p {
    font-size: 38px;
    min-width: 38px;
    text-align: center;
}

.box-score-top-bar>div.left-box>div.indicators-container>div>div.inning-indicator .triangle {
    left: 19px !important;
    border-bottom: 6px solid ${state.displaySettings.activeInningColor} !important;
    transform: scale(3);
    margin-left: 2px;
}

.box-score-top-bar>div.left-box>div.indicators-container>div>div.inning-indicator .triangle.bot {
    bottom: 14px;
    transform: scale(3) rotate(180deg);
}

.box-score-top-bar>div.left-box>div.indicators-container>div>div.inning-indicator .triangle.top {
    top: 14px !important;
}

.live-situation .pitch-indicator {
    margin-left: 35px;
    margin-right: 45px;
    margin-top: 26px;
    width: 22px !important;
    transform: rotate(45deg) scale(3.5) !important;
}

.box-score-panel {
    display: none !important;
}

div.box-score-top-bar>div.center-box>div>div.tournament {
    display: none !important;
}

div.box-score-top-bar>div.left-box>div.indicators-container>div>div.outs-indicator {
    width: max-content;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: var(--large-font-size)
}

div.box-score-top-bar>div.left-box>div.indicators-container>div>div.outs-indicator>p:nth-child(1) {
    letter-spacing: 6px;
}

div.box-score-top-bar>div.left-box>div.indicators-container>div>div.outs-indicator>p:nth-child(1),
div.box-score-top-bar>div.left-box>div.indicators-container>div>div.outs-indicator>p:nth-child(2) {
    padding: 7px;
    background: var(--layout-gradient);
}

#cookie-bar, #cookie-bar-prompt {
    display: none !important;
}


div.indicators-container>div>div.pitch-indicator>div.base.is-active {
    background-color: ${state.displaySettings.activeBaseColor}
}

div.indicators-container>div>div.pitch-indicator>div.base:not(.is-active) {
    background-color: ${state.displaySettings.inactiveBaseColor}
}
`
