function calculateSimilarity(vector1, vector2) {
    let dotProduct = 0;
    for (const word in vector1) {
        if (word in vector2) {
            dotProduct += vector1[word] * vector2[word];
        }
    }

    let magnitude1 = 0;
    for (const word in vector1) {
        magnitude1 += vector1[word] ** 2;
    }
    magnitude1 = Math.sqrt(magnitude1);

    let magnitude2 = 0;
    for (const word in vector2) {
        magnitude2 += vector2[word] ** 2;
    }
    magnitude2 = Math.sqrt(magnitude2);

    const similarity = dotProduct / (magnitude1 * magnitude2);

    return similarity;
}

function vectorizeTitle(title) {
    const words = title.toLowerCase().split(' ');

    const wordCount = {};

    for (const word of words) {
        if (word in wordCount) {
            wordCount[word]++;
        } else {
            wordCount[word] = 1;
        }
    }

    return wordCount;
}

module.exports = { calculateSimilarity, vectorizeTitle };