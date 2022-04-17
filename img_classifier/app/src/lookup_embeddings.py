from collections import defaultdict


def lookup_embeddings(extracted_embeddings, faiss_index, filenames):
    """Lookup faiss trained embedings in the faiss index against PCA extracted index.
    Return a list of tuples (filename, distance) where distance is inverted to give
    score."""
    assert extracted_embeddings.shape == (1, 128)

    # find 1000 closest images
    D, I = faiss_index.search(extracted_embeddings, 100)

    # get first as we only match for single image
    D = D[0]
    I = I[0]

    # Calculate 1/D for distances, so closest distances have the highest score
    D = 1/D

    # create dictionary with filename as key and sum of distances as value
    scores = defaultdict(int)
    for idx, i in enumerate(I):
        filename=filenames[i]
        species_name = '/'.join(filename.split('/')[-3:-1])
        scores[species_name] += D[idx]

    # sort dictionary by value and return top 10 matches with their values
    scores = {k: v for k, v in sorted(scores.items(), key=lambda item: item[1])[::-1]}
    return scores
    