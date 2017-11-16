import template from './property-list.html'
import './property-list.less'

import { Property } from '../models/property.model'

const
    bindings = {
        propertyList: '<'
    }

class controller {
    static $inject = ['$state', 'commonSearchService']
    constructor (
        private $state: ng.ui.IStateService,
        private commonSearchService
    ) {}

    redirectToPropertyOverview(property: Property) {
        this.commonSearchService.storeCurrentProperty(property)
        this.$state.go('propertyOverview')
    }
}

export default { template, controller, bindings }