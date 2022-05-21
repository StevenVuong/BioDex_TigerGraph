# 🐯 TigerGraph Hackathon 22

A [hackathon](https://graphforall.devpost.com/) with a $1m USD prize pool up for grabs, deadline is April 20th 2022. The requirement is that we solve a problem using [TigerGraph](https://www.tigergraph.com/). This repository contains our solution; we will dub our team name `DevAdventurers` after our Habitica party :blush: :heart:.

Link to YouTube Video:  <https://www.youtube.com/watch?v=3RESgsM6peU&ab_channel=StevenVuong>
Link to DevPost page: <https://devpost.com/software/biodex-2f3dxa?ref_content=user-portfolio&ref_feature=in_progress>

## Get Started

Follow [installation instructions](./installation_instructions.md)

## Judging Criteria

- Most Impactful Solution
- Most Innovative use case of Graph
- Most ambitious and complex graph
- Most applicable graph solution

## Submission Requirements

- Demo video (under 3 minutes)
- Code URL; [template](https://github.com/TigerGraph-DevLabs/graph-for-all-submission-template). We can open up this repo eventually
- Write-Up: Written defence of project against the 4 judging criteria, up to 250 words for each

## Our Solution

Build a graph that maps all species identified by Humans so far. [GBIF](https://www.gbif.org/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c#description) (Global Biodiversity Information Facility) aggregates data and [open sources](https://hosted-datasets.gbif.org/datasets/backbone/) its dataset which is [downloadable](https://www.gbif.org/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c) for free.

This dataset contains all species and classifications, as well as their ranking, which goes from Kingdom, Phylum, Class, Order, Family, Genus, Species. There are several applications/use-cases that we can build from this that can address many different problems.

This would allow anyone to view relationships of all species on Earth in an intuitive and hierarchical way.

[More description](./project_description.md)

### Applications

Current thoughts

- Build CNN image classifier with iNaturalist dataset so that. `Problem statement`: Connecting people to nature and helping them understand and learn more about it, as well as how they connect to everything else
  - Learn more about food chain, understanding how some species interract with other species, what it is eaten by/ what it feeds on and attach information onto how species are related to each other
  - Build pokedex off of this, allow players to 'collect them all' and view where they have collected what kind of species
  - Allow land surveyors to easily gauge the biodiversity index of an area; useful for property developers, ecologists, biodiversity-saving measures `Problem statement`: It is difficult to know biodiversity of an area, as non-experts may not know that tree's they remove could be rare species or common tree may be habitat to rare species. So unknown second-order effects
  - Graph out locations of all identified species and subspecies; can even have subspecies classifier after open-sourcing this solution and allowing researchers to build on top of to create biodiversity map for countries. Side-effect is that we will be able to detect precidence of invasive species.
- Allow researchers/taxonomists to easily view which species are 'unclassified' and as a community come together to debate on such topics. `Problem statement`: There are so many unclassified species on Earth, classifying them can help us index biodiversity on Earth
  - Sustainable farming; when growing one plant, we can find out what plants grow together or have a symbiotic relationship.
- Attach attributes to species; such as `Ginger: medicinal property, good for throat`, and being able to hollistically view all solutions that may be good for throat, or plants that are known to cure diseases or boost immunity; this could help in several areas:
  - Drug discovery; be able to look at which species have known beneficial effects, looking at their neighbours(in taxon, DNA etc..) and inferring which could be useful, giving some suggestions as to which species could also help provide an answer
  - Other uses; such as cooking, attach flavour attributes to species such as 'spicy' and a level, so then we can query all the spicy plants and see what can be used, or what other ingredients can substitute; `Problem Statement`: Food Discovery

## Tips

- Place a big emphasis on the problem statement being solved
- Go above and beyond to ensure your work is reproducible

### Timeline

- March:
  - Coordinate and develop technical aspects of solution
- April:
  - Begin finalising technical aspects of project
  - Begin writeup and creating video
  - Research on judges to understand how we tailor our wordings and solution
