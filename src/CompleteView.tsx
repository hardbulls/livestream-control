import { useEffect, useState } from "react";
import { Control } from "./Control";
import { State } from "./baseball/model/State";
import { DisplayControl } from "./DisplayControl";
import { LiveTickerCss } from "./LiveTickerCss";
import { ExportSection } from "./ExportSection";
import { enhanceState, saveState } from "./state";
import { refreshBrowsers } from "./service/obs/obs-api";
import { ScoreboardState } from "./baseball/model/ScoreboardState.ts";
import { listenToScoreboard, updateScoreboard } from "./database/database";
import { TeamSettings } from "./TeamSettings";
import { HomeAwayEnum } from "./baseball/model/HomeAwayEnum";
import { LiveTickerControl } from "./LiveTickerControl";
import { OBSControl } from "./OBSControl";
import { Info } from "./Info";
import { StickyScoreboardContainer } from "./StickyScoreboardContainer.tsx";
import { TabSection } from "./component/tabs/TabSection.tsx";


interface Props {
  state: State;
  setState: (state: State) => void;
}

function CompleteView({ state, setState }: Props) {
  const [scoreboard, setScoreboard] = useState<ScoreboardState>(state.scoreboard);

  useEffect(() => {
    saveState({
      ...state,
      scoreboard
    });
  }, [state, scoreboard]);

  useEffect(() => {
    if (state.refreshTime) {
      const interval = setInterval(async () => {
        if (state.refreshTime) {
          const [hour, minute] = state.refreshTime.split(":");

          const now = new Date();

          if (now.getHours() === Number.parseInt(hour) && now.getMinutes() === Number.parseInt(minute)) {
            await refreshBrowsers();

            setState({
              ...state,
              refreshTime: undefined
            });
          }
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [state, setState]);

  useEffect(() => {
    if (state.userId) {
      listenToScoreboard(state.userId, (scoreboard: ScoreboardState) => {
        setScoreboard(scoreboard);
      });
    }
  }, [state]);

  const updateScoreValue = async <T extends keyof ScoreboardState>(key: T, value: ScoreboardState[T]) => {
    const updatedScoreboard = {
      ...scoreboard,
      [key]: value
    };
    setScoreboard(updatedScoreboard);

    if (state.userId && state.login === true) {
      await updateScoreboard(state.userId, updatedScoreboard);
    }
  };

  const resetCounts = async () => {
    const updatedScoreboard = {
      ...scoreboard,
      balls: 0,
      strikes: 0
    }
    console.log(updatedScoreboard)
    setScoreboard(updatedScoreboard)

    if (state.userId && state.login === true) {
      await updateScoreboard(state.userId, updatedScoreboard)
    }
  }

  return (
    <div >
      <StickyScoreboardContainer state={state} scoreboard={scoreboard} />
      <TabSection
        items={[
          {
            label: "Control",
            component: (
              <Control
                scoreboard={scoreboard}
                handleBallClick={() => {
                  if (scoreboard.balls === 3) {
                    updateScoreValue("balls", 0);

                    return;
                  }

                  updateScoreValue("balls", scoreboard.balls + 1);
                }
                }
                handleOutClick={() => {
                  if (scoreboard.outs === 2) {
                    updateScoreValue("outs", 0);

                    return;
                  }

                  updateScoreValue("outs", scoreboard.outs + 1);
                }
                }
                handleStrikeClick={() => {
                  if (scoreboard.strikes === 2) {
                    updateScoreValue("strikes", 0);

                    return;
                  }

                  updateScoreValue("strikes", scoreboard.strikes + 1);
                }
                }
                handleClearBases={() => {
                  updateScoreValue("bases", []);
                }
                }
                handleResetCountClick={() => {
                  resetCounts()
                }
                }
                handleInningChange={(half, value) => {
                  updateScoreValue("inning", {
                    half, value
                  });
                }}
                handleScoreChange={(team, value) => {
                  if (team === HomeAwayEnum.HOME) {
                    updateScoreValue("score", [value, scoreboard.score[1]]);

                    return;
                  }

                  updateScoreValue("score", [scoreboard.score[0], value]);
                }}
                handleBaseChange={(base, value) => {
                  if (value) {
                    updateScoreValue("bases", [...scoreboard.bases, base]);

                    return;
                  }

                  updateScoreValue("bases", scoreboard.bases.filter((v) => v !== base));
                }}
              />

            )
          },
          {
            label: "Display",
            component: (
              <DisplayControl displaySettings={state.displaySettings} handleChange={(key, value) => setState({ ...state, displaySettings: { ...state.displaySettings, [key]: value }})} />
            )
          },
          {
            label: "Teams",
            component: (
              <TeamSettings state={state}
                            handleChange={(key, value) => setState({ ...state, [key]: value })}
              />
            )
          },
          {
            label: 'Live Ticker',
            component: (
              <>
                <LiveTickerControl state={state} handleChange={(key, value) => setState({ ...state, [key]: value })} />
                <LiveTickerCss state={state} />
              </>
            )
          },
          {
            label: 'OBS Studio',
            component: (
              <>
                <OBSControl state={state} handleChange={(key, value) => setState({ ...state, [key]: value })} />
                <Info />
              </>
            )
          },
          {
            label: 'Presets',
            component: (
              <ExportSection
                state={state}
                handleLoadPreset={async (presetState: State) => {
                  setState(await enhanceState({
                    ...state,
                    ...presetState
                  }));
                }}
              />
            )
          }
        ]}
      />
    </div>
  );
}

export default CompleteView;
