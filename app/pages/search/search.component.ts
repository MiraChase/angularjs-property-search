import template from './search.html'
import './search.less'

const
    bindings = {}

class controller {
    private searchInput: string
    private onKeyDown: any

    static $inject = ['$window', 'searchService']
    constructor (
        private $window: ng.IWindowService,
        private searchService
    ) {
        this.onKeyDown = this.handleKeyDown.bind(this)
    }

    $onInit() {
        this.searchService.searchResultsState = 'recentSearches'
        this.searchService.getRecentSearches()
        this.$window.addEventListener('keydown', this.onKeyDown)
    }

    onRecentSearchClick(location: string) {
        this.searchInput = location
        this.searchService.getPropertyData(location)
    }

    handleKeyDown(e: KeyboardEvent) {
        if (e.keyCode === 13 && this.searchInput.length) {
            this.searchService.getPropertyData(this.searchInput)
        }
    }

    $onDestroy() {
        this.$window.removeEventListener('keydown', this.onKeyDown)
    }
}

export default { template, controller, bindings }
