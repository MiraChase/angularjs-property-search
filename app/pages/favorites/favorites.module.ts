import { module } from 'angular'
import FavoritesComponent from './favorites.component'

export default module('FavoritesModule', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider',
        ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
            $stateProvider.state({
                name: 'favorites',
                url: '/favorites',
                component: 'favoritesComponent'
            })
        }])
    .component('favoritesComponent', FavoritesComponent)
    .name