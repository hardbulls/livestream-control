import { Gradient } from "./Gradient.ts"
import { Font } from "./Font.ts"
import { Image } from "./Image.ts"

export interface DisplaySettingsState {
    filterColor: string
    hideBases: boolean
    hideCounts: boolean
    homeGradient: Gradient
    awayGradient: Gradient
    layoutGradient: Gradient
    backgroundGradient: Gradient
    homeLogoShadow: string
    awayLogoShadow: string
    leagueLogo?: Image
    leagueLogoShadow: string
    fontColorLight: string
    fontColorDark: string
    activeBaseColor: string
    inactiveBaseColor: string
    activeInningColor: string
    inactiveInningColor: string
    font?: Font
    fontLineHeight: number
}
