import { State } from "../baseball/model/State"
import { CSS_VARIABLES } from "./variables.ts"

export const WBSC_OVERLAY_LINEUP = (state: State) => `
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
    font-family: ${state.displaySettings.font?.name};
    color: var(--font-color-dark);
    margin: 0;
    line-height: ${state.displaySettings.fontLineHeight}; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
}

p, span, td, th {
    font-size: 24px !important;
}

.game-info {
    display: none !important;
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

.box-score-panel:nth-child(2) {
    display: none !important;
}

.box-score-panel .mobile-menu {
    display: none !important;
}

.box-score-panel .react-tabs__tab-list {
    display: none !important;
}

.box-score-panel .stats {
    display: none !important;
}

.box-score-panel .game-notes {
    display: none !important;
}



td.player-index, th.player-index {
    text-align: center !important;
    font-size: 24px !important;
    width: 3ch;
}

.box-score-page .box-score .box-score-panel:not(:nth-child(2)), .schedule-and-results-page .box-score .box-score-panel:not(:nth-child(2)) {
    display: flex !important;
}

.box-score-page .box-score-table table .heading, .schedule-and-results-page .box-score-table table .heading {
    border-bottom: 0 !important;
    margin: 0 !important;
}

.box-score-table table {
    border: var(--default-border);
}

.box-score-table {
    font-family: ${state.displaySettings.font?.name};
}

.box-score-page .box-score-table table tr, .schedule-and-results-page .box-score-table table tr {
    margin-top: 2px !important;
    margin-bottom: 2px !important;
    display: revert !important;
    background: var(--layout-gradient) !important;
    border: var(--default-border);

}

.box-score-table thead > tr > th {
    color: var(--font-color-light) !important;
}

#panel\\:r0\\:0 tr.heading {
    background: var(--away-gradient) !important;
    color: var(--font-color-dark);
}

#panel\\:r0\\:1 tr.heading {
    background: var(--home-gradient) !important;
    color: var(--font-color-dark);
}

.box-score-table tbody > tr > td {
    color: var(--font-color-dark) !important;
}

.box-score-page .box-score, .schedule-and-results-page .box-score {
    height: revert !important;
}

.box-score-table thead > tr > th.player-fullname {
    margin-left: 32px;
    display: revert !important;
}

td.player-fullname, td.player-fullname-no-index, th.player-fullname, th.player-fullname-no-index {
    text-align: left !important;
    display: revert !important;
}

div > table:nth-child(5) > thead > tr > th.player-fullname::before
{
    content: 'Pitcher';

}

div > table:nth-child(1) > thead > tr > th.player-fullname::before {
    content: 'Batter';
}

.react-tabs__tab-panel {
    min-width: revert !important;
    margin-right: 30px !important;
}


#app>div {
    background-image: none !important;
    background-color: ${state.displaySettings.filterColor} !important;
}

div.event-banner {
    display: none !important;
}

#cookie-bar, #cookie-bar-prompt {
    display: none !important;
}

.box-score-table tr:has(.player-fullname-no-index) .player-index {
    opacity: 0;
}

.player-fullname,.player-fullname-no-index {
    min-width: max-content !important;
    white-space: nowrap;
}
.box-score-page .box-score-table table .player-fullname-no-index span, .schedule-and-results-page .box-score-table table .player-fullname-no-index span {
    margin-left: 0 !important;
}

.player-lastname::after {
    content: ' ';
    white-space: pre;
}

.player-lastname, .player-firstname-and-number {
    display: inline-block;
}

.box-score-page .box-score-panel .active-panel, .schedule-and-results-page .box-score-panel .active-panel {
    background-color: ${state.displaySettings.filterColor} !important;
}

.box-score-page .box-score .box-score-panel, .schedule-and-results-page .box-score .box-score-panel {
    overflow-x: revert !important;
    overflow-y: revert !important;
}

th, td {
    min-width: 4ch !important;
    padding-left: 4px !important;
    padding-right: 4px !important;
    padding-top: 4px !important; 
    padding-bottom: 4px !important;
    border-right: var(--default-border);
}

.box-score-page .box-score-table table, .schedule-and-results-page .box-score-table table {
    width: 100% !important;
}

.box-score-table table::before {

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


.box-score-table table {
    margin-top: 32px;
    margin-left: 16px;
    background: var(--background-gradient) !important;
    border: var(--default-border);
}

.box-score-table td:not(.player-index):not(.player-fullname):not(.player-fullname-no-index),
 .box-score-table th:not(.player-index):not(.player-fullname):not(.player-fullname-no-index) {
    display: ${state.displayLineupStats ? "revert" : "none"} !important;
}

#panel\\:r0\\:0 .box-score-table table::before {
    position: absolute;
    content: "";
    background-image: url("${state.awayLogo?.data}");
    background-size: contain;
    background-repeat: no-repeat;
    padding: 21px;
    padding-left: 78px;
    margin-top: -46px;
    margin-left: 0;

    color: var(--font-color-light);
    filter: var(--away-drop-shadow);

}

#panel\\:r0\\:1 .box-score-table table::before {
    position: absolute;
    content: "";
    background-image: url("${state.homeLogo?.data}");
    background-size: contain;
    background-repeat: no-repeat;
    padding: 21px;
    padding-left: 78px;
    margin-top: -46px;
    margin-left: 0;

    color: var(--font-color-light);
    filter: var(--away-drop-shadow);

}
`
