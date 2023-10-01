// redirect to path and reload the page from server
export function clientRedirect(path: string) {
  window.location.href =
    window.location.protocol + "//" + window.location.host + "/" + path;
}
