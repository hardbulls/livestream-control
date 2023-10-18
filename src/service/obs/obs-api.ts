import { getObs } from "./obs-client"
import { RequestBatchRequest, ResponseMessage } from "obs-websocket-js"

export const getSceneItemIds = async (): Promise<number[]> => {
    const response = await getObs()?.callBatch([
        {
            requestType: "GetSceneItemId",
            requestData: {
                sceneName: "hb_overlay",
                sourceName: "hb_players",
            },
        },
        {
            requestType: "GetSceneItemId",
            requestData: {
                sceneName: "hb_overlay",
                sourceName: "hb_score",
            },
        },
    ])

    return response
        ? response.map((response: ResponseMessage) => {
              const data: unknown = response.responseData as unknown as { sceneItemId: number }
              const parsedData = data as { sceneItemId: number }

              return parsedData.sceneItemId
          })
        : []
}

export const enableSceneItems = async () => {
    const requestData = (await getSceneItemIds()).map((sceneItemId) => {
        return {
            requestType: "SetSceneItemEnabled",
            requestData: {
                sceneItemEnabled: true,
                sceneName: "hb_overlay",
                sceneItemId: sceneItemId,
            },
        }
    }) as RequestBatchRequest[]

    setTimeout(async () => {
        await getObs()?.callBatch(requestData)
    }, 2000)
}

const disableSceneItems = async () => {
    const requestData = (await getSceneItemIds()).map((sceneItemId) => {
        return {
            requestType: "SetSceneItemEnabled",
            requestData: {
                sceneItemEnabled: false,
                sceneName: "hb_overlay",
                sceneItemId: sceneItemId,
            },
        }
    }) as RequestBatchRequest[]

    await getObs()?.callBatch(requestData)
}

export const refreshBrowsers = async () => {
    await disableSceneItems()
    await getObs()?.callBatch([
        {
            requestType: "PressInputPropertiesButton",
            requestData: {
                inputName: "hb_score",
                propertyName: "refreshnocache",
            },
        },
        {
            requestType: "PressInputPropertiesButton",
            requestData: {
                inputName: "hb_players",
                propertyName: "refreshnocache",
            },
        },
        {
            requestType: "PressInputPropertiesButton",
            requestData: {
                inputName: "hb_sponsors",
                propertyName: "refreshnocache",
            },
        },
    ])

    await enableSceneItems()
}

export const publishCss = async (scoreCss: string, playersCss: string, sponsorsCss: string, lineupCss: string) => {
    await disableSceneItems()
    await getObs()?.callBatch([
        {
            requestType: "SetInputSettings",
            requestData: {
                inputName: "hb_score",
                inputSettings: {
                    css: scoreCss,
                },
            },
        },
        {
            requestType: "SetInputSettings",
            requestData: {
                inputName: "hb_players",
                inputSettings: {
                    css: playersCss,
                },
            },
        },
        {
            requestType: "SetInputSettings",
            requestData: {
                inputName: "hb_sponsors",
                inputSettings: {
                    css: sponsorsCss,
                    height: 800,
                },
            },
        },
        {
            requestType: "SetInputSettings",
            requestData: {
                inputName: "hb_lineup",
                inputSettings: {
                    css: lineupCss,
                    width: 2000,
                },
            },
        },
    ])
    await enableSceneItems()
}

export const publishTickerUrl = async (tickerUrl: string) => {
    await disableSceneItems()
    await getObs()?.callBatch([
        {
            requestType: "SetInputSettings",
            requestData: {
                inputName: "hb_score",
                inputSettings: {
                    url: tickerUrl,
                },
            },
        },
        {
            requestType: "SetInputSettings",
            requestData: {
                inputName: "hb_players",
                inputSettings: {
                    url: tickerUrl,
                },
            },
        },
        {
            requestType: "SetInputSettings",
            requestData: {
                inputName: "hb_lineup",
                inputSettings: {
                    url: tickerUrl,
                },
            },
        },
    ])
    await enableSceneItems()
}
