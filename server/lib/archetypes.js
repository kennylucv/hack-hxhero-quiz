export default function classify(scores) {
  // Sorting the strong outliers first
  if ( scores['risk'] >= 10 ) {
    return "diyer"
  } else if ( scores['knowledge'] >= 13 ) {
    return "ponderer"
  } else if ( ( scores['risk'] <= 3 ) & (scores['action'] >= 13) ) {
    return "boss"
  } else if ( ( scores['action'] <= 8 ) & (scores['knowledge'] < 4) ) {
    return "workarounder"
  } else {
    // sort the rest
    if (scores['knowledge'] > 8) {
      // diyer or ponderer
      if (scores['risk'] >= 8) {
        return "diyer"
      } else {
        return "ponderer"
      }
    } else {
      // boss or workarounder
      if (scores['action'] <= 8 ) {
        return "workarounder"
      } else {
        return "boss"
      }
    }
  }
}
