import { ApiSearchParams } from '../../common/interfaces/search-params.interface'
import { ApiResponse } from '../../common/interfaces/api-response.interface'

import ApiService from '../../common/services/api.service'
import CommonSearchService from '../../common/services/common-search.service'

export default class searchResultsService {
    static $inject = ['$state', 'commonSearchService', 'apiService']

    public loading: boolean = false
    public location: string = ''

    constructor (
        private $state: ng.ui.IStateService,
        private commonSearchService: CommonSearchService,
        private apiService: ApiService
    ) {}

    public initSearchResultsComponent() {
        if (!this.commonSearchService.searchResults.length && this.location) {
            const searchParams = this.apiService.formSearchParams(this.location)
            this.getPropertyData(searchParams)
        } else if (!this.commonSearchService.searchResults.length && !this.location) {
            this.redirectToSearch()
        }
    }

    public checkLoadingButtonAvailable(): boolean {
        const { total_results, page } = this.commonSearchService.searchResultsParams
        const resultsPerPage = this.commonSearchService.getNumResultsPerPage()
        return this.commonSearchService.searchResults.length &&
            resultsPerPage * page < total_results
    }

    public loadNextPage() {
        const { page } = this.commonSearchService.searchResultsParams
        const searchParams = this.apiService.formSearchParams(this.location, page + 1)
        this.getPropertyData(searchParams)
    }

    private getPropertyData(searchParams: ApiSearchParams) {
        this.loading = true
        this.apiService.getJSONP(searchParams)
            .then(({ data: { response: { page, total_results, listings: searchResults } } }:
                       ng.IHttpResponse<ApiResponse>) => {
                this.loading = false
                if (total_results) {
                    this.commonSearchService.storeSearchResultsParams({ location: this.location, total_results, page })
                    this.commonSearchService.appendSearchResults(searchResults)
                } else {
                    this.redirectToSearch()
                }
            })
            .catch(e => {
                this.loading = false
                this.redirectToSearch()
            })
    }

    private redirectToSearch() {
        this.$state.go('search')
    }
}
