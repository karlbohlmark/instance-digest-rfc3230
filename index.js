var crypto = require("crypto")

module.exports = instanceDigest;
module.exports.setDigestHeader = setDigestHeader;

var sha256 = {
	nodeName: "sha256",
	headerName: "SHA-256"
}
var hashAlgorithms = [sha256]

function ensureValidAlgorithm (algorithm) {
	var alg = findAlgorithm(algorithm);
	if (!alg) {
		throw new Error("Invalid algorithm: " + algorithm);
	}
	return alg;
}

function findAlgorithm (nodeOrHeaderAlgorithmName) {
	var upperAlgorithm = nodeOrHeaderAlgorithmName.toUpperCase();
	var matches = hashAlgorithms.filter(function (alg) {
		return alg.nodeName.toUpperCase() == upperAlgorithm
			|| alg.headerName.toUpperCase() == upperAlgorithm
	})
	return matches[0];
}

function algorithmHeaderName (nodeOrHeaderAlgorithmName) {
	return findAlgorithm(nodeOrHeaderAlgorithmName).headerName;
}

function algorithmNodeName (nodeOrHeaderAlgorithmName) {
	return findAlgorithm(nodeOrHeaderAlgorithmName).nodeName;
}

function messageDigest (body, algorithm) {
	var alg = ensureValidAlgorithm(algorithm)
    var hash = crypto.createHash(alg.nodeName);
    hash.update(body);
    return hash.digest("base64");
}

function instanceDigest(body, algorithm) {
	return formatInstanceDigest(algorithm, messageDigest(body, algorithm));
}

function formatInstanceDigest (algorithm, digest) {
	var alg = ensureValidAlgorithm(algorithm);
	return alg.headerName + "=" + digest;
}

function setDigestHeader (clientRequestOptions, body, algorithm) {
	clientRequestOptions.headers.digest = instanceDigest(body, algorithm)
}