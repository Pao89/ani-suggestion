import * as $ from "jquery";
window.$ = $;
window.jQuery = $;
import "bootstrap";

const $body = $("body");

const query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search) {
        id
        title {
          romaji
        }
      }
    }
  }
`;

const variables = {
	search: "The World God Only Knows",
	page: 1,
	perPage: 3,
};

const url = "https://graphql.anilist.co";
const options = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	body: JSON.stringify({
		query: query,
		variables: variables,
	}),
};

$.ajax({
	url: url,
	data: options.body,
	headers: options.headers,
	method: options.method,
}).done(function (data) {
	console.log(data);
});
