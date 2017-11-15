import template from './property-overview.html'
import './property-overview.less'

const
    bindings = {}

class controller {
    private roomsInfo: string
    private isPropertyInFavorites: boolean

    static $inject = ['$state', 'commonSearchService', 'favoritesCommonService']
    constructor (
        private $state,
        private commonSearchService,
        private favoritesCommonService
    ) {
        Object.assign(this, this.commonSearchService.currentProperty)
    }

    $onInit() {
        if (!this.commonSearchService.currentProperty) {
            this.$state.go('search')
        } else {
            this.roomsInfo = this.formRoomsInfo(this.commonSearchService.currentProperty)
            const property = this.commonSearchService.currentProperty
            this.isPropertyInFavorites = this.favoritesCommonService.checkPropertyInFavorites(property)
        }
    }

    togglePropertyFavoriteState() {
        const property = this.commonSearchService.currentProperty
        if (this.isPropertyInFavorites) {
            this.favoritesCommonService.removePropertyFromFavorites(property)
        } else {
            this.favoritesCommonService.addPropertyToFavorites(property)
        }
        this.isPropertyInFavorites = !this.isPropertyInFavorites
    }

    formRoomsInfo({ bedroom_number, bathroom_number }) {
        const bedrooms = typeof bedroom_number === 'number' ? bedroom_number : '-'
        const bathrooms = typeof bathroom_number === 'number' ? bathroom_number : '-'
        return `${bedrooms} bedroom(s), ${bathrooms} bathroom(s)`
    }
}

export default { template, controller, bindings }