import template from './search-results.html'
import './search-results.less'

import CommonSearchService from '../../common/services/common-search.service'
import SearchResultsService from './search-results.service'

const
    bindings = {}

class controller {
    static $inject = ['$stateParams', 'commonSearchService', 'searchResultsService']
    constructor (
        private $stateParams: ng.ui.IStateParamsService,
        private commonSearchService: CommonSearchService,
        private searchResultsService: SearchResultsService
    ) {}

    $onInit() {
        this.searchResultsService.location = this.$stateParams.location
        this.searchResultsService.initSearchResultsComponent()
    }
}

export default { template, controller, bindings }
