import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const API_URL = 'https://api.lens.dev'

export const client = new ApolloClient({
	uri: API_URL,
	cache: new InMemoryCache()
})

export const exploreProfiles = gql`
	query ExploreProfiles {
		exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS }) {
			items {
				id
				name
				bio
				handle
				picture {
					... on MediaSet {
						original {
							url
						}
					}
				}
				stats {
					totalFollowers
				}
			}
		}
	}
`
export const getProfile = gql`
	query Profile($handle: Handle!) {
		profile(request: { forHandle: $handle }) {
			id
			name
			bio
			picture {
				... on MediaSet {
					original {
						url
					}
				}
			}
			handle
		}
	}
`

export const getPublications = gql`
	query Publications($id: ProfileId!, $limit: LimitScalar) {
		publications(
			request: {
				where: { from: [$id], publicationTypes: [POST] }
				limit: $limit
			}
		) {
			items {
				__typename
				... on Post {
					...PostFields
				}
			}
		}
	}
	fragment PostFields on Post {
		id
		metadata {
			...MetadataOutputFields
		}
	}
	fragment MetadataOutputFields on MetadataOutput {
		content
	}
`
