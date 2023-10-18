import { State } from "./model/State";
import { generateGradient } from "../service/css";
import { ScoreboardState } from "./model/ScoreboardState.ts";

interface Props {
  scoreboard: ScoreboardState
  state: State
}
export const Counts = ({scoreboard, state}: Props) => {
  const {strikes, balls, outs} = scoreboard;
  const style = {
    color: state.displaySettings.fontColorDark,
    background: generateGradient(state.displaySettings.layoutGradient)
  }
    return (
        <div className="counts-container">
            <div className="counts-top" style={style}>
              <span>{balls}</span>
              <span className="count-separator">-</span>
              <span>{strikes}</span>
            </div>
            <div className="counts-bottom" style={style}>
              <span className="outs-count">{outs}</span>
              <span className="outs-text">out</span>
            </div>
        </div>
    )
}
