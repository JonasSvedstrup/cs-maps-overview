const Connections = {
  Highway: `Highway`,
  Railway: `Railway`,
  Ship: `Ship`,
  Air: `Air`,
};

const Milestones = {
  LittleHamlet: 'Little Hamlet',
  WorthyVillage: 'Worthy Village',
  TinyTown: 'Tiny Town',
  BoomTown: 'Boom Town',
  BusyTown: 'Busy Town',
  BigTown: 'Big Town',
  SmallCity: 'Small City',
  BigCity: 'Big City',
  GrandCity: 'Grand City',
  CapitalCity: 'Capital City',
  ColossalCity: 'Colossal City',
  Metropolis: 'Metropolis',
  Megalopolis: 'Megalopolis',
};

const Debug = {
  Success: 'green',
  Warn: 'orange',
  Error: 'red',
  Info: 'grey',
};

const prepareLetsPlayData = async () => {
  debug('prepareLetsPlayData()', Debug.Info);
  if (letsPlayData.length == 0) {
    const urlsToFetch = ['./src/data/lets-play.json'];
    const fetchPromises = urlsToFetch.map((url) => fetch(url).then((response) => response.json()));
    await Promise.all(fetchPromises)
      .then((responses) => {
        debug('prepareLetsPlayData - ok', Debug.Success);

        const responseData = responses.map((response) => response);

        letsPlayData = responseData[0];
      })
      .catch((error) => debug(`catch e: ${error}`, Debug.Error));
  } else {
    debug('prepareLetsPlayData - skip', Debug.Warn);
  }
};

const prepareAuthorsData = async () => {
  debug('prepareAuthorsData()', Debug.Info);
  if (authorsData.length == 0) {
    const urlsToFetch = ['./src/data/authors.json'];
    const fetchPromises = urlsToFetch.map((url) => fetch(url).then((response) => response.json()));
    await Promise.all(fetchPromises)
      .then((responses) => {
        debug('prepareAuthorsData - ok', Debug.Success);

        const responseData = responses.map((response) => response);

        authorsData = responseData[0];
      })
      .catch((error) => debug(`catch e: ${error}`, Debug.Error));
  } else {
    debug('prepareAuthorsData - skip', Debug.Warn);
  }
};

const prepareMapsData = async () => {
  debug('prepareMapsData()', Debug.Info);
  if (mapsData.length == 0) {
    const urlsToFetch = ['./src/data/maps.json'];
    const fetchPromises = urlsToFetch.map((url) => fetch(url).then((response) => response.json()));
    await Promise.all(fetchPromises)
      .then((responses) => {
        debug('prepareMapsData - ok', Debug.Success);

        const responseData = responses.map((response) => response);

        mapsData = responseData[0];
      })
      .catch((error) => debug(`catch e: ${error}`, Debug.Error));
  } else {
    debug('prepareMapsData - skip', Debug.Warn);
  }
};
