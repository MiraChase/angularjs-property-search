import { Property } from '../models/property.model'

export default class favoritesCommonService {
    static $inject = []

    public favorites: Property[]

    constructor () {}

    public getFavorites() {
        this.favorites = JSON.parse(localStorage['favorites'] || '[]')
    }

    public checkPropertyInFavorites(uniqueUrl: string) {
        this.getFavorites()
        return !!this.findPropertyInFavorites(uniqueUrl)
    }

    public addPropertyToFavorites(property: Property) {
        this.getFavorites()

        const { lister_url: uniqueUrl } = property
        if (!this.checkPropertyInFavorites(uniqueUrl)) {
            this.favorites.push(property)
            this.addFavoritesToLocalStorage(this.favorites)
        }
    }

    public removePropertyFromFavorites(property: Property) {
        this.getFavorites()

        const { lister_url: uniqueUrl } = property
        const propertyInFavorites = this.findPropertyInFavorites(uniqueUrl)
        if (propertyInFavorites) {
            this.favorites.splice(this.favorites.indexOf(propertyInFavorites), 1)
            this.addFavoritesToLocalStorage(this.favorites)
        }
    }

    private addFavoritesToLocalStorage(favorites: Property[]) {
        localStorage['favorites'] = JSON.stringify(favorites)
    }

    private findPropertyInFavorites(uniqueUrl: string) {
        return this.favorites.find(({ lister_url: currentPropertyUrl }) => uniqueUrl === currentPropertyUrl)
    }
}
