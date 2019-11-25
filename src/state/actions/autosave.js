export const saveStream = (streamData) => {
  const timestamp = (new Date).getTime()
  return {
    type: 'SAVE_STREAM',
    payload: {
      data: { timestamp },
      promise: fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
    }
  }
}
