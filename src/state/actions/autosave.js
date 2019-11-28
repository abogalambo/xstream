import RemoteStream from '../../lib/remote_stream'

export const saveStream = (streamData) => {
  const timestamp = (new Date).getTime()
  return {
    type: 'SAVE_STREAM',
    payload: {
      data: { timestamp },
      promise: new RemoteStream(streamData).save().then(remoteStream => remoteStream.stream)
    }
  }
}

export const saveStreamLater = (delay) => ({
  type: 'SAVE_STREAM_LATER',
  payload: (new Promise(resolve => setTimeout(resolve, delay)))
})
