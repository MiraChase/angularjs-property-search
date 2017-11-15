export type SearchResultStates = 'recentSearches' | 'loading' | 'locations' | 'error'

export default class searchService {
    private searchResultsState: SearchResultStates = 'recentSearches'
    private recentSearches: any[]

    static $inject = ['searchConfig']
    constructor (
        private searchConfig
    ) {}

    getRecentSearches() {
        this.recentSearches = JSON.parse(localStorage['recentSearches'] || '[]')
    }

    addSearchToLocalStorage(location: string, total_results: number) {
        this.getRecentSearches()
        if (this.recentSearches.length >= this.searchConfig.recentSearchesLength) {
            this.recentSearches.length = this.searchConfig.recentSearchesLength - 1
        }
        this.recentSearches.unshift({
            location,
            total_results
        })
        localStorage['recentSearches'] = JSON.stringify(this.recentSearches)
    }
}
