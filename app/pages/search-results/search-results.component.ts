import template from './search-results.html'
import './search-results.less'

const
    bindings = {}

class controller {
    private loading: boolean = false
    private location: string = ''

    static $inject = ['$stateParams', '$state', 'commonSearchService', 'apiService'];
    constructor (
        private $stateParams: ng.ui.IStateParamsService,
        private $state: ng.ui.IStateService,
        private commonSearchService,
        private apiService
    ) {
        this.location = this.$stateParams.location
    }

    $onInit() {
        if (!this.commonSearchService.searchResults.length && this.location) {
            const searchParams = this.apiService.formSearchParams(this.location)
            this.getPropertyData(searchParams)
        } else if (!this.commonSearchService.searchResults.length && !this.location) {
            this.redirectToSearch()
        }
    }

    getPropertyData(searchParams: object) {
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

    redirectToSearch() {
        this.$state.go('search')
    }

    checkLoadingButtonAvailable() {
        const { total_results, page  } = this.commonSearchService.searchParams
        const resultsPerPage = this.commonSearchService.getNumResultsPerPage()
        return this.commonSearchService.searchResults.length &&
            resultsPerPage * page < total_results
    }

    loadNextPage() {
        const { page } = this.commonSearchService.searchParams
        const searchParams = this.apiService.formSearchParams(this.location, page + 1)
        this.getPropertyData(searchParams)
    }
}

export default { template, controller, bindings }