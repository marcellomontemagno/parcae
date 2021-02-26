import React, {useEffect, useState} from "react";
import resource from "../shared/resource";

export default function UI() {
  const [resourceA, setResourceA] = useState({loading: true, data: null, error: null});
  const [resourceB, setResourceB] = useState({loading: true, data: null, error: null});

  useEffect(() => {
    resource
      .asyncGetA()
      .then((data) => setResourceA({loading: false, data, error: null}))
      .catch((error) => setResourceA({loading: false, data: null, error}));
    resource
      .asyncGetB()
      .then((data) => setResourceB({loading: false, data, error: null}))
      .catch((error) => setResourceB({loading: false, data: null, error}));
  }, []);

  if (resourceA.error || resourceB.error) {
    return <div data-test-id="error">An error occurred, please try again later.</div>
  }

  return <>
    <div>
      {resourceA.loading ? (
        <span data-test-id="loader-a">Loading resource A...</span>
      ) : (
        <span data-test-id="data-a">{resourceA.data}</span>
      )}
    </div>
    <div>
      {resourceB.loading ? (
        <span data-test-id="loader-b">Loading resource B...</span>
      ) : (
        <span data-test-id="data-b">{resourceB.data}</span>
      )}
    </div>
    {!resourceA.loading && !resourceB.loading && <div data-test-id="all-data-loaded">All data loaded</div>}
  </>

}
