import { Property} from '../../common/models/property.model'

import CommonSearchService from '../../common/services/common-search.service'
import FavoritesCommonService from '../../common/services/favorites-common.service'

export default class propertyOverviewService {
    static $inject = ['$state', 'commonSearchService', 'favoritesCommonService']

    public roomsInfo: string
    public isPropertyInFavorites: boolean

    constructor (
        private $state: ng.ui.IStateService,
        private commonSearchService: CommonSearchService,
        private favoritesCommonService: FavoritesCommonService
    ) {}

    public togglePropertyFavoriteState() {
        const { currentProperty } = this.commonSearchService
        this.isPropertyInFavorites
            ? this.favoritesCommonService.removePropertyFromFavorites(currentProperty)
            : this.favoritesCommonService.addPropertyToFavorites(currentProperty)

        this.isPropertyInFavorites = !this.isPropertyInFavorites
    }

    public checkPropertyInFavorites(uniqueUrl: string) {
        this.isPropertyInFavorites = this.favoritesCommonService.checkPropertyInFavorites(uniqueUrl)
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
