// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  // TODO: we will not hard-code server URL here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductsByFilter(filter, sort) {
  // filter={"category":"[smartphone","laptops"]}
  //sort={_sort:"price",_order:"desc"};
  // TODO: on server we will support multiple value in filter.
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  //sort
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  // TODO: we will not hard-code server URL here
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    resolve({ data });
  });
}
