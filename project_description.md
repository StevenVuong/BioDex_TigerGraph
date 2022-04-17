# Project Description

## Inspiration for BioDex

Two things:

  1. QuestaGame mobile application, the original app to connect people to nature.

  2. Seeing the GBIF backbone dataset for the first time, the largest aggregated dataset containing all known species and taxa to humanity.

I thought that there must be a better way to display the data than a giant TSV file because it's just so rich in content, that more people should be able to benefit from it. I wanted to build a graph that connected every single taxon in an intuitive way and surface that to wider audiences. This hackathon, #MillionDollarChallenge was the perfect nudge to go and actually implement.

## What BioDex does

BioDex gamifies the experience of connecting to nature. With a scalable AI image classifier, players can snap images of nature, identify its species and display its properties in real-time. BioDex makes being outdoors a learning experience in itself.

Later on, that same player can look at the species they have caught in their own BioDex. Because we have ingested all 6.9M taxon nodes from GBIF into TigerGraph, they are then free to explore the relationships of their captured species to all other species in the taxon chain, learning about those too.
BioDex challenges players to capture all initial 10,000 species. By joining guilds, players can achieve this goal collectively. In the process, they are able to gain mastery through capturing novel species, traversing diverse taxa and engaging with the community.

With players gathering global sightings, we can aggregate this data to better gauge global biodiversity levels, and further understand the movements and distribution of species. Some players may even help discover new species altogether! By providing value to experts and researchers, we can include them in our community, meaning players get the opportunity to have their sightings verified by world-class experts.

## How we built BioDex

Summary word: Iterative process. I came up with the initial idea and conscripted Hari because I knew his many years of experience would provide a clear lens on architecture and ensure we would focus on execution. Not to mention he’s a JavaScript wizard.

We set the baseline MVP and worked towards that, establishing milestones and allocating who would be working on what. Naturally, my Data Science background meant I worked on the image classifier, to begin with. We both dug in when it came to TigerGraph, creating the schema, populating it with data to finally query. This was something that we came back to often. When it came to piecing it all together, Hari created a beautifully simple web interface that leverages the image classifier and puts the graph at users’ fingertips.

## Challenges we ran into

Juggling this hackathon, as well as personal commitments and full-time work meant we had to coordinate well across two time zones, 8 hours apart and keep a laser focus on the MVP. Our ideas at first were up in the sky, but we quickly realised that we had to narrow the scope to what we can achieve in the limited timeframe and sprint towards that.

We made multiple iterations of the graph schema before we got it right, especially as we refined our use-case. This forward and backwards felt frustrating at times, but upon reflection, was crucial to get our graph to where we needed it to be.

## Accomplishments that we're proud of

We said we would do something, and we actually did it. Hari and I are techies at heart and go way back to my first internship 6 years ago, where Hari was the senior developer teaching me Java. Though we clashed at times during this hackathon, together we managed to build something (hopefully) useful that we definitely are proud of, and learn from each other during the process. I think it’s fair to say we improved our friendship through this collaboration.

## What we learned

Building the image classifier lookup was incredibly fun. It’s based on NASA’s worldview scalable reverse image search engine, with a twist on nature.

Initially, adopting TigerGraph was slow at first and took a lot of learning, the tutorials were of great help. It was only after the first few iterations of our graph schema that we found our rhythm. Overall, we’ve become quietly confident in our capability to leverage TigerGraph.

As our BioDex is based on connecting people to nature. We found ourselves becoming more and more deeply connected, learning all about different species, rankings and taxon profiles through exploring the data and configuring it into pipelines.

## What's next for BioDex

We want to build on the shoulders of giants, and allow others to do the same.

Firstly, we will be open-sourcing our github repo to allow others to replicate our graph schema so that the community can contribute further, putting ourselves in the position of open-source maintainers.
Secondly, we have reached out to QuestaGame’s founders who really like the idea of Graph. We will be collaborating with them to repurpose our graph to solve the problem of species synonym matching (any given species can have multiple names depending on the country, naming convention, institution etc..)

Furthermore, we will be expanding the Image Classifier to incorporate QuestaGame’s entire image repository, with specialist classifiers for subgroupings (e.g. mushroom specialist classifier). This would serve their growing user base of >60,000 players, providing immediate value to them, as opposed to growing our own user base. You can check out their site: <https://questagame.com/> . There is some growing excitement around their community and discord with talk of bioNFTs.
Really, we see this as something with huge potential, and hope that communities can take what we have done then take it to even greater heights.
