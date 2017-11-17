import { ApiSearchParams } from '../interfaces/search-params.interface'
import { API_CONFIG } from '../configs/api.config'
import { SEARCH_CONFIG } from '../configs/search.config'

export default class apiService {
    static $inject = ['$http', '$q']
    constructor (
        private $http: ng.IHttpService,
        private $q: ng.IQService
    ) {}

    public formSearchParams(location: string, page: number = 1): ApiSearchParams {
        return {
            callback: 'JSON_CALLBACK',
            encoding: 'json',
            action: 'search_listings',
            country: 'uk',
            listing_type: 'buy',
            place_name: location,
            number_of_results: SEARCH_CONFIG.SEARCH_RESULTS_LENGTH,
            page
        }
    }

    public getJSONP(searchParams: ApiSearchParams): ng.IPromise<ng.IHttpResponse<{}>> {
        return this.$http.jsonp(API_CONFIG.API_URL, {
            params: searchParams
        })
            .then((results: ng.IHttpResponse<{}>) => {
                return results
            }, errors => {
                return this.$q.reject(errors)
            })
    }
}
