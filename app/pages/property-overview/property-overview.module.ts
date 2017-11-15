import { module } from 'angular';
import PropertyOverviewComponent from './property-overview.component';

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
    .name