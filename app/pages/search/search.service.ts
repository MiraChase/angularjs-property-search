import { ApiResponse } from '../../common/interfaces/api-response.interface'

export type SearchResultStates = 'recentSearches' | 'loading' | 'locations' | 'error'

export default class searchService {
    public searchResultsState: SearchResultStates = 'recentSearches'
    public currentErrorText: string
    public recentSearches: any[]

    static $inject = ['$state', 'searchConfig', 'apiService', 'commonSearchService']
    constructor (
        private $state: ng.ui.IStateService,
        private searchConfig,
        private apiService,
        private commonSearchService
    ) {}

    public getRecentSearches() {
        this.recentSearches = JSON.parse(localStorage['recentSearches'] || '[]')
    }

    public getPropertyData(location: string) {
        this.searchResultsState = 'loading'
        const searchParams = this.apiService.formSearchParams(location)
        this.apiService.getJSONP(searchParams)
            .then(({ data }) => {
                this.setStateOnSuccessResponse(data)
            })
            .catch(e => {
                this.setStateOnReject()
            })
    }

    private setStateOnSuccessResponse(data: ApiResponse) {
        const { response: { total_results, listings: searchResults }, request: { location } } = data
        if (total_results) {
            this.searchResultsState = 'recentSearches'
            this.addSearchToLocalStorage(location, total_results)

            this.commonSearchService.storeSearchParams({ location, total_results, page: 1 })
            this.commonSearchService.storeSearchResults(searchResults)

            this.redirectToSearchResults({ location })
        } else {
            this.searchResultsState = 'error'
            this.currentErrorText = this.searchConfig.noPropertiesFoundErrorText
        }
    }

    private setStateOnReject() {
        this.searchResultsState = 'error'
        this.currentErrorText = this.searchConfig.networkIssuesErrorText
    }

    private addSearchToLocalStorage(location: string, total_results: number) {
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

    private redirectToSearchResults(params) {
        this.$state.go('searchResults', params)
    }
}
