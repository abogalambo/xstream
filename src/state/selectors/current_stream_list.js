import {
  currentUserIdSelector
} from './current_user'

export const streamsSelector = (state) => state.currentStreamList.streams

export const selectedFilterSelector = (state) => {
  const { selectedFilter } = state.currentStreamList
  return selectedFilter
}

export const streamListFiltersSelector = (state) => {
  const selectedFilter = selectedFilterSelector(state)

  switch (selectedFilter) {
    case 'featured':
      return {
        isFeatured: true
      }

    case 'recent':
      return {
        isPublished: true,
        orderBy: 'publishedAt'
      }

    case 'published':
      return {
        authorId: currentUserIdSelector(state),
        isPublished: true,
        orderBy: 'publishedAt'
      }

    case 'drafts':
      return {
        authorId: currentUserIdSelector(state),
        isDraft: true,
        orderBy: 'createdAt'
      }

    default:
      return {}
  }
}
