// functions/api/[path].js
export async function onRequest(context) {
  const { request, env, params } = context;

  // Bygg om URL så att /api/table → /table på workern, etc.
  const url = new URL(request.url);
  const backendPath = "/" + (params.path || "");
  const backendUrl = new URL(backendPath, "https://dummy"); // basen används inte av workern

  const init = {
    method: request.method,
    headers: request.headers,
    body: ["GET", "HEAD"].includes(request.method) ? null : request.body,
  };

  const backendRequest = new Request(backendUrl.toString(), init);

  // VALIDATE_MD_WORKER är din service binding
  return env.VALIDATE_MD_WORKER.fetch(backendRequest);
}
