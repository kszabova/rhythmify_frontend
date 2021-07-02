import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConservationProfileService {

  constructor() { }

  calculateConservationProfile(volpianos: string[]): number[][][][] {
    if (volpianos.length == 0) {
      return [];
    }

    let conservationProfile = [];

    // create empty array for each chant
    for (let i = 0; i < volpianos.length; i++) {
      conservationProfile.push([[[]]]);     // one word with one empty syllable
    }

    // loop over the volpianos and calculate the conservation value
    for (let pos = 0; pos < volpianos[0].length; pos++) {
      let charsInPosition = [];
      for (let volpianoIdx = 0; volpianoIdx < volpianos.length; volpianoIdx++) {
        charsInPosition.push(volpianos[volpianoIdx][pos]);
      }
      let conservationInPosition = this.calculateConservationInPosition(charsInPosition);
      // append conservation value for current char
      // finish syllable if current char is '|'
      // finish word if current char is '~'
      for (let volpianoIdx = 0; volpianoIdx < volpianos.length; volpianoIdx++) {
        let lastWordIdx = conservationProfile[volpianoIdx].length - 1;
        let lastSyllableIdx = conservationProfile[volpianoIdx][lastWordIdx].length - 1;
        if (volpianos[volpianoIdx][pos] === '|') {
          conservationProfile[volpianoIdx][lastWordIdx].push([]);
        }
        else if (volpianos[volpianoIdx][pos] === '~') {
          conservationProfile[volpianoIdx].push([[]]);
        }
        else {
          conservationProfile[volpianoIdx][lastWordIdx][lastSyllableIdx].push(
            conservationInPosition[volpianos[volpianoIdx][pos]]
          );
        }
      }
    }

    console.log(conservationProfile);
    return conservationProfile;
  }

  private calculateConservationInPosition(chars: string[]): object {
    const charNumber = chars.length;
    let charCounts = {};

    // calculate the number of occurrences of each character
    chars.forEach(char => {
      if (char in charCounts) {
        charCounts[char] += 1;
      }
      else {
        charCounts[char] = 1;
      }
    });

    // calculate char value for each character
    let charLevels = {};
    const insignificantChars = ['-', '~', '|', '1', '3', '4', '7'];
    Object.keys(charCounts).forEach(key => {
      if (insignificantChars.includes(key)) {
        charLevels[key] = 0;
      }
      else {
        charLevels[key] = charCounts[key] / charNumber;
      }
    });

    return charLevels;
  }
}
