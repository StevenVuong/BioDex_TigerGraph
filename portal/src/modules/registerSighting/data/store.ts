import { makeAutoObservable, runInAction } from "mobx";

type Species = {
  name: string;
  probability: number;
};
type Location = { latitude: number; longitude: number };

function isUrl(s: string) {
  let url;
  try {
    url = new URL(s);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
class RegisterSightingStore {
  private _stepIndex = 0;
  private _url = "";
  private _species = new Array<Species>();
  private _specie = "";
  private _location: Location | null = null;
  private _requestError = "";

  private _loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get stepIndex() {
    return this._stepIndex;
  }
  get url() {
    return this._url;
  }
  get requestError() {
    return this._requestError;
  }
  get species() {
    return this._species;
  }
  get location() {
    return this._location;
  }
  get loading() {
    return this._loading;
  }

  async uploadImage(url: string) {
    if (!isUrl(url)) {
      return;
    }
    if (this._url === url) {
      this._stepIndex = 1;
      return;
    }
    try {
      const response = await fetch(`http://localhost:3080/classify?url=${url}`);
      const data = await response.json();
      runInAction(() => {
        this._url = url;
        this._specie = "";
        this._species = Object.keys(data)
          .slice(0, 10)
          .map((key) => ({
            name: key,
            probability: data[key],
          }));
        this._stepIndex++;
      });
    } catch (err) {
      runInAction(() => {
        this._requestError = "Something is wrong maybe the server is down";
      });
      return;
    }
  }

  selectSpecie(specie: string) {
    this._stepIndex++;
    this._specie = specie;
  }

  async setLocation(location: Location) {
    this._loading = true;

    const response = await fetch(`http://localhost:3080/sighting`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imgUrl: this._url,
        location,
        specie: this._specie.split("/")[1],
      }),
    });
    this._location = location;
    this._stepIndex++;
  }
  nextStep() {
    return this._stepIndex++;
  }

  previousStep() {
    if (this._stepIndex === 0) {
      return;
    }
    return this._stepIndex--;
  }
}

export default RegisterSightingStore;
