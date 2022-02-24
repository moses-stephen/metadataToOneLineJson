var express = require("express");
var xlsxj = require("xlsx-to-json");
 var outputj = require("./output.json");
//  comment this 3rd line and run to create output.json file,
//  then uncomment that line and again run to get newJson.json file
var fs = require('fs');
// console.log(outputj)
const app = express();
const PORT = 8080;

const csvToJson = () => {
	let jsonLocation = './output.json';
	try {
		let result = [];
		if (fs.existsSync(jsonLocation)) {
			outputj.map((element) => {
				let newarray = {
					"copyright": element["Copyright Information"],
					"thumbnailPoster": element["Series Poster Artwork URI"],
					"thumbnailTile": element["Series Square Artwork URI"],
					"thumbnailScreenshot_4x3": element["Film Screenshot 4x3"],
					"thumbnailScreenshot_16x9": element["Film Screenshot 16x9"],
					"thumbnailFeatured": element["Series Featured Artwork URI"],
					"adBreaks": element["Ad Breakpoints"],
					"keywords": element["Film Tags or Keywords"],
					"director": element["Director(s)"],
					"cast": element["Actor(s)"],
					"releasedate": element["Original Release Date"],
					"genre": element["Film Tags or Keywords"],
					"rating": element["Content Rating"],
					"description": element["Film Short Description"],
				}
				result.push(newarray);
			});
			var outputnew = "[\n" +
				result.map(entry => JSON.stringify(entry)).join(",\n") +
				"\n]";
			fs.writeFileSync('./newJson.json',outputnew);
		} else {
			xlsxj({
				input: "input.xlsx",
				output: "output.json"
			}, function (err, result) {
				if (err) {
					console.error(err);
				} else {
					console.log(JSON.stringify(result, null, 4));
				}
			});
		}
	} catch (e) {
		console.log("err =>",e.message);
	}
}

app.post('/csvtojson', async (req, res) => {
	await csvToJson();
	res.send('successs');
})

app.listen(PORT, () => {
	console.log("connected!!");
})