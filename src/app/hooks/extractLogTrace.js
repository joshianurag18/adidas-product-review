/* eslint-disable complexity */
module.exports = async request => {
  request.logTrace = {
    ...(request.headers["x-request-id"] && {
      "x-request-id": request.headers["x-request-id"]
    }),
    ...(request.headers["x-b3-traceid"] && {
      "x-b3-traceid": request.headers["x-b3-traceid"]
    }),
    ...(request.headers["x-b3-spanid"] && {
      "x-b3-spanid": request.headers["x-b3-spanid"]
    }),
    ...(request.headers["x-b3-parentspanid"] && {
      "x-b3-parentspanid": request.headers["x-b3-parentspanid"]
    }),
    ...(request.headers["x-b3-sampled"] && {
      "x-b3-sampled": request.headers["x-b3-sampled"]
    }),
    ...(request.headers["x-ot-span-context"] && {
      "x-ot-span-context": request.headers["x-ot-span-context"]
    }),
    ...(request.headers["x-b3-flags"] && {
      "x-b3-flags": request.headers["x-b3-flags"]
    })
  };
};
