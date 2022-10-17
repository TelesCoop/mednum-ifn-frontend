const AUTHORIZED_COUNTRIES_AND_REGIONS = [
  "fr",
  "Q17054", // martinique
  "Q17012", // Guadeloupe
  "Q3769", // guyane
  "Q17070", // la réunion
  "region.11066399575224510", // no idea where it comes from
];

export const levenshtein = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  let matrix = [];

  // increment along the first column of each row
  let i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  let j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }
  return matrix[b.length][a.length];
};

export function containsNumber(myString) {
  return /\d/.test(myString);
}

function countryOrRegion(feature) {
  if (!feature.context) {
    return null;
  }
  const countries = feature.context.filter((cont) => cont.id.substr(0, 7) === "country");
  if (countries.length) {
    return countries[0].short_code;
  }
  const regions = feature.context.filter((cont) => cont.id.substr(0, 6) === "region");
  if (regions.length) {
    const region = regions[0];
    return region.wikidata;
  }

  return null;
}

export function isAuthorizedCountryOrRegion(feature) {
  return AUTHORIZED_COUNTRIES_AND_REGIONS.indexOf(feature.properties.wikidata) !== -1;
}

export function isInAuthorizedCountryOrRegion(feature) {
  const country = countryOrRegion(feature);
  if (country == null) {
    return false;
  }

  return AUTHORIZED_COUNTRIES_AND_REGIONS.indexOf(country) !== -1;
}

export function filterGeocoderResults(feature) {
  // departements from the DROM
  if (isAuthorizedCountryOrRegion(feature)) {
    return true;
  }
  // only authorize france and DROM
  if (!isInAuthorizedCountryOrRegion(feature)) {
    return false;
  }
  // do not authorize looking for a region
  if (!isRegion(feature)) {
    return true;
  }

  // filter out regions
  return containsNumber(feature.properties.short_code);
}

export function isRegion(feature) {
  return feature.place_type.some((type) => type === "region");
}
export function colorClassFromScore(score) {
  if (score == null) {
    return "unknown";
  }
  if (score <= -2.5) {
    return "success-strong";
  }
  if (score <= -1.5) {
    return "success";
  }
  if (score <= -0.5) {
    return "info";
  }
  if (score <= 0.5) {
    return "neutral";
  }
  if (score <= 1.5) {
    return "warning";
  }
  if (score <= 2.5) {
    return "danger";
  }
  if (score <= 3.5) {
    return "danger-strong";
  }
}

export function isSiteMH() {
  return (
    // window.location.host.substr(0, 9) === "localhost" ||
    window.location.host.indexOf("malakoff-humanis") !== -1
  );
}
