import { module } from 'angular'
import SearchResultsComponent from './search-results.component'
import SearchResultsService from './search-results.service'

export default module('SearchResultsModule', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider',
        ($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider.state({
                name: 'searchResults',
                url: '/search-results?location',
                component: 'searchResultsComponent'
            })
        }])
    .component('searchResultsComponent', SearchResultsComponent)
    .service('searchResultsService', SearchResultsService)
    .name