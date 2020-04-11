export const streamsSelector = (state) => state.currentStreamList.streams

export const selectedFilterSelector = (state) => {
  const { selectedFilter } = state.currentStreamList
  return selectedFilter
}

export const streamListFiltersSelector = (state) => {
  const selectedFilter = selectedFilterSelector(state)

  if(selectedFilter == 'featured') return { isFeatured: true }
  return {}
}
