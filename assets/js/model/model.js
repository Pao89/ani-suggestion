export class Filter {
	constructor(name, value = "") {
		this.name = name;
		this.value = value;
	}

	parseFilter() {
		if (!this.value) return "";
		return `${this.name}: ${this.value}`;
	}
}

export class Field {
	constructor(name, fields = [], filters = []) {
		this.name = name;
		this.filters = filters;
		if (Array.isArray(fields)) {
			this.fields = fields;
		} else {
			this.fields = [fields];
		}
	}

	hasFilter(filterName) {
		return this.filters.some((filter) => filter.name == filterName);
	}

	addFilter(filter) {
		this.filters.push(filter);
	}

	removeFilter = (filterName) => {
		this.filters = this.filters.filter((filter) => filter.name != filterName);
	};

	addField(field) {
		this.fields.push(field);
	}

	removeField(fieldName) {
		this.fields = this.fields.filter((field) => field.name != fieldName);
	}

	parseFilters() {
		if (this.filters.length == 0) return "";
		return `(${this.filters.map((filter) => filter.parseFilter()).join(",")})`;
	}

	//A nice function that parses every field of a GraphQL query. I probably need to develop a GraphQL query formatter.
	parseField = () => {
		return `
            ${this.name}${this.parseFilters()}${this.fields.length > 0 ? "{" : ""}
                ${this.fields
					.map((field) => {
						if (field.fields.length == 0) {
							return `
                            ${field.name}${field.parseFilters()}`;
						} else {
							return `
                            ${field.parseField()}`;
						}
					})
					.join("")}
            ${this.fields.length > 0 ? "}" : ""}
        `;
	};
}

export class Query {
	constructor(page, fields = []) {
		this.page = page;
		this.fields = fields;
	}

	parseQuery = () => {
		return `
        query {
            ${this.page.parseField()}
        }
        `;
	};
}
