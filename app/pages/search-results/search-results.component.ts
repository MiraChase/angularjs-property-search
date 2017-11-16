import template from './search-results.html'
import './search-results.less'

const
    bindings = {}

class controller {
    static $inject = ['$stateParams', 'commonSearchService', 'searchResultsService']
    constructor (
        private $stateParams: ng.ui.IStateParamsService,
        private commonSearchService,
        private searchResultsService
    ) {}

    $onInit() {
        this.searchResultsService.location = this.$stateParams.location
        this.searchResultsService.initSearchResultsComponent()
    }
}

export default { template, controller, bindings }