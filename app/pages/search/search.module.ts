import { module, element, bootstrap } from 'angular';
import SearchComponent from './search.component';
import SearchService from './search.service'
import SearchConfig from './search.config'

export default module('SearchModule', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider',
        ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
            $stateProvider.state({
                name: 'search',
                url: '/search',
                component: 'searchComponent'
            })
        }])
    .component('searchComponent', SearchComponent)
    .service('searchService', SearchService)
    .constant('searchConfig', SearchConfig)
    .name