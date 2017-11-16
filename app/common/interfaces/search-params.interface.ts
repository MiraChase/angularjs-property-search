export interface ApiSearchParams {
    callback: string,
    encoding: string,
    action: string,
    country: string,
    listing_type: string,
    place_name: string,
    number_of_results: number,
    page: number
}

export interface SearchResultsParams {
    location?: string,
    total_results?: number,
    page?: number
}
