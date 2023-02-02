import * as $ from "jquery";
window.$ = $;
window.jQuery = $;
import "bootstrap";
import * as api from "./apiCalls";
import * as model from "./model/model";

const $body = $("body");
const url = "https://graphql.anilist.co";

$("#select").on("change", function (e) {
	const mediaFormat = e.target.value;

	api.addMediaFilter(new model.Filter("type", "ANIME"));
	api.getMaxId();
});
