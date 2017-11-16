import { Property } from '../models/property.model'

export default class favoritesCommonService {
    public favorites: Property[]

    static $inject = []
    constructor () {}

    getFavorites() {
        this.favorites = JSON.parse(localStorage['favorites'] || '[]')
    }

    addFavoritesToLocalStorage(favorites: Property[]) {
        localStorage['favorites'] = JSON.stringify(favorites)
    }

    checkPropertyInFavorites(property: Property) {
        this.getFavorites()
        return !!this.findPropertyInFavorites(property)
    }

    addPropertyToFavorites(property: Property) {
        this.getFavorites()

        if (!this.checkPropertyInFavorites(property)) {
            this.favorites.push(property)
            this.addFavoritesToLocalStorage(this.favorites)
        }
    }

    removePropertyFromFavorites(property: Property) {
        this.getFavorites()

        const propertyInFavorites = this.findPropertyInFavorites(property)
        if (propertyInFavorites) {
            this.favorites.splice(this.favorites.indexOf(propertyInFavorites), 1)
            this.addFavoritesToLocalStorage(this.favorites)
        }
    }

    findPropertyInFavorites({ lister_url: propertyUrl }: Property) {
        return this.favorites.find(({ lister_url: currentPropertyUrl }) => propertyUrl === currentPropertyUrl)
    }
}
