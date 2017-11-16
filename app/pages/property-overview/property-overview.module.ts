import { module } from 'angular'
import PropertyOverviewComponent from './property-overview.component'
import PropertyOverviewService from './property-overview.service'

export default module('PropertyOverviewModule', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider',
        ($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider.state({
                name: 'propertyOverview',
                url: '/property-overview',
                component: 'propertyOverviewComponent'
            })
        }])
    .component('propertyOverviewComponent', PropertyOverviewComponent)
    .service('propertyOverviewService', PropertyOverviewService)
    .name
