const PDFDocument = require('pdfkit');
const fs = require('fs');
var book_text = require('./book_text.js').text();
var size = "medium"; // this value will need to be read in from the HTTP request

var mm_width = 195; // width of page in mm
var px_width = 2303; // width of page in pixels

var mm_height = 241; // height of page in mm
var px_height = 2846; // height of page in pixels

buildBook("Christmas", "medium", "spencer")

function calculateDimensions(mm_width, px_width, mm_height, px_height){
  var one_inch_to_points = 72 // pdf measures dimensions in points, 72 points = 1 inch
  var one_inch_to_mm = 25.4 // 1 inch = 25.4 mm

  var one_mm_width_in_px = px_width/mm_width; // pixels per one mm horizontally
  var one_mm_height_in_px = px_height/mm_height // pixels per one mm vertically

  var one_mm_in_points = one_inch_to_points/one_inch_to_mm; // width of one mm in points (72/25.4)

  var one_px_width_in_points = one_mm_in_points/one_mm_width_in_px; // width of one pixel in points - multiply this by pixel positions to use in coordinate system

  var one_px_height_in_points = one_mm_in_points/one_mm_height_in_px; // height of one pixel in points

  return [one_px_width_in_points, one_px_height_in_points];
}

function getSize(size){
  var mm_width = 0;
  var px_width = 0;

  var mm_height = 0;
  var px_height = 0;

  if(size == "small"){
    mm_width = 150; //placeholder values for width and height
    px_width = 1600;

    mm_height = 200;
    px_height = 2200;
  }
  if(size == "medium"){
    mm_width = 195;
    px_width = 2776;

    mm_height = 241;
    px_height = 3544;

  }
  if(size == "large"){
    mm_width = 250; //placeholder values for width and height
    px_width = 3000;

    mm_height = 300;
    px_height = 3500;
  }

  return [mm_width, px_width, mm_height, px_height];
}

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

/**
  * @desc builds a pdf of a book
  * @param book_name String - the name of the book to be built
  * @param book_size String - the size of the book to be built (L/M/S) etc
  * @param custom_name String - the custom name given by the client
**/
function buildBook(book_name, book_size, custom_name){
  if (book_name == "Christmas") {
    buildChristmas(book_size, custom_name);
  }
}


function buildChristmas(book_size, custom_name){

  var replaced_name_text = nameReplace(custom_name, book_text);
  var dimensions = getSize(book_size); // returns [mm_width, px_width, mm_height, px_height]
  var calculatedDimensions = calculateDimensions(dimensions[0], dimensions[1], dimensions[2], dimensions[3]) // returns [one_px_width_in_points, one_px_height_in_points]

  // Create a document
  const doc = new PDFDocument({size: [calculatedDimensions[0]*dimensions[1], calculatedDimensions[1]*dimensions[3]]}); //width and height in points
  doc.font('fonts/sweetpea.ttf'); // custom font

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream('output.pdf'));

  //front page:

  //inside page:

  //page 1:
  doc.addPage();
  doc.image('images/FinishedImages/WOW Lost at Christmas_4.jpg', {height: calculatedDimensions[1]*px_height, width: calculatedDimensions[0]*px_width});
  //page 2:
  doc.addPage();
  var text = replaced_name_text[0];
  doc.image('images/FinishedImages/WOW Lost at Christmas_1.jpg', {height: calculatedDimensions[1]*px_height, width: calculatedDimensions[0]*px_width});
  doc.text(text, 800*calculatedDimensions[0],800*calculatedDimensions[1]);
  //page 3:
  doc.addPage();
  doc.image('images/FinishedImages/WOW Lost at Christmas_6.jpg', {height: calculatedDimensions[1]*px_height, width: calculatedDimensions[0]*px_width});
  //page 4:
  doc.addPage();
  var text = replaced_name_text[1];
  var second_text = replaced_name_text[2];
  doc.image('images/FinishedImages/WOW Lost at Christmas_7.jpg', {height: calculatedDimensions[1]*px_height, width: calculatedDimensions[0]*px_width});
  doc.text(text, 800*calculatedDimensions[0],200*calculatedDimensions[1]);
  doc.text(second_text,800*calculatedDimensions[0], 2500*calculatedDimensions[1])
  //page 5:
  doc.addPage()
  var text = replaced_name_text[3];
  doc.image('images/FinishedImages/WOW Lost at Christmas_8.jpg', {height: calculatedDimensions[1]*px_height, width: calculatedDimensions[0]*px_width});
  doc.text(text, 1000*calculatedDimensions[0], 2000*calculatedDimensions[1]);
  //page 6:
  doc.addPage()
  var text = replaced_name_text[4];
  var second_text = replaced_name_text[5];
  doc.image('images/FinishedImages/WOW Lost at Christmas_9.jpg', {height: calculatedDimensions[1]*px_height, width: calculatedDimensions[0]*px_width});
  doc.text(text, 500*calculatedDimensions[0], 2500*calculatedDimensions[1]);
  doc.text(second_text, 1500*calculatedDimensions[0], 2500*calculatedDimensions[1])



  /**
  doc.addPage()
  var text = replaced_name_text[0]
  doc.image('images/book1/CM - 02.png', 900*calculatedDimensions[0], 1406*calculatedDimensions[1], {height: 150}); // width is automatically scaled to height
  doc.text(text, 800*calculatedDimensions[0], 800*calculatedDimensions[1]) // TODO: instead of manually doing the newlines, try to sort the text wrapping

  //page 4:
  doc.addPage()
  var text = replaced_name_text[1]
  doc.image('images/book1/CM - 09a-scaled-down.png', 0, 0, {height: dimensions[3]*calculatedDimensions[1]}); // width is automatically scaled to height ---------- STILL CAUSES HEAP OUT OF MEM AFTER INCREASING MEMORY ALLOWANCE
  doc.text(text, 900*calculatedDimensions[0], 1800*calculatedDimensions[1]) // adding text in rough area
  // Finalize PDF file
  **/
  doc.end();


}
