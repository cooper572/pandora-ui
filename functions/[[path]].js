export async function onRequest(context) {
    const response = await context.env.ASSETS.fetch(context.request);

    if (response.status !== 404) {
        return response;
    }

    const accept = context.request.headers.get("Accept") || "";

    if (!accept.includes("text/html")) {
        return response;
    }

    const url = new URL(context.request.url);
    url.pathname = "/";

    return context.env.ASSETS.fetch(new Request(url, context.request));
}
