import { ApiSearchParams } from '../interfaces/search-params.interface'

export default class apiService {
    static $inject = ['$http', '$q', 'apiConfig', 'searchConfig']
    constructor (
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private apiConfig,
        private searchConfig
    ) {}

    public formSearchParams(location: string, page: number = 1): ApiSearchParams {
        return {
            callback: 'JSON_CALLBACK',
            encoding: 'json',
            action: 'search_listings',
            country: 'uk',
            listing_type: 'buy',
            place_name: location,
            number_of_results: this.searchConfig.SEARCH_RESULTS_LENGTH,
            page
        }
    }

    public getJSONP(searchParams: ApiSearchParams): ng.IPromise<ng.IHttpResponse<{}>> {
        return this.$http.jsonp(this.apiConfig.API_URL, {
            params: searchParams
        })
            .then((results: ng.IHttpResponse<{}>) => {
                return results
            }, errors => {
                return this.$q.reject(errors)
            })
    }
}
