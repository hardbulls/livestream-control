import { Image } from "./Image"
import { ScoreboardState } from "./ScoreboardState.ts"
import { AppMode } from "./AppMode.ts"
import { DisplaySettingsState } from "./DisplaySettingsState.ts"

export interface State {
    appMode?: AppMode
    login?: boolean
    userId?: string
    autoConnectObs: boolean
    obsSocket: string
    scoreboard: ScoreboardState
    displaySettings: DisplaySettingsState
    tickerUrl: string
    home: string
    away: string
    homeTeamId: string
    awayTeamId: string
    homeLogo?: Image
    awayLogo?: Image
    displayLineupStats: boolean
    refreshTime?: string
}
