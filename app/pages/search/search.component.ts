import template from './search.html'
import './search.less'

const
    bindings = {}

class controller {
    private searchInput: string
    private errorText: string
    private onKeyDown: any

    static $inject = ['$window', '$state', 'apiService', 'searchService', 'searchConfig', 'commonSearchService']
    constructor (
        private $window: ng.IWindowService,
        private $state: ng.ui.IStateService,
        private apiService,
        private searchService,
        private searchConfig,
        private commonSearchService
    ) {
        this.onKeyDown = this._onKeyDown.bind(this)
    }

    $onInit() {
        this.searchService.searchResultsState = 'recentSearches'
        this.searchService.getRecentSearches()
        this.$window.addEventListener('keydown', this.onKeyDown)
    }

    getPropertyData(location: string) {
        this.searchService.searchResultsState = 'loading'
        const searchParams = this.apiService.formSearchParams(location)
        this.apiService.getJSONP(searchParams)
            .then(({ data }) => {
                this.setStateOnSuccessResponse(data)
            })
            .catch(e => {
                this.setStateOnReject()
            })
    }

    setStateOnSuccessResponse(data: any) {
        const { response: { total_results, listings: searchResults }, request: { location } } = data
        if (total_results) {
            this.searchService.searchResultsState = 'recentSearches'
            this.searchService.addSearchToLocalStorage(location, total_results)

            this.commonSearchService.storeSearchParams({ location, total_results, page: 1 })
            this.commonSearchService.storeSearchResults(searchResults)

            this.redirectToSearchResults({ location })
        } else {
            this.searchService.searchResultsState = 'error'
            this.errorText = this.searchConfig.noPropertiesFoundErrorText
        }
    }

    setStateOnReject() {
        this.searchService.searchResultsState = 'error'
        this.errorText = this.searchConfig.networkIssuesErrorText
    }

    onRecentSearchClick(location: string) {
        this.searchInput = location
        this.getPropertyData(location)
    }

    _onKeyDown(e: KeyboardEvent) {
        if (e.keyCode === 13 && this.searchInput.length) {
            this.getPropertyData(this.searchInput)
        }
    }

    redirectToSearchResults(params) {
        this.$state.go('searchResults', params)
    }

    $onDestroy() {
        this.$window.removeEventListener('keydown', this.onKeyDown)
    }
}

export default { template, controller, bindings }
