from typing import Any, Awaitable, Dict
import asyncio
import requests
from requests.exceptions import HTTPError
import time


async def run_sequence(*functions: Awaitable[Any]) -> None:
    results = []
    for function in functions:
        result = await function
        results.append(result)
    return results


async def run_parallel(*functions: Awaitable[Any]) -> None:
    return await asyncio.gather(*functions)


async def make_request(request_url: str) -> Dict[Any, Any]:
    try:
        response = requests.get(request_url)
        response.raise_for_status()
    except HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")  # Python 3.6
    except Exception as err:
        print(f"Other error occurred: {err}")  # Python 3.6
    else:
        print(f"Status Code: {response.status_code}")

    return dict(response.json())


async def main():
    requests_to_make = [
        make_request("https://api.gbif.org/v1/species/match?name=Cyclorana longipes"),
        make_request(
            "https://api.gbif.org/v1/species/match?name=Limnodynastes convexiusculus (Macleay, 1878)"
        ),
        make_request(
            "https://api.gbif.org/v1/species/match?name=Platyplectrum ornatum"
        ),
    ]
    results = await run_parallel(*requests_to_make)
    print(results)


# test
if __name__ == "__main__":
    start = time.time()

    asyncio.run(main())

    end = time.time()
    delta = end - start
    print(delta)
