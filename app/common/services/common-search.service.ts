import { Property } from '../models/property.model'
import { StoredSearchParams } from '../interfaces/search-params.interface'

export default class commonSearchService {
    public searchParams: StoredSearchParams | {} = {}
    public searchResults: Property[] = []
    public currentProperty: Property

    static $inject = ['searchConfig']
    constructor (
        private searchConfig
    ) {}

    storeSearchParams(searchParams: StoredSearchParams) {
        this.searchParams = searchParams
    }

    storeSearchResults(searchResults: Property[]) {
        this.searchResults = searchResults
    }

    appendSearchResults(searchResults: Property[]) {
        this.searchResults = this.searchResults.concat(searchResults)
    }

    storeCurrentProperty(property: Property) {
        this.currentProperty = Object.assign(new Property(), property)
    }

    getNumResultsPerPage() {
        return this.searchConfig.searchResultsLength
    }
}
