import { Property } from '../models/property.model'

export default class favoritesCommonService {
    static $inject = []

    public favorites: Property[]

    constructor () {}

    public getFavorites() {
        this.favorites = JSON.parse(localStorage['favorites'] || '[]')
    }

    public checkPropertyInFavorites(property: Property) {
        this.getFavorites()
        return !!this.findPropertyInFavorites(property)
    }

    public addPropertyToFavorites(property: Property) {
        this.getFavorites()

        if (!this.checkPropertyInFavorites(property)) {
            this.favorites.push(property)
            this.addFavoritesToLocalStorage(this.favorites)
        }
    }

    public removePropertyFromFavorites(property: Property) {
        this.getFavorites()

        const propertyInFavorites = this.findPropertyInFavorites(property)
        if (propertyInFavorites) {
            this.favorites.splice(this.favorites.indexOf(propertyInFavorites), 1)
            this.addFavoritesToLocalStorage(this.favorites)
        }
    }

    private addFavoritesToLocalStorage(favorites: Property[]) {
        localStorage['favorites'] = JSON.stringify(favorites)
    }

    private findPropertyInFavorites({ lister_url: propertyUrl }: Property) {
        return this.favorites.find(({ lister_url: currentPropertyUrl }) => propertyUrl === currentPropertyUrl)
    }
}
