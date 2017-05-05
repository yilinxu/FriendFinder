// require friends with dumn data
// require npm module underscore
var friends = require("../data/friends");

var _ = require("underscore");

// write app function as the export module 

module.exports = function(app){
//write match function that takes new user's information req.body and compare the existing data in friends array.
//When api/friends is requested, write friends information to that page using json format
	app.get("/api/friends", function(req, res){
		res.json(friends);
	});
//When ap/friends is posted, add req.body information to friends, and return matched user's name and url.
	app.post("/api/friends", function(req, res){
		friends.push(req.body);
		res.json(returninfo(friends,match(req.body, friends)));
	});
};

function match(newinfo, infopool){
		var newinfo_scores = newinfo.scores;
		var each_diff = [];
//loop through the existing friends array
		for(var i = 0; i<infopool.length-1; i++){
//get scores info for each existing users
			var scores=infopool[i].scores;
//subtract existing users scores from new users score, return absolute value of the score difference
			var score_diff = newinfo_scores.map((value, index)=> Math.abs(value-scores[index]));
//add up score differences, and store in array each_diff
			var sum_diff = score_diff.reduce((a,b)=> a+b);
			each_diff.push(sum_diff);
		};
//return the index of existing users which has minimal score difference
		var index = _.indexOf(each_diff,_.min(each_diff));
		return index;
	};

//call back function takes return index and get the name and url for that user.
function returninfo(infopool, index){
		return infopool[index];
	};


