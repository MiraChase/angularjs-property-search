import { ApiResponse } from '../../common/interfaces/api-response.interface'

import ApiService from '../../common/services/api.service'
import CommonSearchService from '../../common/services/common-search.service'
import { SEARCH_CONFIG } from '../../common/configs/search.config'

export type SearchResultStates = 'recentSearches' | 'loading' | 'locations' | 'error'

export default class searchService {
    static $inject = ['$state', 'apiService', 'commonSearchService']

    public searchResultsState: SearchResultStates = 'recentSearches'
    public currentErrorText: string
    public recentSearches: any[]

    constructor (
        private $state: ng.ui.IStateService,
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
            this.currentErrorText = SEARCH_CONFIG.NO_PROPERTIES_FOUND_ERROR_TEXT
        }
    }

    private setStateOnReject() {
        this.searchResultsState = 'error'
        this.currentErrorText = SEARCH_CONFIG.NETWORK_ISSUES_ERROR_TEXT
    }

    private addSearchToLocalStorage(location: string, total_results: number) {
        this.getRecentSearches()
        if (this.recentSearches.length >= SEARCH_CONFIG.RECENT_SEARCHES_LENGTH) {
            this.recentSearches.length = SEARCH_CONFIG.RECENT_SEARCHES_LENGTH - 1
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
