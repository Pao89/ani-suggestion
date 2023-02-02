import * as model from "./model/model";
import * as configs from "./configs";

const idField = new model.Field("id");
const titleFields = [new model.Field("romaji")];
///////////////////////////////////////////////

export let mediaFilters = [];
//prettier-ignore
export const mediaFields = [
    idField,
    new model.Field("title", titleFields), //add different titles?
    new model.Field("status"),
    new model.Field("genre"),
    new model.Field("description"),
    new model.Field("episodes"),
    new model.Field("averageScore"),
    new model.Field("favourites"),
    new model.Field("coverImage"), //add dimension field
];

export const doCall = async function (query, successHandler, errorHandler) {
	const ajaxConfigs = {
		url: configs.url,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		data: JSON.stringify({
			query,
		}),
	};
	$.ajax(ajaxConfigs).done(successHandler).fail(errorHandler);
};

export const getQuery = function (mediaFields = [], mediaFilters = [], pageFilters = [new model.Filter("page", 1), new model.Filter("perPage", 1)]) {
	const pageInfoFields = [new model.Field("total"), new model.Field("lastPage"), new model.Field("hasNextPage")];
	const pageInfo = new model.Field("pageInfo", pageInfoFields);
	const media = new model.Field("media", mediaFields, mediaFilters);

	const pageFields = [pageInfo, media];
	const page = new model.Field("Page", pageFields, pageFilters);

	const query = new model.Query(page);
	return query.parseQuery();
};

export const getMaxId = async function () {
	const query = getQuery(idField, [...mediaFilters, new model.Filter("sort", "ID_DESC")]);
	let maxId;
	console.log(query);
	doCall(
		query,
		function (data) {
			console.log(data);
		},
		function (jqXHR, textStatus, errorThrown) {}
	);
};

export const addMediaFilter = function (mediaFilter) {
	if (mediaFilters.some((filter) => filter.name == mediaFilter)) return;
	mediaFilters.push(mediaFilter);
};

export const removeMediaFilter = function (mediaFilter) {
	mediaFilters = mediaFilters.filter((currMediaFilter) => currMediaFilter.name == mediaFilter.name);
};
