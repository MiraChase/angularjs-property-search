import template from './search.html'
import './search.less'

const
    bindings = {}

class controller {
    private searchInput: string = '';
    private errorText: string = '';

    static $inject = ['$window', 'apiService', 'searchService', 'searchConfig'];
    constructor (
        private $window,
        private apiService,
        private searchService,
        private searchConfig
    ) {}

    $onInit() {
        this.searchService.searchResultsState = 'recentSearches'
        this.searchService.getRecentSearches()
        this.$window.addEventListener('keydown', this.onKeyDown.bind(this))
    }

    setStateOnSuccessResponse(data) {
        const { response: { total_results }, request: { location } } = data
        if (total_results) {
            this.searchService.searchResultsState = 'recentSearches'
            this.searchService.addSearchToStorage(location, total_results)
        } else {
            this.searchService.searchResultsState = 'error'
            this.errorText = this.searchConfig.noPropertiesFoundErrorText
        }
    }

    setStateOnReject() {
        this.searchService.searchResultsState = 'error'
        this.errorText = this.searchConfig.networkIssuesErrorText
    }

    search(location) {
        this.searchService.searchResultsState = 'loading'
        const searchParams = this.searchService.formSearchParams(location)
        this.apiService.getJSONP(searchParams)
            .then(({ data }) => {
                this.setStateOnSuccessResponse(data)
            })
            .catch(e => {
                this.setStateOnReject()
            })
    }

    onRecentSearchClick(location) {
        this.searchInput = location
        this.search(location)
    }

    onKeyDown(e) {
        if (e.keyCode === 13 && this.searchInput.length) {
            this.search(this.searchInput)
        }
    }

    $onDestroy() {
        this.$window.removeEventListener('keydown', this.onKeyDown.bind(this))
    }
}

export default { template, controller, bindings }
