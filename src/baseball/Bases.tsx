import { BaseEnum } from "./model/BasesEnum";
import { State } from "./model/State";
import { ScoreboardState } from "./model/ScoreboardState.ts";

interface Props {
  scoreboard: ScoreboardState
  state: State
}

export const Bases = ({ state, scoreboard }: Props) => {
  const activeBaseStyle = {
    backgroundColor: state.displaySettings.activeBaseColor
  };

  const inactiveBaseStyle = {
    backgroundColor: state.displaySettings.inactiveBaseColor
  };

  return (
    <div className="base-container">
      <div className="base-rotate-wrapper">
        <div id="first-base" style={scoreboard.bases.includes(BaseEnum.FIRST) ? activeBaseStyle : inactiveBaseStyle} className="base"></div>
        <div id="second-base" style={scoreboard.bases.includes(BaseEnum.SECOND) ? activeBaseStyle : inactiveBaseStyle} className="base"></div>
        <div id="third-base" style={scoreboard.bases.includes(BaseEnum.THIRD) ? activeBaseStyle : inactiveBaseStyle} className="base"></div>
      </div>
    </div>
  );
};
