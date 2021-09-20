export const initialState = {
	newsType: 'all',
	search: 'all',
	newsCategory: 'top-headlines'
}

const reducer = (state, action) => {
	switch(action.type) {
		case 'SET_NEWS_TYPE':
			return {
				...state,
				newsType: action.newsType
			}
		case 'SET_SEARCH':
			return {
				...state,
				search: action.search
			}
		case 'SET_NEWS_CATEGORY':
			return {
				...state,
				newsCategory: action.newsCategory
			}
		default:
			return state;
	}
}

export default reducer;