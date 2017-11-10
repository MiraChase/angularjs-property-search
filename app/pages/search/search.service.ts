export type SearchResultStates = 'recentSearches' | 'loading' | 'locations' | 'error'

export default class searchService {
    private searchResultsState: SearchResultStates = 'recentSearches';
    private recentSearches: any[];

    static $inject = ['searchConfig'];
    constructor (
        private searchConfig
    ) {}

    formSearchParams(location) {
        return {
            callback: 'JSON_CALLBACK',
            encoding: 'json',
            action: 'search_listings',
            country: 'uk',
            place_name: location,
            num_res: this.searchConfig.searchResultsLength,
        }
    }

    getRecentSearches() {
        this.recentSearches = JSON.parse(localStorage['recentSearches'] || '[]');
    }

    addSearchToStorage(location, total_results) {
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
