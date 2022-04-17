from typing import List, Text
from dataclasses import dataclass
from . import async_calls


GBIF_BASE_URL = "https://api.gbif.org/v1/species/"
GBIF_SPECIES_LOOKUP_URL = GBIF_BASE_URL + "match?name="
GBIF_QUERY_LOOKUP_URL = GBIF_BASE_URL + "search?q="
GET_GBIF_QUERY_LOOPUP = lambda qname: GBIF_QUERY_LOOKUP_URL + qname + "&limit=1"


@dataclass
class GBIFSpeciesMatchResponse:
    confidence: int = None
    matchType: str = None
    synonym: bool = None
    scientificName: str = None
    canonicalName: str = None
    rank: str = None
    status: str = None
    kingdom: str = None
    phylum: str = None
    _class: str = None
    order: str = None
    family: str = None
    genus: str = None
    species: str = None
    kingdomKey: int = None
    phylumKey: int = None
    orderKey: int = None
    familyKey: int = None
    genusKey: int = None
    speciesKey: int = None
    usageKey: int = None
    classKey: int = None
    taxonID: str = None
    habitats: str = None
    extinct: str = None

    def __init__(self, **kwargs):
        """Initialize GBIFSpeciesMatchResponse object."""
        for key, value in kwargs.items():
            if key == "class":
                self._class = value
                continue
            if key == "taxonomicStatus":
                self.matchType = value
                continue
            setattr(self, key, value)

    def has_match(self) -> bool:
        """If no match; then MatchType will be None"""
        if self.matchType == "NONE":
            return False
        return True


async def query_gbif_species_match(
    species: List[Text],
) -> List[GBIFSpeciesMatchResponse]:
    """Returns a list of GBIF Query results for species match"""
    gbif_responses = await async_calls.run_parallel(
        *[
            async_calls.make_request(GBIF_SPECIES_LOOKUP_URL + species_name)
            for species_name in species
        ]
    )
    gbif_responses = [
        GBIFSpeciesMatchResponse(**gbif_resp) for gbif_resp in gbif_responses
    ]
    return gbif_responses


async def query_gbif_lookup(qname: List[Text]) -> List[GBIFSpeciesMatchResponse]:
    """Looser query for GBIF lookup."""
    gbif_responses = await async_calls.run_parallel(
        *[async_calls.make_request(GET_GBIF_QUERY_LOOPUP(qn)) for qn in qname]
    )
    # parse into class; only one result returned; so take top. If no result then None
    gbif_responses = [
        GBIFSpeciesMatchResponse(**res["results"][0]) if res["results"] else None
        for res in gbif_responses
    ]
    return gbif_responses


async def query_gbif_taxon_id(taxon_ids: List[int]) -> List[GBIFSpeciesMatchResponse]:
    """Query GBIF for taxon ids."""
    gbif_responses = await async_calls.run_parallel(
        *[
            async_calls.make_request(GBIF_BASE_URL + str(taxon_id))
            for taxon_id in taxon_ids
        ]
    )
    gbif_responses = [
        GBIFSpeciesMatchResponse(**gbif_resp) for gbif_resp in gbif_responses
    ]
    return gbif_responses


async def query_gbif(query_list: List[str]) -> List[GBIFSpeciesMatchResponse]:
    # initial gbif query (species name match)
    results = await query_gbif_species_match(query_list)

    # indedxes where res is none from first query
    null_result_indexes = [
        idx for idx, res in enumerate(results) if res.matchType == "NONE"
    ]
    # build second query list (query match)
    second_query_list = [query_list[nri] for nri in null_result_indexes]
    # do looser query
    results2 = await query_gbif_lookup(second_query_list)
    # fill original results
    for idx, nri in enumerate(null_result_indexes):
        results[nri] = results2[idx]
    return results


if __name__ == "__main__":
    # build initial query list
    query_list = [
        "Leucauge dromedaria (Thorell, 1881)",  # species match
        "Red Baron",  # query match
        "blablabla",  # no match
        "Cyclorana longipes Tyler & Martin, 1977",  # synonym match; still returns the same taxon key for species
    ]
    gbif_response = query_gbif(query_list)
    import json

    gbif_response = json.dumps(
        [res.__dict__ if res is not None else {"result": None} for res in gbif_response]
    )
    print(gbif_response)
