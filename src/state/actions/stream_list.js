import RemoteStreamList from '../../lib/remote_stream_list'

export const fetchStreamList = (filters) => ({
  type: 'FETCH_STREAM_LIST',
  payload: new RemoteStreamList(filters).fetch().then(remoteStreamList => ({
    streams: remoteStreamList.streamList
  }))
})

export const exitStreamList = () => ({
  type: 'EXIT_STREAM_LIST'
})

export const setSelectedFilter = (selectedFilter) => ({
  type: 'SET_SELECTED_FILTER',
  payload: { selectedFilter }
})
