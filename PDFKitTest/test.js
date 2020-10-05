const PDFDocument = require('pdfkit');
const fs = require('fs');

var size = "medium"; // this value will need to be read in from the HTTP request

var book_text = ["Twas the night before Christmas\nAnd snug in their house\nThe little mice gathered\nAround Mummy Mouse.",
'"Now who can it be?"\nNAMEnamena\nCan you see who\'s there?\n\nThere\'s someone quite small\nin the cold and the snow\ncan you see who knocked\nJust a moment ago?']

var replaced_name_text = nameReplace("spencer", book_text);

var mm_width = 195; // width of page in mm
var px_width = 2303; // width of page in pixels

var mm_height = 241; // height of page in mm
var px_height = 2846; // height of page in pixels

if(size == "small"){
  mm_width = 150; //placeholder values for width and height
  px_width = 1600;

  mm_height = 200;
  px_height = 2200;
}
if(size == "medium"){
  mm_width = 195;
  px_width = 2303;

  mm_height = 241;
  px_height = 2846;

}
if(size == "large"){
  var mm_width = 250; //placeholder values for width and height
  var px_width = 3000;

  var mm_height = 300;
  var px_height = 3500;
}


var one_inch_to_points = 72 // pdf measures dimensions in points, 72 points = 1 inch
var one_inch_to_mm = 25.4 // 1 inch = 25.4 mm

var one_mm_width_in_px = px_width/mm_width; // pixels per one mm horizontally
var one_mm_height_in_px = px_height/mm_height // pixels per one mm vertically

var one_mm_in_points = one_inch_to_points/one_inch_to_mm; // width of one mm in points (72/25.4)

var one_px_width_in_points = one_mm_in_points/one_mm_width_in_px; // width of one pixel in points - multiply this by pixel positions to use in coordinate system

var one_px_height_in_points = one_mm_in_points/one_mm_height_in_px; // height of one pixel in points


// Create a document
const doc = new PDFDocument({size: [one_px_width_in_points*px_width, one_px_height_in_points*px_height]}); //width and height in points
doc.font('fonts/sweetpea.ttf')

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));
//front page:

//inside page:

//page 1:

//page 2:

//page 3:
doc.addPage()
var text = replaced_name_text[0]
doc.image('images/book1/CM - 02.png', 900*one_px_width_in_points, 1406*one_px_height_in_points, {height: 150}); // width is automatically scaled to height
doc.text(text, 800*one_px_width_in_points, 800*one_px_height_in_points) // TODO: instead of manually doing the newlines, try to sort the text wrapping

//page 4:
doc.addPage()
var text = replaced_name_text[1]
doc.image('images/book1/CM - 09a-scaled-down.png', 0, 0, {height: px_height*one_px_height_in_points}); // width is automatically scaled to height ---------- STILL CAUSES HEAP OUT OF MEM AFTER INCREASING MEMORY ALLOWANCE
doc.text(text, 900*one_px_width_in_points, 1800*one_px_height_in_points) // adding text in rough area
// Finalize PDF file
doc.end();

/**
  * @desc replaces placeholder text with a given name
  * @param name the name to repace the placeholder text
  * @param book_text the array of strings which has placeholder text to be replaced
  * @return an array of strings where the placeholder text has been replaced with the name
**/
function nameReplace(name, book_text) { //replace any NAMEnamena with the given name
  var placeholder = "NAMEnamena"; // NAMEnamena used as the placeholder name in book text
  var return_array = []; // Array returning each string with replaced name
  for (strings in book_text){
    return_array.push(book_text[strings].replace(placeholder, name))
  }

  return(return_array);
}
