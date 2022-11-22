async function searchQueryTerm(input) {
    const response = await fetch(self.__uv$config.bare+"v1/", { headers: { 'x-bare-host': 'duckduckgo.com', 'x-bare-protocol': 'https:', 'x-bare-path': '/ac/?q=' + encodeURIComponent(event.target.value), 'x-bare-port': '443', 'x-bare-headers': JSON.stringify({ Host: 'duckduckgo.com' }), 'x-bare-forward-headers': '[]' } });
    return await response.json();
}