// functions/api/[path].js
export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);

  // Frontend:  /api/table,          /api/sync-metadata, /api/decision
  // Worker:    /table,              /sync-metadata,     /decision
  const backendPath = "/" + (params.path || "");
  const backendUrl = new URL(backendPath + url.search, "https://dummy");

  const init = {
    method: request.method,
    headers: request.headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
  };

  const backendRequest = new Request(backendUrl.toString(), init);

  return env.VALIDATE_MD_WORKER.fetch(backendRequest);
}
