import template from './property-overview.html'
import './property-overview.less'

const
    bindings = {}

class controller {
    private roomsInfo: string;

    static $inject = ['$state', 'commonSearchService'];
    constructor (
        private $state,
        private commonSearchService
    ) {
        Object.assign(this, this.commonSearchService.currentProperty)
    }

    $onInit() {
        if (!this.commonSearchService.currentProperty) {
            this.$state.go('search')
        } else {
            this.roomsInfo = this.formRoomsInfo(this.commonSearchService.currentProperty)
        }
    }

    formRoomsInfo({ bedroom_number, bathroom_number }) {
        const bedrooms = typeof bedroom_number === 'number' ? bedroom_number : '-'
        const bathrooms = typeof bathroom_number === 'number' ? bathroom_number : '-'
        return `${bedrooms} bedroom(s), ${bathrooms} bathroom(s)`
    }
}

export default { template, controller, bindings }