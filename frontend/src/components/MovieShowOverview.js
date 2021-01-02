import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as TrailerIcon } from "../assets/svg/video.svg";
import { ReactComponent as ResIconHd } from "../assets/svg/720p.svg";
import { ReactComponent as ResIconFHd } from "../assets/svg/1080p.svg";
import { ReactComponent as ResIconUHd } from "../assets/svg/4k.svg";
import { ReactComponent as StarIcon } from "../assets/svg/star.svg";

import { ReactComponent as RequestIcon } from "../assets/svg/request.svg";
import { ReactComponent as ReportIcon } from "../assets/svg/report.svg";
import { ReactComponent as CheckIcon } from "../assets/svg/check.svg";

import { ReactComponent as GenreAction } from "../assets/svg/genres/action.svg";
import { ReactComponent as GenreAdventure } from "../assets/svg/genres/adventure.svg";
import { ReactComponent as GenreAnimation } from "../assets/svg/genres/animation.svg";
import { ReactComponent as GenreComedy } from "../assets/svg/genres/comedy.svg";
import { ReactComponent as GenreCrime } from "../assets/svg/genres/crime.svg";
import { ReactComponent as GenreDocumentary } from "../assets/svg/genres/documentary.svg";
import { ReactComponent as GenreDrama } from "../assets/svg/genres/drama.svg";
import { ReactComponent as GenreFamily } from "../assets/svg/genres/family.svg";
import { ReactComponent as GenreFantasy } from "../assets/svg/genres/fantasy.svg";
import { ReactComponent as GenreHistory } from "../assets/svg/genres/history.svg";
import { ReactComponent as GenreHorror } from "../assets/svg/genres/horror.svg";
import { ReactComponent as GenreMusic } from "../assets/svg/genres/music.svg";
import { ReactComponent as GenreMystery } from "../assets/svg/genres/mystery.svg";
import { ReactComponent as GenreRomance } from "../assets/svg/genres/romance.svg";
import { ReactComponent as GenreScienceFiction } from "../assets/svg/genres/science-fiction.svg";
import { ReactComponent as GenreTvMovie } from "../assets/svg/genres/tv-movie.svg";
import { ReactComponent as GenreThriller } from "../assets/svg/genres/thriller.svg";
import { ReactComponent as GenreWar } from "../assets/svg/genres/war.svg";
import { ReactComponent as GenreWestern } from "../assets/svg/genres/western.svg";

class MovieShowOverview extends React.Component {
  findNested(obj, key, value) {
    // Base case
    if (obj[key] === value) {
      return obj;
    } else {
      for (var i = 0, len = Object.keys(obj).length; i < len; i++) {
        if (typeof obj[i] == "object") {
          var found = this.findNested(obj[i], key, value);
          if (found) {
            // If the object was found in the recursive call, bubble it up.
            return found;
          }
        }
      }
    }
  }

  timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = ("0" + Math.round(minutes)).slice(-2);
    var hrs = rhours < 1 ? "" : rhours === 1 ? "hr" : rhours > 1 ? "hrs" : "";
    return `${rhours >= 1 ? rhours : ""}${hrs}${rminutes}m`;
  }

  genreIcon(name) {
    switch (name) {
      case "Action":
        return <GenreAction />;
      case "Adventure":
        return <GenreAdventure />;
      case "Animation":
        return <GenreAnimation />;
      case "Comedy":
        return <GenreComedy />;
      case "Crime":
        return <GenreCrime />;
      case "Documentary":
        return <GenreDocumentary />;
      case "Drama":
        return <GenreDrama />;
      case "Family":
        return <GenreFamily />;
      case "Fantasy":
        return <GenreFantasy />;
      case "History":
        return <GenreHistory />;
      case "Horror":
        return <GenreHorror />;
      case "Music":
        return <GenreMusic />;
      case "Mystery":
        return <GenreMystery />;
      case "Romance":
        return <GenreRomance />;
      case "Science Fiction":
        return <GenreScienceFiction />;
      case "TV Movie":
        return <GenreTvMovie />;
      case "Thriller":
        return <GenreThriller />;
      case "War":
        return <GenreWar />;
      case "Western":
        return <GenreWestern />;
      case "Action & Adventure":
        return (
          <>
            <GenreAction />
            <GenreAdventure />
          </>
        );
      case "Kids":
        return <GenreFamily />;
      case "News":
        return null;
      case "Reality":
        return null;
      case "Sci-Fi & Fantasy":
        return (
          <>
            <GenreScienceFiction />
            <GenreFantasy />
          </>
        );
      case "Soap":
        return <GenreTvMovie />;
      case "Talk":
        return null;
      case "War & Politics ":
        return <GenreWar />;
      default:
        return null;
    }
  }

  render() {
    let criticRating = this.props.mediaData.vote_average;

    let director = this.findNested(this.props.mediaData.credits.crew, "job", "Director");

    let screenplay = this.findNested(this.props.mediaData.credits.crew, "job", "Screenplay");

    let userRating = "Not Reviewed";
    let userRatingVal = 0;

    let requestBtn = this.props.mediaData.on_server ? (
      <div className="btn btn__square good">
        <CheckIcon />
        On Plex
      </div>
    ) : this.props.requested ? (
      <button className="btn btn__square blue">
        {`Requested by ${this.props.requested}
				${this.props.requested > 1 ? "users" : "user"}`}
      </button>
    ) : (
      <button className="btn btn__square" onClick={this.props.request}>
        <RequestIcon />
        Request
      </button>
    );

    let reportBtn = (
      <button className="btn btn__square" onClick={this.props.openIssues}>
        <ReportIcon />
        Report an issue
      </button>
    );

    let hasReviewed = false;
    if (this.props.user.reviews) {
      if (this.props.user.reviews[this.props.match.params.id] || this.props.externalReviews) {
        let ratingsUser = 0;
        let ignore = 0;
        let total = 0;
        console.log(this.props.user.reviews[this.props.match.params.id]);
        if (this.props.user.reviews[this.props.match.params.id]) {
          for (var i = 0; i < this.props.user.reviews[this.props.match.params.id].length; i++) {
            if (this.props.user.reviews[this.props.match.params.id][i].user == this.props.user.current.id) {
              hasReviewed = this.props.user.reviews[this.props.match.params.id][i];
            }
          }
          if (Object.keys(this.props.user.reviews[this.props.match.params.id]).length > 0) {
            Object.keys(this.props.user.reviews[this.props.match.params.id]).map((r) => {
              ratingsUser += (this.props.user.reviews[this.props.match.params.id][r].score / 10) * 100;
            });
          }
          total += Object.keys(this.props.user.reviews[this.props.match.params.id]).length;
        }

        if (this.props.externalReviews) {
          this.props.externalReviews.map((r) => {
            if (r.author_details.rating === null) {
              ignore++;
            } else {
              ratingsUser += (r.author_details.rating / 10) * 100;
            }
          });
          total += this.props.externalReviews.length;
        }

        userRating = ratingsUser ? `${(ratingsUser / (total - ignore)).toFixed(0)}% (${total - ignore} reviews)` : "Not Reviewed";

        userRatingVal = ratingsUser / (total - ignore);
      }
    }
    let reviewBtn = (
      <button className="btn btn__square" onClick={!hasReviewed ? this.props.openReview : null}>
        {!hasReviewed ? (
          <>
            <StarIcon />
            Review
          </>
        ) : (
          <>
            <StarIcon />
            Reviewed {(hasReviewed.score / 10) * 100}%
          </>
        )}
      </button>
    );

    return (
      <section>
        <div className="quick-view">
          <div className="side-content">
            <div className="media-action">
              {this.props.video ? (
                <button onClick={this.props.showTrailer} className="btn btn__square">
                  <TrailerIcon />
                  Trailer
                </button>
              ) : null}
              {reviewBtn}
              {this.props.mediaData.available_resolutions ? (
                <div className="resolutions">
                  {this.props.mediaData.available_resolutions.includes("4k") ? <ResIconUHd /> : null}
                  {this.props.mediaData.available_resolutions.includes("1080") ? <ResIconFHd /> : null}
                  {this.props.mediaData.available_resolutions.includes("720") ? <ResIconHd /> : null}
                </div>
              ) : null}
            </div>
          </div>
          <div className="detail--wrap">
            <div className="detail--content">
              <div className="detail--bar">
                <p>
                  {this.props.mediaData.release_date ? new Date(this.props.mediaData.release_date).getFullYear() : null}
                  {this.props.mediaData.first_air_date ? new Date(this.props.mediaData.first_air_date).getFullYear() : null}
                </p>
                <div className="detail--bar--sep">·</div>
                <p className="runtime">
                  {this.props.mediaData.runtime ? this.timeConvert(this.props.mediaData.runtime) : null}
                  {this.props.mediaData.episode_run_time
                    ? this.timeConvert(Array.isArray(this.props.mediaData.episode_run_time) ? this.props.mediaData.episode_run_time[0] : this.props.mediaData.episode_run_time)
                    : null}
                </p>
                <div className="detail--bar--sep">·</div>
                <p>
                  Rating: <span className={`color-${criticRating > 7.9 ? "green" : criticRating > 6.9 ? "blue" : criticRating > 4.9 ? "orange" : "red"}`}>{criticRating}</span>
                </p>
                <div className="detail--bar--sep">·</div>
                <p>
                  User Rating: <span className={`color-${userRatingVal > 79 ? "green" : userRatingVal > 69 ? "blue" : userRatingVal > 49 ? "orange" : "red"}`}>{userRating}</span>
                </p>
              </div>
              <div className="genre--wrap">
                {this.props.mediaData.genres.map((genre, i) => {
                  // if (i === this.props.mediaData.genres.length - 1) return genre.name;
                  return (
                    <div className="genre--item">
                      {this.genreIcon(genre.name)}
                      {genre.name}
                    </div>
                  );
                })}
              </div>
              <div className="media--actions__mob">
                {requestBtn}
                {reportBtn}
              </div>
              <div className="media-crew">
                {director ? (
                  <div className="media-crew--item">
                    <p className="sub-title">Director</p>
                    <Link to={`/person/${director.id}`} className="crew-credit">
                      {director.name}
                    </Link>
                  </div>
                ) : null}
                {screenplay ? (
                  <div className="media-crew--item">
                    <p className="sub-title">Screenplay</p>
                    <Link to={`/person/${screenplay.id}`} className="crew-credit">
                      {screenplay.name}
                    </Link>
                  </div>
                ) : null}
              </div>
              <p className="sub-title mb--1">Synopsis</p>
              <p className="overview">{this.props.mediaData.overview}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MovieShowOverview;