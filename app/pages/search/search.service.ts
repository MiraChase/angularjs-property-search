import { ApiResponse } from '../../common/interfaces/api-response.interface'

import ApiService from '../../common/services/api.service'
import CommonSearchService from '../../common/services/common-search.service'

export type SearchResultStates = 'recentSearches' | 'loading' | 'locations' | 'error'

export default class searchService {
    static $inject = ['$state', 'searchConfig', 'apiService', 'commonSearchService']

    public searchResultsState: SearchResultStates = 'recentSearches'
    public currentErrorText: string
    public recentSearches: any[]

    constructor (
        private $state: ng.ui.IStateService,
        private searchConfig,
        private apiService: ApiService,
        private commonSearchService: CommonSearchService
    ) {}

    public getRecentSearches() {
        this.recentSearches = JSON.parse(localStorage['recentSearches'] || '[]')
    }

    public getPropertyData(location: string) {
        this.searchResultsState = 'loading'
        const searchParams = this.apiService.formSearchParams(location)
        this.apiService.getJSONP(searchParams)
            .then(({ data }: ng.IHttpResponse<ApiResponse>) => {
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

            this.commonSearchService.storeSearchResultsParams({ location, total_results, page: 1 })
            this.commonSearchService.storeSearchResults(searchResults)

            this.redirectToSearchResults({ location })
        } else {
            this.searchResultsState = 'error'
            this.currentErrorText = this.searchConfig.NO_PROPERTIES_FOUND_ERROR_TEXT
        }
    }

    private setStateOnReject() {
        this.searchResultsState = 'error'
        this.currentErrorText = this.searchConfig.NETWORK_ISSUES_ERROR_TEXT
    }

    private addSearchToLocalStorage(location: string, total_results: number) {
        this.getRecentSearches()
        if (this.recentSearches.length >= this.searchConfig.RECENT_SEARCHES_LENGTH) {
            this.recentSearches.length = this.searchConfig.RECENT_SEARCHES_LENGTH - 1
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
