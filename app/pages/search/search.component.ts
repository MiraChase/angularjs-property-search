import template from './search.html'
import './search.less'

import SearchService from './search.service'

const
    bindings = {}

class controller {
    static $inject = ['$window', 'searchService']

    private searchInput: string
    private onKeyDown: any

    constructor (
        private $window: ng.IWindowService,
        private searchService: SearchService
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
