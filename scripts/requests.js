export async function fetchDataFromDummyjsonApi(url, limit = null, getUsers = false) {
  const controller = new AbortController();
  let ApiEndPoint = url + (limit ? `?limit=${limit}` : "");
  const data = {};
  const delayTimeForAbortReq = 10000;
  try {
    let timeOutFetch = setTimeout(() => {
      controller.abort();
      clearTimeout(timeOutFetch);
    }, delayTimeForAbortReq);
    const response = await fetch(ApiEndPoint, {
      method: "GET",
      signal: controller.signal,
    });
    console.log(response);
    if (response.ok) {
      let apiData = await response.json();
      const endPoint = url.slice(url.lastIndexOf("/") + 1);
      data.result = apiData[endPoint];
      data.error = null;
    } else {
      data.result = null;
      data.error = response.statusText;
    }

    if (getUsers && data.result) {
      const response = await fetch("https://dummyjson.com/users?limit=100");
      if (response.ok) {
        let apiData = await response.json();
        userData = apiData.users.filter((user) => {
          return data.result.find((post) => {
            if (post.userId === user.id) {
              post.userId = user; // add user info to post
              return true;
            }
          });
        });
      } else {
        userData = response.statusText;
      }
    }
    clearTimeout(timeOutFetch);
  } catch (error) {
    data.result = null;
    data.error = error;
    // console.log(error);
  }
  return data;
}
