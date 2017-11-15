import template from './property-list.html'
import './property-list.less'

const
    bindings = {
        propertyList: '<'
    }

class controller {
    static $inject = ['$state', 'commonSearchService'];
    constructor (
        private $state: ng.ui.IStateService,
        private commonSearchService
    ) {}

    redirectToPropertyOverview(property: object) {
        this.commonSearchService.storeCurrentProperty(property)
        this.$state.go('propertyOverview')
    }
}

export default { template, controller, bindings }