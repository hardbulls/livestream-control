import { State } from "../baseball/model/State"
import { CSS_VARIABLES } from "./variables.ts"

export const WBSC_OVERLAY_PLAYER = (state: State) => `
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
    background-color: ${state.displaySettings.filterColor} !important;
    font-family: ${state.displaySettings.font?.name}, sans-serif;
    color: var(--font-color-dark);
    margin: 0;
}

.single-player {
    padding: 0 !important;
    width: 100%;
}

.box-score-top-bar {
    height: 0;
}

.box-score-top-bar > div.left-box {
    display: none !important;
}

.box-score-top-bar > div.center-box {
    display: none !important;
}

.box-score-top-bar > div.right-box {
    display: none !important;
}

.game-info-plays {
    display: none !important;
}

.up-next-container {
    display: none !important;
}

.box-score-panel:nth-child(2) {
    max-width: 360px !important;
    width: 360px !important;
}

.box-score-panel:nth-child(3) {
    display: none !important;
}

.box-score-panel:nth-child(4) {
    display: none !important;
}

.active-panel {
    background-color: revert !important;
    height: min-content !important;
}

.actual-panel {
    height: min-content !important;
}

.game-info {
    height: revert !important;
    overflow: hidden !important;
}



#app>div {
    background-image: none !important;
    background-color: ${state.displaySettings.filterColor} !important;
}

.live-data {
    background-color: ${state.displaySettings.filterColor} !important;
}

.innings-table {
    display: none !important;
}

div.player-image.player-picture {
    display: none !important;
}


.player-stats p {
    display: flex;
    justify-content: space-between;
    align-items: center;
 }

 .player-stats > p > strong {
    font-family: ${state.displaySettings.font?.name}, sans-serif; 
    font-size: 24px;
    max-width: 300px;
 } 

div.actual-players {
    margin-top: 20px !important;
    padding: 0 !important;
    border: var(--default-border);
    background: var(--background-gradient);
}

.actual-players p {
    margin: 0;
}

div.single-player:nth-child(1) div.player-stats {
    border-bottom: 0;
    margin-bottom: 16px;
}

.player-stats {

    width: 100%;
    background: var(--background-gradient);
    font-size: 28px;  
}

.player-stats > p:nth-child(2) {
    background: var(--layout-gradient);
    font-size: 22px;
}

.player-avg {
    background: var(--layout-gradient);
    color: var(--font-color-dark) !important;
    font-size: 20px !important;
}

.actual-players .player-stats > a {
    display: none !important;
}

div.actual-players div.player-stats > a {
    display: none !important;
}

div.actual-players div.player-stats > p.role-and-stats {
    color: var(--font-color-light) !important;
    font-size: 22px !important;
    font-weight: bold !important;
    text-shadow: 1px 1px black;
    position: relative;
}

div.player-stats:has(> a[href*="/teams/${state.homeTeamId}"]) > .role-and-stats::after {
    content: "";
    background-image: url("${state.homeLogo?.data}");
    background-size: contain;  
    background-repeat: no-repeat;
    position: absolute;
    margin-top: -2px;
    padding: 20px;
    right: 8px;
    filter: var(--home-drop-shadow);
}

div.player-stats:has(> a[href*="/teams/${state.awayTeamId}"]) > .role-and-stats::after {
    content: "";
    background-image: url("${state.awayLogo?.data}");
    background-size: contain;  
    background-repeat: no-repeat;
    position: absolute;
    margin-top: -2px;
    padding: 20px;
    right: 8px;
    filter: var(--away-drop-shadow);
}

div.actual-players div.player-stats > p {
    width: 100%;
    padding-left: 4px;
    padding-right: 4px;
}

div.event-banner {
    display: none !important;
}

#cookie-bar, #cookie-bar-prompt {
    display: none !important;
}

div.player-stats:has(> a[href*="/teams/${state.homeTeamId}"]) > .role-and-stats {
    background: var(--home-gradient);
}

div.player-stats:has(> a[href*="/teams/${state.awayTeamId}"]) > .role-and-stats {
    background: var(--away-gradient);
}
`
