import urllib.parse

import django.utils.http


def update_query_string(url: str, params: dict[str, str | list[str] | None]) -> str:
    """
    Update the query string of the url based on the given dict of key-value pairs.

    Values can be either string or list of strings.

    To remove a key, use `None` as value.
    """
    parsed_url = urllib.parse.urlsplit(url=url)
    query_dict = urllib.parse.parse_qs(qs=parsed_url.query, keep_blank_values=True)
    for key, value in params.items():
        if value is None:
            # Remove the key
            try:
                query_dict.pop(key)
            except KeyError:
                # Key not present, so all good.
                pass
        else:
            # Values need to be wrapped in a list. If the given values are not lists, they are
            # wrapped
            # in one.
            query_dict[key] = value if isinstance(value, list) else [value]
    query_string = django.utils.http.urlencode(query_dict, doseq=True)
    return urllib.parse.urlunsplit(
        (
            parsed_url.scheme,
            parsed_url.netloc,
            parsed_url.path,
            query_string,
            parsed_url.fragment,
        )
    )
