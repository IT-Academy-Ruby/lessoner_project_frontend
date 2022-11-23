const getParameterValue = (url: string, parameter: string) => {
  const urlParams = url.match(/\?.*/);
  if (urlParams) {
    const params = new URLSearchParams(urlParams[0]);
    return params ? params.get(parameter) : undefined;
  }
};

export default getParameterValue;
