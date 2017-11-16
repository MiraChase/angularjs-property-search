import template from './property-overview.html'
import './property-overview.less'

const
    bindings = {}

class controller {
    static $inject = ['$state', 'commonSearchService', 'propertyOverviewService']
    constructor (
        private $state,
        private commonSearchService,
        private propertyOverviewService
    ) {
        Object.assign(this, this.commonSearchService.currentProperty)
    }

    $onInit() {
        const { currentProperty } = this.commonSearchService
        if (!currentProperty) {
            this.$state.go('search')
        } else {
            this.propertyOverviewService.checkPropertyInFavorites(currentProperty)
            this.propertyOverviewService.formRoomsInfo(currentProperty)
        }
    }
}

export default { template, controller, bindings }