import OBSWebSocket from "obs-websocket-js"

let obsClient: OBSWebSocket | undefined = undefined

export const getObs = () => {
    return obsClient
}

export const setObs = async (obsSocket: string) => {
    if (!obsClient) {
        obsClient = new OBSWebSocket()
    }

    try {
        await obsClient.disconnect()

        await obsClient.connect(obsSocket)

        console.info("OBS Connected")
        return true
    } catch (err) {
        obsClient = undefined

        console.error(err)

        return false
    }
}
