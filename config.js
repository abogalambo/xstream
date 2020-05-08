const config = {
  stream: {
    maxSegments: 20,
    titleMaxLength: 40,
    audio: {
      maxDuration: 30000
    },
    image: {
      captionMaxLength: 100
    },
    text: {
      maxLength: 500
    },
    autosaveInterval: 5000,
    snackbarDuration: 3000,
    maxDuration: 420000
  }
}

export default config
