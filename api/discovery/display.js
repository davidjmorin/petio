const Discovery = require("../models/discovery");
const logger = require("../util/logger");
const getConfig = require("../util/config");
const request = require("xhr-request");
const { getRecommendations } = require("../tmdb/movie");
const getHistory = require("../plex/history");

module.exports = async function getDiscovery(id) {
  if (!id) throw "No user";
  const discoveryPrefs = await Discovery.findOne({ id: id });
  if (!discoveryPrefs) throw "User not found in discovery";
  let movieGenres = discoveryPrefs.movie.genres;
  let genresSorted = [];
  for (var genre in movieGenres) {
    genresSorted.push(movieGenres[genre]);
  }
  genresSorted.sort(function (a, b) {
    if (a.count > b.count) {
      return -1;
    }
  });
  genresSorted.length = 3;
  let data = await Promise.all(
    genresSorted.map(async (genre) => {
      let id = genreID(genre.name);
      if (!id) return null;
      let discData = await discoverMovie(1, {
        with_genres: id,
        sort_by: "revenue.desc",
        "vote_count.gte": 5000,
      });
      discData.results.sort(function (a, b) {
        if (a.vote_average > b.vote_average) {
          return -1;
        }
      });
      discData.results.map((result, i) => {
        if (result.id.toString() in discoveryPrefs.movie.history) {
          discData.results[i] = "watched";
        }
      });

      return {
        title: `${genre.name} movies you might like`,
        results: discData.results,
      };
    })
  );
  let recentlyViewed = await getHistory(id, "movie");
  let recentData = await Promise.all(
    Object.keys(recentlyViewed)
      .slice(0, 4)
      .map(async (r) => {
        let recent = recentlyViewed[r];
        if (recent.id) {
          let related = await getRecommendations(recent.id);
          return {
            title: `Because you watched "${recent.name}"`,
            results: related.results,
          };
        }
      })
  );
  data = [...recentData, ...data];
  return data;
};

function genreID(genreName) {
  switch (genreName) {
    case "Adventure":
    case "Action/Adventure":
      return 12;
    case "Fantasy":
      return 14;
    case "Animation":
      return 16;
    case "Drama":
      return 18;
    case "Horror":
      return 27;
    case "Action":
      return 28;
    case "Comedy":
      return 35;
    case "History":
    case "Biography":
      return 36;
    case "Western":
      return 37;
    case "Thriller":
      return 53;
    case "Crime":
      return 80;
    case "Documentary":
    case "Factual":
      return 99;
    case "Science Fiction":
      return 878;
    case "Mystery":
      return 9648;
    case "Music":
      return 10402;
    case "War":
      return 10752;
    case "TV Movie":
      return 10770;
    case "Romance":
      return 10749;
    case "Family":
      return 10751;
    case "Action & Adventure":
      return 10759;
    case "Kids":
      return 10762;
    case "News":
      return 10763;
    case "Reality":
    case "Reality-TV":
      return 10764;
    case "Sci-Fi & Fantasy":
      return 10765;
    case "Soap":
      return 10766;
    case "Talk":
      return 10767;
    case "War & Politics":
      return 10768;
    default:
      logger.warn(`DISC: Genre not mapped ${genreName}`);
      return false;
  }
}

function discoverMovie(page = 1, params = {}) {
  const config = getConfig();
  const tmdbApikey = config.tmdbApi;
  const tmdb = "https://api.themoviedb.org/3/";
  let par = "";
  Object.keys(params).map((i) => {
    par += `&${i}=${params[i]}`;
  });
  let url = `${tmdb}discover/movie?api_key=${tmdbApikey}${par}&page=${page}`;
  return new Promise((resolve, reject) => {
    request(
      url,
      {
        method: "GET",
        json: true,
      },
      function (err, data) {
        if (err) {
          reject(err);
        }

        resolve(data);
      }
    );
  });
}
