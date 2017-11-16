import { Property} from '../../common/models/property.model'

export default class propertyOverviewService {
    public roomsInfo: string
    public isPropertyInFavorites: boolean

    static $inject = ['$state', 'searchConfig', 'commonSearchService', 'favoritesCommonService']
    constructor (
        private $state: ng.ui.IStateService,
        private searchConfig,
        private commonSearchService,
        private favoritesCommonService
    ) {}

    public togglePropertyFavoriteState() {
        const { currentProperty } = this.commonSearchService
        this.isPropertyInFavorites
            ? this.favoritesCommonService.removePropertyFromFavorites(currentProperty)
            : this.favoritesCommonService.addPropertyToFavorites(currentProperty)

        this.isPropertyInFavorites = !this.isPropertyInFavorites
    }

    public checkPropertyInFavorites(currentProperty: Property) {
        this.isPropertyInFavorites = this.favoritesCommonService.checkPropertyInFavorites(currentProperty)
    }

    public formRoomsInfo({ bedroom_number, bathroom_number }: Property) {
        const bedrooms = this.checkRoomsQuantityProvided(bedroom_number)
        const bathrooms = this.checkRoomsQuantityProvided(bathroom_number)
        this.roomsInfo = `${bedrooms} bedroom(s), ${bathrooms} bathroom(s)`
    }

    private checkRoomsQuantityProvided(roomsQuantity: number | string): number | string {
        return typeof roomsQuantity === 'number' ? roomsQuantity : '-'
    }
}
