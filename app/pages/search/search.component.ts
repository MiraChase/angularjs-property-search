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
    ) {
    }

    $onInit() {
        this.searchService.searchResultsState = 'recentSearches'
        this.searchService.getRecentSearches()
        this.$window.addEventListener('keydown', this.onKeyDown.bind(this))
    }

    search(location) {
        this.searchService.searchResultsState = 'loading'
        const searchParams = this.searchService.formSearchParams(location)
        this.apiService.getJSONP(searchParams)
            .then(({ data: { response } }) => {
                if (response.total_results) {
                    this.searchService.searchResultsState = 'recentSearches'
                    this.searchService.addSearchToStorage(location, response.total_results)
                } else {
                    this.searchService.searchResultsState = 'error'
                    this.errorText = this.searchConfig.noPropertiesFoundErrorText
                }
            })
            .catch(e => {
                this.searchService.searchResultsState = 'error'
                this.errorText = this.searchConfig.networkIssuesErrorText
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
