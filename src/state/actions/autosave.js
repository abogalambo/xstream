export const saveStream = (streamData) => {
  const timestamp = (new Date).getTime()
  return {
    type: 'SAVE_STREAM',
    payload: {
      data: { timestamp },
      promise: fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'POST',
        body: JSON.stringify(streamData)
      }).then(response => response.json())
    }
  }
}

export const saveStreamLater = (delay) => ({
  type: 'SAVE_STREAM_LATER',
  payload: (new Promise(resolve => setTimeout(resolve, delay)))
})
