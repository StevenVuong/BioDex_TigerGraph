const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const SECRET = process.env.SECRET || "<ENTER_TIGERGRAPH_SECRET>";
const tigerGraphURL =
  process.env.TIGERGRAPH_URL || "<ENTER_TIGERGRAPH_HOST_URL>";

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

let TOKEN;

async function getToken() {
  if (!TOKEN) {
    const response = await fetch(`${tigerGraphURL}:9000/requesttoken`, {
      method: "POST",
      body: JSON.stringify({
        secret: SECRET,
        lifetime: 10000,
      }),
    });
    if (!response.ok) {
      throw new Error("Whoop");
    }
    TOKEN = (await response.json()).token;
  }
  return TOKEN;
}

async function runQuery(query) {
  const TOKEN = await getToken();

  let response = await fetch(`${tigerGraphURL}:9000/query/${query}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.json();
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/get_all_player_sightings", async (req, res) => {
  const response = await runQuery(
    `/taxonomy2/new_get_sightings?playerID=Steve`
  );

  res.send(
    JSON.stringify(
      response.results[0]["T"].map((sighting) => ({
        id: sighting.t,
        genericName: sighting.genericName,
        canonicalName: sighting.canonicalName,
        img: sighting.s.attributes.img_store_url,
        date: sighting.s.attributes.sightingTime,
      }))
    )
  );
});

app.get("/taxon/:uid", async (req, res) => {
  const taxonInfoRequest = await fetch(
    `https://api.gbif.org/v1/species/${req.params.uid}`
  );

  const taxonInfo = await taxonInfoRequest.json();

  const data = {
    id: taxonInfo.key,
    status: taxonInfo.taxonomicStatus,
    rank: taxonInfo.rank,
    canonicalName: taxonInfo.canonicalName,
    genericName: taxonInfo.vernacularName,
    parent: {
      id: taxonInfo.parentKey,
      genericName: taxonInfo.parent,
    },
  };
  if (taxonInfo.rank === "SPECIES") {
    const taxonLocationsRequest = await fetch(
      `https://api.gbif.org/v1/species/${req.params.uid}/distributions`
    );
    data.location = await taxonLocationsRequest.json();
  } else {
    const taxonChildrenRequest = await fetch(
      `https://api.gbif.org/v1/species/${req.params.uid}/children?language=en`
    );
    data.children = await taxonChildrenRequest.json();
    data.children.results = data.children.results.map((taxonInfo) => ({
      id: taxonInfo.key,
      status: taxonInfo.taxonomicStatus,
      rank: taxonInfo.rank,
      canonicalName: taxonInfo.canonicalName,
      genericName: taxonInfo.vernacularName,
    }));
  }

  res.send(JSON.stringify(data));
});

app.get("/taxon/graph/:uid", async (req, res) => {
  await getToken();
  const [response, parentResponse, childResponse] = await Promise.all([
    runQuery(`/taxonomy2/new_get_taxon_info?taxonID=${req.params.uid}`),
    runQuery(`/taxonomy2/get_parent_of_taxonid?taxonID=${req.params.uid}`),
    // runQuery(`/taxonomy2/get_children_of_taxonid?taxonID=${req.params.uid}`),
  ]);

  const { t, ...rest } = response.results[0]["S"][0];

  res.send(
    JSON.stringify({
      id: t,
      ...rest,
      parents: parentResponse.results[0]["result"].map((item) => {
        const { v_id, attributes } = item;
        const { taxonID, ...rest } = attributes;
        return {
          id: v_id,
          ...rest,
        };
      }),
    })
  );
});

app.get("/classify", async (req, res) => {
  try {
    const response = await fetch(
      ` http://localhost/img_url?img_url=${req.query.url}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    res.send(JSON.stringify(data));
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post("/sighting", async (req, res) => {
  const taxonIdResponse = await fetch(`http://localhost/query_gbif`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query_list: [req.body.specie],
    }),
  });
  const taxonOptions = await taxonIdResponse.json();
  if (taxonOptions.length === 0) {
    res.send("failed");
  }
  const taxonID = JSON.parse(taxonOptions)[0].usageKey;
  const response = await runQuery(
    `/taxonomy2/create_sighting_edge?playerID=Steve&taxonID=${taxonID}&latitude=${req.body.location.latitude
    }&longitude=${req.body.location.longitude
    }&sightingTime=${new Date().toISOString()}&img_store_url=${req.body.imgUrl}`
  );
  res.send(JSON.stringify({}));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
