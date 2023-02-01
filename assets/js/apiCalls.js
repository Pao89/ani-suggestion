import * as model from "./model/model";

/* Page query Building */
const pageFilters = [new model.Filter("page", 1), new model.Filter("perPage", 1)]; //The RANDOMNESS starts here
const pageInfoFields = [new model.Field("total"), new model.Field("lastPage"), new model.Field("hasNextPage")];

const pageInfo = new model.Field("pageInfo", pageInfoFields);

/* Media query Building */

const mediaFilters = [new model.Filter("type", "ANIME"), new model.Filter("format", "TV")];

const titleFields = [new model.Field("romaji"), new model.Field("english")];
const mediaFields = [new model.Field("title", titleFields)];
const idField = new model.Field("id");
const media = new model.Field("media", [idField, ...mediaFields], mediaFilters);

/* Test query building */

const pageFields = [pageInfo, media];
const page = new model.Field("Page", pageFields, pageFilters);
const query = new model.Query(page, [], []);

export const testQuery = query.parseQuery;

///////////////////////////////////////////////
