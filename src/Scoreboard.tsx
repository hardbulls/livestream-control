import { ScoreboardState } from "./baseball/model/ScoreboardState.ts";
import { generateGradient } from "./service/css.ts";
import { Score } from "./baseball/Score.tsx";
import { Inning } from "./baseball/Inning.tsx";
import { Bases } from "./baseball/Bases.tsx";
import { Counts } from "./baseball/Counts.tsx";
import { State } from "./baseball/model/State.ts";

interface Props {
  state: State;
  scoreboard: ScoreboardState;
}

export const Scoreboard = ({ state, scoreboard }: Props) => {

  return (
    <div style={{
      fontFamily: `${state.displaySettings.font?.name}, sans-serif`,
      fontSize: '32px',
      display: 'flex',
      lineHeight: state.displaySettings.fontLineHeight
    }}>
      <div style={{
        background: generateGradient(state.displaySettings.backgroundGradient),
        border: '2px solid #666',
        display: 'flex',
      }}>
        <Score scoreboard={scoreboard} state={state}></Score>
        <Inning scoreboard={scoreboard} state={state} />
        {!state.displaySettings.hideBases && <Bases state={state} scoreboard={scoreboard}></Bases>}
        {!state.displaySettings.hideCounts && <Counts state={state} scoreboard={scoreboard} />}
      </div>
    </div>
  );
};
