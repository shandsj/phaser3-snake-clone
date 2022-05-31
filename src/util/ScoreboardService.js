import axios from 'axios';

const SCOREBOARD_ID = 'b8f4e5bb-e5e3-43ad-b35a-456ecaeb80f5';
const SCOREBOARD_API_URL = 'https://shandsj-scoreboardly.azurewebsites.net/api/scoreboards/' + SCOREBOARD_ID;

/**
 * Provides a service that wraps API calls to the scoreboard.
 */
export default class ScoreboardService {
  /**
   * Asynchronously gets the scoreboard.
   *
   * @return {Promise<any>} A promise that wraps the scoreboard object,
   *  or null if no scoreboard was found.
   */
  async getScoreboardAsync() {
    let response = undefined;
    try {
      console.log('Requesting scoreboard from ' + SCOREBOARD_API_URL);
      response = await axios.get(SCOREBOARD_API_URL);
      console.log('Response received', response);
    } catch (error) {
      console.error('Error requesting scoreboard', error);
      return null;
    }

    if (response.status != 200) {
      return null;
    }

    return response.data;
  }

  /**
   * Asyncronously determines whether the specified score meets the
   *  criteria to be shown on the scoreboard.
   *
   * @param {Number} score The score to check.
   * @return {Promise<boolean>} A promise wrapping a boolean indicating whether the
   *  score meets the criteria to be shown on the scoreboard.
   */
  async doesScoreMeetScoreboardCriteriaAsync(score) {
    const scoreboard = await this.getScoreboardAsync();
    if (scoreboard == null) {
      console.error('Could not communicate with remote scoreboard');
      return false;
    }

    // If the scoreboard has an empty spot, or the player's score beats
    // the lowest score prompt for the user to enter their name.
    return scoreboard.scores.length < scoreboard.maximumScores ||
           score > scoreboard.scores[scoreboard.scores.length - 1].score;
  }

  /**
   * Asyncronously submits the specified score and player to the scoreboard.
   *
   * @param {string} playerName The player's name.
   * @param {number} score The player's score.
   * @return {Promise<boolean>} A promise wrapping a boolean indicating whether the
   *  score was successfully submitted to the scoreboard.
   */
  async submitScoreAsync(playerName, score) {
    let response = undefined;
    try {
      console.log('Submitting score to scoreboard at ' + SCOREBOARD_API_URL);
      response = await axios.put(SCOREBOARD_API_URL, {
        playerName: playerName,
        score: score,
      });

      console.log('Response received', response);
    } catch (error) {
      console.error('Error submitting score', error);
      return false;
    }

    if (response.status != 200) {
      return false;
    }

    return true;
  }
}
