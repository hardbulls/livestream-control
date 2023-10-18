import { InningHalfEnum } from "./baseball/model/InningHalfEnum"
import { State } from "./baseball/model/State"
import { CONFIG } from "./config"

export const DEFAULT_OBS_SOCKET = "ws://127.0.0.1:4455"

export const DEFAULT_STATE: State = {
    autoConnectObs: false,
    scoreboard: {
        bases: [],
        inning: {
            value: 1,
            half: InningHalfEnum.TOP,
        },
        score: [0, 0],
        outs: 0,
        strikes: 0,
        balls: 0,
    },
    home: "HB",
    away: "HB",
    awayTeamId: "",
    homeTeamId: "24492",
    homeLogo: undefined,
    awayLogo: undefined,
    displaySettings: {
        filterColor: "#00ff00",
        hideBases: false,
        hideCounts: false,
        homeGradient: {
            angle: 180,
            startPercentage: 50,
            endPercentage: 50,
            startColor: "#dd0808",
            endColor: "#ff5c5c",
        },
        awayGradient: {
            angle: 180,
            startPercentage: 50,
            endPercentage: 50,
            startColor: "#6e6e6e",
            endColor: "#828282",
        },
        layoutGradient: {
            angle: 180,
            startPercentage: 50,
            endPercentage: 50,
            startColor: "#b0b0b0",
            endColor: "#cfcfcf",
        },
        backgroundGradient: {
            angle: 180,
            startPercentage: 50,
            endPercentage: 50,
            startColor: "#000000",
            endColor: "#474747",
        },
        homeLogoShadow: "#000000",
        awayLogoShadow: "#000000",
        fontColorLight: "#f3f3f3",
        fontColorDark: "#333333",
        font: {
            name: CONFIG.fonts[0],
        },
        activeBaseColor: "#ffd300",
        inactiveBaseColor: "#8c8b7f",
        activeInningColor: "#ffd300",
        inactiveInningColor: "#8c8b7f",
        fontLineHeight: 1.15,
    },
    obsSocket: DEFAULT_OBS_SOCKET,
    tickerUrl: "",
    displayLineupStats: false,
    refreshTime: undefined,
}
