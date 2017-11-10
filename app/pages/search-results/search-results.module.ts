import { module, element, bootstrap } from 'angular';
import SearchResultsComponent from './search-results.component';

export default module('FavoritesModule', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider',
        ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
            $stateProvider.state({
                name: 'searchResults',
                url: '/search-results',
                component: 'searchResultsComponent'
            })
        }])
    .component('searchResultsComponent', SearchResultsComponent)
    .name