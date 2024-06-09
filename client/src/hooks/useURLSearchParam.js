import { useState, useEffect } from "react";

function useURLSearchParam(paramName, initialValue = "") {
  const query = new URLSearchParams(window.location.search);
  const [paramValue, setParamValue] = useState(
    query.get(paramName) || initialValue
  );

  useEffect(() => {
    const newURL = paramValue
      ? `${window.location.path}?${paramName}=${paramValue}`
      : window.location.path;

    window.history.pushState({}, "", newURL);
  }, [paramValue, paramName]);

  return [paramValue, setParamValue];
}

export default useURLSearchParam;
