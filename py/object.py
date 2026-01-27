from typing import Any, Iterable


def get_first_of(obj: object, attrs: Iterable[str], default: Any = None) -> Any:
    """Return first truthy attribute."""
    for attr in attrs:
        value = getattr(obj, attr, None)
        if value:
            return value
    return default
