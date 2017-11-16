import template from './property-list.html'
import './property-list.less'

import CommonSearchService from '../services/common-search.service'
import { Property } from '../models/property.model'

const
    bindings = {
        propertyList: '<'
    }

class controller {
    static $inject = ['$state', 'commonSearchService']
    constructor (
        private $state: ng.ui.IStateService,
        private commonSearchService: CommonSearchService
    ) {}

    private redirectToPropertyOverview(property: Property) {
        this.commonSearchService.storeCurrentProperty(property)
        this.$state.go('propertyOverview')
    }
}

export default { template, controller, bindings }
