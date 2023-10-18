import { State } from "../baseball/model/State"
import { CSS_VARIABLES } from "./variables.ts"

export const OVERLAY_SPONSORS = (state: State) => `
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
    color: var(--font-color-dark);
    margin: 0;
}


.owl-lazy {
    transition: none !important;
}

.cd-section-content >div.cd-row:nth-child(1) .cd-carousel-container .owl-stage-outer {
	border: var(--default-border) !important;
    background: var(--background-gradient) !important;
    border: 2px solid black;
    max-width: 300px;

}

.cd-section-content >div.cd-row:nth-child(1) .cd-carousel-container .owl-stage-outer .cd-sponsors-item {
    padding-right: 10px !important;
    margin-bottom: 0px !important;
    max-width: 300px;
}


.cd-section-content >div.cd-row:nth-child(1) .cd-carousel-container .owl-stage-outer::before {
    font-family: ${state.displaySettings.font?.name}, sans-serif;
    font-size: 20px;
    content: 'Bulls are sponsored by';
    color: var(--font-color-dark);
    background: var(--layout-gradient);
    display: block;
    padding-left: 10px;
    padding-right: 10px;
}


.cd-section-content >div.cd-row:nth-child(2) .cd-carousel-container .cd-tile-container{
	padding: 10px;
	margin-bottom: -10px;
}

.cd-section-content >div.cd-row:nth-child(2) .cd-carousel-container .owl-stage-outer {
	border: var(--default-border) !important;
    background: var(--background-gradient) !important;
}

.cd-section-content >div.cd-row:nth-child(2) .cd-carousel-container .owl-stage-outer::before {
    font-family: ${state.displaySettings.font?.name}, sans-serif;
    font-size: 20px;
    content: 'The Hard Bulls are sponsored by';
    color: var(--font-color-dark);
    background: var(--layout-gradient);
    display: block;
    padding-left: 10px;
    padding-right: 10px;
}


.cc-window, .cc-bottom {
	display: none !important;
}
`
