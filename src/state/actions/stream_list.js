import RemoteStreamList from '../../lib/remote_stream_list'

export const fetchStreamList = () => ({
  type: 'FETCH_STREAM_LIST',
  payload: new RemoteStreamList().fetch().then(remoteStreamList => ({
    streams: remoteStreamList.streamList
  }))
})

export const exitStreamList = () => ({
  type: 'EXIT_STREAM_LIST'
})
