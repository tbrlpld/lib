import urllib.parse

import django.utils.http


def update_query_string(url: str, params: dict[str, str | list[str]]) -> str:
    """
    Update the query string of the url based on the given dict of key-value pairs.

    Values can be either string or list of strings.
    """
    parsed_url = urllib.parse.urlparse(url=url)
    query_dict = urllib.parse.parse_qs(qs=parsed_url.query, keep_blank_values=True)
    for key, value in params.items():
        # Values need to be wrapped in a list. If the given values are not lists, they are wrapped
        # in one.
        query_dict[key] = value if isinstance(value, list) else [value]
    query_string = django.utils.http.urlencode(query_dict, doseq=True)
    return urllib.parse.urljoin(base=url, url="?" + query_string)