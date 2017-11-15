export default class favoritesCommonService {
    public favorites: any[]

    static $inject = []
    constructor () {}

    getFavorites() {
        this.favorites = JSON.parse(localStorage['favorites'] || '[]')
    }

    addFavoritesToLocalStorage(favorites) {
        localStorage['favorites'] = JSON.stringify(favorites)
    }

    checkPropertyInFavorites(property) {
        this.getFavorites()
        return !!this.findPropertyInFavorites(property)
    }

    addPropertyToFavorites(property) {
        this.getFavorites()

        if (!this.checkPropertyInFavorites(property)) {
            this.favorites.push(property)
            this.addFavoritesToLocalStorage(this.favorites)
        }
    }

    removePropertyFromFavorites(property) {
        this.getFavorites()

        const propertyInFavorites = this.findPropertyInFavorites(property)
        if (propertyInFavorites) {
            this.favorites.splice(this.favorites.indexOf(propertyInFavorites), 1)
            this.addFavoritesToLocalStorage(this.favorites)
        }
    }

    findPropertyInFavorites({ lister_url: propertyUrl }) {
        return this.favorites.find(({ lister_url: currentPropertyUrl }) => propertyUrl === currentPropertyUrl)
    }
}
