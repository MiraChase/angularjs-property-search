import { module } from 'angular'
import SearchComponent from './search.component'
import SearchService from './search.service'

export default module('SearchModule', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider',
        ($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider.state({
                name: 'search',
                url: '/search',
                component: 'searchComponent'
            })
        }])
    .component('searchComponent', SearchComponent)
    .service('searchService', SearchService)
    .name
