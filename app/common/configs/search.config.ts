export class SEARCH_CONFIG {
    static get RECENT_SEARCHES_LENGTH() {
        return 6
    }

    static get SEARCH_RESULTS_LENGTH() {
        return 20
    }

    static get NO_PROPERTIES_FOUND_ERROR_TEXT() {
        return 'There were no properties found for the given location.'
    }

    static get NETWORK_ISSUES_ERROR_TEXT() {
        return 'An error occurred while searching. Please check your network connection and try again.'
    }
}
