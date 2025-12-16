import urllib.parse

import django.utils.http

def append_query_string(url: str, params: dict) -> str:
    """Append a query string based on the given dict of key-value pairs to the url."""
    query_string = django.utils.http.urlencode(params)
    return urllib.parse.urljoin(base=url, url="?" + query_string)