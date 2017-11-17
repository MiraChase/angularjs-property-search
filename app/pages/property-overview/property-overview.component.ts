import template from './property-overview.html'
import './property-overview.less'

import CommonSearchService from '../../common/services/common-search.service'
import PropertyOverviewService from './property-overview.service'

const
    bindings = {}

class controller {
    static $inject = ['$state', 'commonSearchService', 'propertyOverviewService']
    constructor (
        private $state,
        private commonSearchService: CommonSearchService,
        private propertyOverviewService: PropertyOverviewService
    ) {
        Object.assign(this, this.commonSearchService.currentProperty)
    }

    $onInit() {
        const { currentProperty } = this.commonSearchService
        if (!currentProperty) {
            this.$state.go('search')
        } else {
            const { lister_url: uniqueUrl } = currentProperty
            this.propertyOverviewService.checkPropertyInFavorites(uniqueUrl)
            this.propertyOverviewService.formRoomsInfo(currentProperty)
        }
    }
}

export default { template, controller, bindings }
