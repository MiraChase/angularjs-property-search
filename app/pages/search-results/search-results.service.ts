import { StoredSearchParams } from '../../common/interfaces/search-params.interface'

export default class searchResultsService {
    public loading: boolean = false
    public location: string = ''

    static $inject = ['$state', 'commonSearchService', 'apiService']
    constructor (
        private $state: ng.ui.IStateService,
        private commonSearchService,
        private apiService
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
        const { total_results, page  } = this.commonSearchService.searchParams
        const resultsPerPage = this.commonSearchService.getNumResultsPerPage()
        return this.commonSearchService.searchResults.length &&
            resultsPerPage * page < total_results
    }

    public loadNextPage() {
        const { page } = this.commonSearchService.searchParams
        const searchParams = this.apiService.formSearchParams(this.location, page + 1)
        this.getPropertyData(searchParams)
    }

    private getPropertyData(searchParams: StoredSearchParams) {
        this.loading = true
        this.apiService.getJSONP(searchParams)
            .then(({ data: { response: { page, total_results, listings: searchResults } } }) => {
                this.loading = false
                if (total_results) {
                    this.commonSearchService.storeSearchParams({ location: this.location, total_results, page })
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
