import template from './property-list.html'
import './property-list.less'

const
    bindings = {
        propertyList: '<'
    }

class controller {
    static $inject = ['$state'];
    constructor (
        private $state: ng.ui.IStateService
    ) {}

    redirectToPropertyOverview(url: string) {
        this.$state.go('propertyDetails')
    }
}

export default { template, controller, bindings }