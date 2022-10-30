import _ from "lodash";

const getVKCode = (url: string) => {
  const urlParams = url.match(/\?.*/);
  if (urlParams) {
    const params = new URLSearchParams(urlParams[0]);
    return params ? params.get('code') : undefined;
  }
}

export default getVKCode;