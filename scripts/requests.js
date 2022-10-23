export async function fetchDataFromDummyjsonApi(number) {
  let ApiEndPoint = "https://635298c0a9f3f34c37434ca1.mockapi.io/data";
  const data = {};
  try {
    const response = await fetch(ApiEndPoint);
    if (response.ok) {
      let apiData = await response.json();
      data.result = apiData.slice(0, number);
      console.log(data.result);
      data.error = null;
    } else {
      data.result = null;
      data.error = response.statusText;
    }
  } catch (error) {
    data.result = null;
    data.error = error;
  }
  return data;
}
