import {InningHalfEnum} from "./model/InningHalfEnum";
import { State } from "./model/State";
import { generateGradient } from "../service/css";
import { ScoreboardState } from "./model/ScoreboardState.ts";

interface Props {
  state: State
  scoreboard: ScoreboardState
}

const renderInningSvg = (inningHalf: InningHalfEnum, isCurrent: boolean, activeColor: string, inactiveColor: string) => {
    const upPoints = '5,0 0,7 10,7';
    const downPoints = '5,7 10,0 0,0';

    return (
        <svg viewBox="0 0 10 7" fill={isCurrent ? activeColor : inactiveColor} width={32} height={32}
        >
            <polygon points={inningHalf === InningHalfEnum.TOP ? upPoints: downPoints}>
            </polygon>
        </svg>
    )
}
export const Inning = ({state, scoreboard}: Props) => {
  const inning = scoreboard.inning;
  const inactiveColor = state.displaySettings.inactiveInningColor
  const activeColor = state.displaySettings.activeInningColor

    return (
        <div className="inning-container" style={{
          color: state.displaySettings.fontColorDark,
          background: generateGradient(state.displaySettings.layoutGradient),
        }}>
          {inning.value}
          <div className="inning-indicator-top">
                {renderInningSvg(InningHalfEnum.TOP, inning.half === InningHalfEnum.TOP, activeColor, inactiveColor)}
            </div>
            <div className="inning-indicator-bottom">
                {renderInningSvg(InningHalfEnum.BOTTOM, inning.half === InningHalfEnum.BOTTOM, activeColor, inactiveColor)}
            </div>
        </div>
    );
}
